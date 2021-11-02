import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { errorMessage } from '../helpers/utils';
import { deleteBid } from '../states/action-creators';

const useDeleteBid = (bidId: number, closePrompt: () => void) => {
  const { shipmentId } = useParams<{ shipmentId: string }>();

  const [error, setError] = useState<null | string>();

  const dispatch = useDispatch();

  // flash error message and clear after 5 seconds
  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, [error]);

  const onClickHandler = async () => {
    try {
      dispatch(deleteBid(shipmentId, bidId));
      closePrompt();
    } catch (error: any) {
      setError(errorMessage(error));
    }
  };
  return { error, onClickHandler };
};

export default useDeleteBid;
