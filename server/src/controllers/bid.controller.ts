import { Request, Response } from 'express';
import { Inject } from 'typescript-ioc';
import DB from '../helpers/db_actions';
import { authenticatedDriver, handleInternalServerError } from '../helpers/utils';
import { Bid, CreateBidDto, UpdateBidDto } from '../helpers/interfaces';

class BidController {
  @Inject db!: DB;

  public store = (req: Request, res: Response, next: Function) => {
    try {
      const payload: CreateBidDto = req.body;
      const { amount } = payload;
      if (!amount) return res.status(400).json({ message: 'Amount is required' });

      const { shipmentId } = req.params;
      const shipments = this.db.read();

      // find the shipment to add a bid to
      const shipment = shipments.find((shipment) => shipment.id == shipmentId);
      if (!shipment) return res.status(404).json({ message: 'The shipment can not be found' });

      const bids = shipment.bids.data;

      const bidExist = bids.find((bid) => bid.driver.id === authenticatedDriver.id);

      if (bidExist) return res.status(401).json({ message: 'You can only place one bid on a shipment. Retract current bid to post another one' });

      const bid: Bid = {
        id: bids[0].id + 1,
        amount,
        status: 'placed',
        created_at: new Date().toISOString(),
        driver: authenticatedDriver,
      };

      // add the bid and update the shipment
      const newBids = [bid, ...bids];
      shipment.bids.data = newBids;

      // update the db
      const updatedShipments = shipments.map((mShipment) => (mShipment.id === shipment.id ? shipment : mShipment));

      this.db.write(updatedShipments);

      res.status(200).json(bid);
    } catch (error) {
      handleInternalServerError(error, res);
    }
  };

  public update = (req: Request, res: Response, next: Function) => {
    try {
      const payload: UpdateBidDto = req.body;
      const { amount, status } = payload;

      if (!amount) return res.status(400).json({ message: 'Amount is required' });
      if (!status) return res.status(400).json({ message: 'Bid status is required' });

      const { shipmentId, bidId } = req.params;
      const shipments = this.db.read();

      // find the shipment to update its bid
      const shipment = shipments.find((shipment) => shipment.id == shipmentId);
      if (!shipment) return res.status(404).json('The shipment can not be found');

      const bids = shipment.bids.data;
      const bid = bids.find((bid) => bid.id === parseInt(bidId));
      if (!bid) return res.status(404).json({ message: 'The bid can not be found' });

      // return an error if the driver did not create the bid
      if (bid.driver.id !== authenticatedDriver.id) res.status(401).json({ message: 'You are not authorised to updated this bid' });

      bid.amount = amount;
      bid.status = status;
      const updatedBids = bids.map((mBid) => (mBid.id === bid.id ? bid : mBid));
      shipment.bids.data = updatedBids;

      // update the db
      const updatedShipments = shipments.map((mShipment) => (mShipment.id === shipment.id ? shipment : mShipment));

      this.db.write(updatedShipments);

      res.status(200).json(bid);
    } catch (error) {
      handleInternalServerError(error, res);
    }
  };

  public delete = (req: Request, res: Response, next: Function) => {
    try {
      const { shipmentId, bidId } = req.params;

      const shipments = this.db.read();

      // find the shipment to update its bid
      const shipment = shipments.find((shipment) => shipment.id == shipmentId);
      if (!shipment) return res.status(404).json({ message: 'The shipment can not be found' });
      const bids = shipment.bids.data;

      const bid = bids.find((bid) => bid.id === parseInt(bidId));
      if (!bid) return res.status(404).json({ message: 'The bid can not be found' });

      // return an error if the driver did not create the bid
      if (bid.driver.id !== authenticatedDriver.id) return res.status(401).json({ message: 'You are not authorised to delete this bid' });

      const updatedBids = bids.filter((fBid) => fBid.id != bid.id);
      shipment.bids.data = updatedBids;

      // update the db
      const updatedShipments = shipments.map((mShipment) => (mShipment.id === shipment.id ? shipment : mShipment));

      this.db.write(updatedShipments);

      res.status(200).json({ message: 'Bid deleted' });
    } catch (error) {
      handleInternalServerError(error, res);
    }
  };
}

export default BidController;
