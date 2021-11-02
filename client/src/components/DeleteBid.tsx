import { FC } from 'react';
import useDeleteBid from '../hooks/useDeleteBid';
import Notification from '../components/Notification';

type Props = {
  closePrompt: () => void;
  bidId: number;
};

const DeleteBid: FC<Props> = ({ closePrompt, bidId }) => {
  const { error, onClickHandler } = useDeleteBid(bidId, closePrompt);
  return (
    <>
      {error && <Notification text={error} type='error' />}
      <div className='text-center'>
        <p>Are you sure you want to retract your bid?</p>
        <div className='d-flex justify-content-center'>
          <button className='btn btn-info btn-sm me-2' onClick={onClickHandler}>
            Yes
          </button>
          <button className='btn btn-danger btn-sm' onClick={closePrompt}>
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteBid;
