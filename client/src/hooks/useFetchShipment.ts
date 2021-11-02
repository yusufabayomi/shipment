import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { errorMessage } from '../helpers/utils';
import { fetchShipment } from '../states/action-creators';

const useFetchShipment = () => {
  const { shipmentId } = useParams<{ shipmentId: string }>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>();

  const dispatch = useDispatch();

  useEffect(() => {
    const handleFetchShipment = async () => {
      setLoading(true);
      try {
        await dispatch(fetchShipment(shipmentId));
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError(errorMessage(error));
      }
    };
    handleFetchShipment();
  }, [dispatch, shipmentId]);

  return { loading, error };
};

export default useFetchShipment;
