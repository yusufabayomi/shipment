import { FC } from 'react';
import { Bid } from '../helpers/interfaces';
import useToggle from '../hooks/useToggle';
import BidRow from './BidRow';
import CreateBidForm from './CreateBidForm';
import Modal from './Modal';

type Props = {
  bids: Bid[];
};

const ShipmentBids: FC<Props> = ({ bids }) => {
  const { show: showForm, toggle: toggleForm } = useToggle();
  return (
    <>
      <div className='card'>
        <div className='card-header'>
          <div className='d-flex justify-content-between'>
            <span>Bids</span>
            <button className='btn btn-primary' onClick={toggleForm}>
              Bid For Shipment
            </button>
          </div>
        </div>
        <div className='card-body'>
          <div className='table-response'>
            <table className='table table-striped table-hover'>
              <thead>
                <tr>
                  <th scope='col'>Amount</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Driver</th>
                  <th scope='col'>Created At</th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid) => (
                  <BidRow key={bid.id} bid={bid} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showForm} toggle={toggleForm} title='Make A Bid'>
        <CreateBidForm closeForm={toggleForm} />
      </Modal>
    </>
  );
};

export default ShipmentBids;
