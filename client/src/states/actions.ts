import { Bid, Shipment } from '../helpers/interfaces';
import { ActionTypes } from './action-types';

interface FetchShipmentsAction {
  type: ActionTypes.FETCH_SHIPMENTS;
  payload: Shipment[];
}

interface FetchShipmentAction {
  type: ActionTypes.FETCH_SHIPMENT;
  payload: Shipment;
}

interface CreateBidAction {
  type: ActionTypes.CREATE_BID;
  payload: Bid;
}

interface UpdateBidAction {
  type: ActionTypes.UPDATE_BID;
  payload: Bid;
}

interface DeleteBidAction {
  type: ActionTypes.DELETE_BID;
  payload: number;
}

export type Actions = FetchShipmentsAction | FetchShipmentAction | CreateBidAction | UpdateBidAction | DeleteBidAction;
