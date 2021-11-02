import express from 'express';
import BidController from './controllers/bid.controller';
import ShipmentController from './controllers/shipment.controller';
const routes = express.Router();

const shipmentController = new ShipmentController();
const bidController = new BidController();

routes.get('/shipments', shipmentController.index);
routes.get('/shipments/:shipmentId', shipmentController.view);
routes.post('/shipments/:shipmentId/bids', bidController.store);
routes.put('/shipments/:shipmentId/bids/:bidId', bidController.update);
routes.delete('/shipments/:shipmentId/bids/:bidId', bidController.delete);

export default routes;
