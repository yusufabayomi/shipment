import axios from 'axios';
import { CreateBidDto, UpdateBidDto } from '../helpers/interfaces';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

export const fetchShipmentsApi = () => {
  return api.get('/shipments');
};

export const fetchShipmentApi = (shipmentId: string) => {
  return api.get(`/shipments/${shipmentId}`);
};

export const createBidApi = (shipmentId: string, payload: CreateBidDto) => {
  return api.post(`/shipments/${shipmentId}/bids`, payload);
};

export const updateBidApi = (shipmentId: string, bidId: number, payload: UpdateBidDto) => {
  return api.put(`/shipments/${shipmentId}/bids/${bidId}`, payload);
};

export const deleteBidApi = (shipmentId: string, bidId: number) => {
  return api.delete(`/shipments/${shipmentId}/bids/${bidId}`);
};
