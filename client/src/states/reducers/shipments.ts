import { ShipmentState } from '../../helpers/interfaces';
import { ActionTypes } from '../action-types';
import { Actions } from '../actions';

const initialState: ShipmentState = {
  shipments: null,
  shipment: null,
};

const shipmentReducer = (state = initialState, action: Actions): ShipmentState => {
  switch (action.type) {
    case ActionTypes.FETCH_SHIPMENTS:
      return { ...state, shipments: action.payload };
    case ActionTypes.FETCH_SHIPMENT:
      return { ...state, shipment: action.payload };
    case ActionTypes.CREATE_BID:
      return { ...state, shipment: { ...state.shipment!, bids: { data: [action.payload, ...state.shipment!.bids.data] } } };
    case ActionTypes.UPDATE_BID:
      return { ...state, shipment: { ...state.shipment!, bids: { data: state.shipment!.bids.data.map((bid) => (bid.id === action.payload.id ? action.payload : bid)) } } };
    case ActionTypes.DELETE_BID:
      return { ...state, shipment: { ...state.shipment!, bids: { data: state.shipment!.bids.data.filter((bid) => bid.id !== action.payload) } } };
    default:
      return { ...state };
  }
};

export default shipmentReducer;
