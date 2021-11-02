import { useSelector } from 'react-redux';
import useFetchShipments from '../hooks/useFetchShipments';
import { RootState } from '../states/reducers';
import Notification from '../components/Notification';
import ShipmentCard from '../components/ShipmentCard';

const HomePage = () => {
  const { loading, error } = useFetchShipments();
  const { shipments } = useSelector((state: RootState) => state.shipmentReducer);

  return (
    <>
      {loading && !shipments && <Notification text='please wait ...' type='info' />}
      {error && <Notification text={error} type='error' />}
      {!error && (
        <div className='col-lg-10 offset-lg-1'>
          {shipments && (
            <>
              <h4 className='mb-4 text-center'>Available Shipments</h4>
              {shipments.map((shipment) => (
                <ShipmentCard key={shipment.id} shipment={shipment} />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
