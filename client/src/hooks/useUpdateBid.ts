import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UpdateBidDto } from '../helpers/interfaces';
import { errorMessage } from '../helpers/utils';
import { updateBid } from '../states/action-creators';

const useUpdateBid = (amount: string, isAvailable: boolean, bidId: number, closeForm: () => void) => {
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
      const payload: UpdateBidDto = {
        amount: parseFloat(amount),
        status: isAvailable ? 'placed' : 'unavailable',
      };

      await dispatch(updateBid(shipmentId, bidId, payload));
      closeForm();
    } catch (error: any) {
      setError(errorMessage(error));
      setLoading(false);
    }
  };
  return { loading, error, onSubmitHandler };
};

export default useUpdateBid;
