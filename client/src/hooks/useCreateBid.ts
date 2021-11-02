import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CreateBidDto } from '../helpers/interfaces';
import { errorMessage } from '../helpers/utils';
import { createBid } from '../states/action-creators';

const useCreateBid = (amount: string, closeForm: () => void) => {
  const { shipmentId } = useParams<{ shipmentId: string }>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>();

  const dispatch = useDispatch();

  // flash error message and clear after 5 seconds
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: CreateBidDto = { amount: parseFloat(amount) };
      await dispatch(createBid(shipmentId, payload));
      closeForm();
    } catch (error: any) {
      setLoading(false);
      setError(errorMessage(error));
    }
  };
  return { loading, error, onSubmitHandler };
};

export default useCreateBid;
