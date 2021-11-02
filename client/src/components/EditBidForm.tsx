import { FC, useState } from 'react';
import { Bid } from '../helpers/interfaces';
import useUpdateBid from '../hooks/useUpdateBid';

type Props = {
  closeForm: () => void;
  bid: Bid;
};

const EditBidForm: FC<Props> = ({ closeForm, bid }) => {
  const [amount, setAmount] = useState<string>(bid.amount.toString());

  // make drive available if status is 'placed'
  const [isAvailable, setisAvailable] = useState(bid.status === 'placed' ? true : false);
  const { loading, error, onSubmitHandler } = useUpdateBid(amount, isAvailable, bid.id, closeForm);

  return (
    <form onSubmit={onSubmitHandler}>
      {error && <div className='alert alert-danger'>{error}</div>}
      <div className='form-group'>
        <input type='number' className='form-control' value={amount} placeholder='amount' onChange={(e) => setAmount(e.target.value)} />
      </div>

      <div className='form-group mt-3'>
        <label>
          <input type='checkbox' checked={isAvailable} onChange={() => setisAvailable(!isAvailable)} /> Are you still available?
        </label>
      </div>

      <div className='form-group d-grid mt-3'>
        <button type='submit' disabled={!amount.length || loading} className='btn btn-primary'>
          {loading ? 'Please wait ...' : 'Update Bid'}
        </button>
      </div>
    </form>
  );
};

export default EditBidForm;
