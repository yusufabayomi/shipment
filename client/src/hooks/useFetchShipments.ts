import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { errorMessage } from '../helpers/utils';
import { fetchShipments } from '../states/action-creators';

const useFetchShipments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const dispatch = useDispatch();

  useEffect(() => {
    const handleFetchShipments = async () => {
      setLoading(true);
      setError(null);
      try {
        await dispatch(fetchShipments());
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(errorMessage(error));
      }
    };
    handleFetchShipments();
  }, [dispatch]);

  return { loading, error };
};

export default useFetchShipments;
