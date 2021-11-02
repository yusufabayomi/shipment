import { Request, Response } from 'express';
import { Inject } from 'typescript-ioc';
import DB from '../helpers/db_actions';
import { handleInternalServerError } from '../helpers/utils';

class ShipmentController {
  @Inject db!: DB;

  public index = (req: Request, res: Response, next: Function) => {
    try {
      const shipments = this.db.read();
      res.status(200).json(shipments);
    } catch (error) {
      handleInternalServerError(error, res);
    }
  };

  public view = (req: Request, res: Response, next: Function) => {
    try {
      const { shipmentId } = req.params;
      const shipments = this.db.read();

      const shipment = shipments.find((shipment) => shipment.id == shipmentId);
      if (!shipment) return res.status(404).json({ message: 'The shipment can not be found' });

      res.status(200).json(shipment);
    } catch (error) {
      handleInternalServerError(error, res);
    }
  };
}

export default ShipmentController;
