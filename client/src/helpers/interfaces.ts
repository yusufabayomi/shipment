export type BidStatus = 'unavailable' | 'placed';

export interface Shipment {
  id: string;
  animal_breed: string;
  category: string;
  subcategory: string;
  title: string;
  mileage: number;
  posted_at: string;
  about: string;
  pickup: Location;
  delivery: Location;
  bids: BidData;
  shipper: Shipper;
}

interface Location {
  city: string;
  region_code: string;
  address: string;
  flexible: boolean;
  pickup: string;
  lat: number;
  lng: number;
}

export interface Driver {
  id: number;
  display_name: string;
  first_name: string;
  full_name: string;
  profile_slug: string;
}

export interface Bid {
  id: number;
  amount: number;
  status: BidStatus;
  created_at: string;
  driver: Driver;
}

interface BidData {
  data: Bid[];
}

interface Shipper {
  display_name: string;
  initials: string;
  first_name: string;
  last_name: string;
  full_name: string;
  id: number;
  joined_at: string;
  locked: boolean;
  profile_slug: string;
  type: string;
}

export interface CreateBidDto {
  amount: number;
}

export interface UpdateBidDto {
  amount: number;
  status: BidStatus;
}

export interface ShipmentState {
  shipments: null | Shipment[];
  shipment: null | Shipment;
}
