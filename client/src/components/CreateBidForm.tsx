import { FC, useState } from 'react';
import useCreateBid from '../hooks/useCreateBid';

type Props = {
  closeForm: () => void;
};

const CreateBidForm: FC<Props> = ({ closeForm }) => {
  const [amount, setAmount] = useState<string>('');
  const { loading, error, onSubmitHandler } = useCreateBid(amount, closeForm);

  return (
    <form onSubmit={onSubmitHandler}>
      {error && <div className='alert alert-danger'>{error}</div>}
      <div className='form-group'>
        <input type='number' className='form-control' value={amount} placeholder='amount' onChange={(e) => setAmount(e.target.value)} />
      </div>

      <div className='form-group d-grid mt-3'>
        <button type='submit' disabled={!amount.length || loading} className='btn btn-primary'>
          {loading ? 'Please wait ...' : 'Add Bid'}
        </button>
      </div>
    </form>
  );
};

export default CreateBidForm;
