import { useSelector } from 'react-redux';
import useFetchShipment from '../hooks/useFetchShipment';
import { RootState } from '../states/reducers';
import Notification from '../components/Notification';
import DetailListTile from '../components/DetailListTile';
import ShipmentBids from '../components/ShipmentBids';
import { Link } from 'react-router-dom';
import { formatDate } from '../helpers/utils';

const ShipmentPage = () => {
  const { loading, error } = useFetchShipment();
  const { shipment } = useSelector((state: RootState) => state.shipmentReducer);

  return (
    <>
      {loading && !shipment && <Notification text='please wait ...' type='info' />}
      {error && <Notification text={error} type='error' />}
      {!error && shipment && (
        <div>
          <div className='card mb-4'>
            <div className='card-header d-flex justify-content-between'>
              <span>Shipment Detail</span>
              <Link to='/' className='btn btn-primary'>
                Back to Shipments
              </Link>
            </div>
            <div className='card-body'>
              <DetailListTile title='Title' detail={shipment.title} />
              <DetailListTile title='About Shipment' detail={shipment.about} />
              <DetailListTile title='Category' detail={shipment.category} />
              <DetailListTile title='Sub-Category' detail={shipment.subcategory} />
              <DetailListTile title='Breed' detail={shipment.animal_breed} />
              <DetailListTile title='Milleage' detail={shipment.mileage!.toString()} />
              <DetailListTile title='Created On' detail={formatDate(shipment.posted_at)} />
            </div>
          </div>

          <div className='row mb-4'>
            <div className='col-lg-4'>
              <div className='card'>
                <div className='card-header'>Pickup</div>
                <div className='card-body'>
                  <DetailListTile title='Address' detail={shipment.pickup.address} />
                  <DetailListTile title='City' detail={shipment.pickup.city} />
                  <DetailListTile title='Region' detail={shipment.pickup.region_code} />
                  <DetailListTile title='Latitude' detail={shipment.pickup.lat.toString()} />
                  <DetailListTile title='Latitude' detail={shipment.pickup.lng.toString()} />
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='card'>
                <div className='card-header'>Delivery</div>
                <div className='card-body'>
                  <DetailListTile title='Address' detail={shipment.delivery.address} />
                  <DetailListTile title='City' detail={shipment.delivery.city} />
                  <DetailListTile title='Region' detail={shipment.delivery.region_code} />
                  <DetailListTile title='Latitude' detail={shipment.delivery.lat.toString()} />
                  <DetailListTile title='Latitude' detail={shipment.delivery.lng.toString()} />
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='card'>
                <div className='card-header'>Shipper Detail</div>
                <div className='card-body'>
                  <DetailListTile title='Display Name' detail={shipment.shipper.display_name} />
                  <DetailListTile title='Initials' detail={shipment.shipper.initials} />
                  <DetailListTile title='Full Name' detail={shipment.shipper.full_name} />
                  <DetailListTile title='Type' detail={shipment.shipper.type} />
                  <DetailListTile title='Date Joined' detail={formatDate(shipment.shipper.joined_at)} />
                </div>
              </div>
            </div>
          </div>

          <ShipmentBids bids={shipment.bids.data} />
        </div>
      )}
    </>
  );
};

export default ShipmentPage;
