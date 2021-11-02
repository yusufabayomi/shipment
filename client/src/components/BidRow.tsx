import { FC } from 'react';
import { Bid } from '../helpers/interfaces';
import { authenticatedDriver, formatDate } from '../helpers/utils';
import useToggle from '../hooks/useToggle';
import DeleteBid from './DeleteBid';
import EditBidForm from './EditBidForm';
import Modal from './Modal';

type Props = {
  bid: Bid;
};
const BidRow: FC<Props> = ({ bid }) => {
  const { show: showForm, toggle: toggleForm } = useToggle();
  const { show: showDeletePrompt, toggle: toggleDeletePrompt } = useToggle();
  return (
    <>
      <tr key={bid.id}>
        <td>${bid.amount}</td>
        <td>{bid.status}</td>
        <td>{bid.driver.display_name}</td>
        <td>{formatDate(bid.created_at)}</td>
        <td>
          {bid.driver.id === authenticatedDriver.id && (
            <>
              <button className='btn btn-info btn-sm me-2' onClick={toggleForm}>
                Edit
              </button>
              <button className='btn btn-danger btn-sm' onClick={toggleDeletePrompt}>
                Delete
              </button>
            </>
          )}
        </td>
      </tr>

      <Modal show={showForm} toggle={toggleForm} title='Update A Bid'>
        <EditBidForm closeForm={toggleForm} bid={bid} />
      </Modal>

      <Modal show={showDeletePrompt} toggle={toggleDeletePrompt} title='Delete A Bid'>
        <DeleteBid closePrompt={toggleDeletePrompt} bidId={bid.id} />
      </Modal>
    </>
  );
};

export default BidRow;
