import { Dispatch } from 'redux';
import { createBidApi, deleteBidApi, fetchShipmentApi, fetchShipmentsApi, updateBidApi } from '../api';
import { Bid, CreateBidDto, Shipment, UpdateBidDto } from '../helpers/interfaces';
import { ActionTypes } from './action-types';
import { Actions } from './actions';

export const fetchShipments = () => async (dispatch: Dispatch<Actions>) => {
  try {
    const response = await fetchShipmentsApi();
    console.log(response);
    const shipments: Shipment[] = response.data;
    console.log(shipments);

    dispatch({
      type: ActionTypes.FETCH_SHIPMENTS,
      payload: shipments,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchShipment = (shipmentId: string) => async (dispatch: Dispatch<Actions>) => {
  try {
    const response = await fetchShipmentApi(shipmentId);
    const shipment: Shipment = response.data;

    dispatch({
      type: ActionTypes.FETCH_SHIPMENT,
      payload: shipment,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createBid = (shipmentId: string, createBidPayload: CreateBidDto) => async (dispatch: Dispatch<Actions>) => {
  try {
    const response = await createBidApi(shipmentId, createBidPayload);
    const bid: Bid = response.data;

    dispatch({
      type: ActionTypes.CREATE_BID,
      payload: bid,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateBid = (shipmentId: string, bidId: number, updateBidPayload: UpdateBidDto) => async (dispatch: Dispatch<Actions>) => {
  try {
    const response = await updateBidApi(shipmentId, bidId, updateBidPayload);
    const bid: Bid = response.data;

    dispatch({
      type: ActionTypes.UPDATE_BID,
      payload: bid,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteBid = (shipmentId: string, bidId: number) => async (dispatch: Dispatch<Actions>) => {
  // optimistically delete bid
  dispatch({
    type: ActionTypes.DELETE_BID,
    payload: bidId,
  });
  try {
    deleteBidApi(shipmentId, bidId);
  } catch (error) {
    return Promise.reject(error);
  }
};
