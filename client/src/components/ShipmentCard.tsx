import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Shipment } from '../helpers/interfaces';

type Props = {
  shipment: Shipment;
};

const ShipmentCard: FC<Props> = ({ shipment }) => {
  return (
    <div className='card mb-2' key={shipment.id}>
      <div className='card-body'>
        <div className='row'>
          <div className='col-lg-6'>
            <div>Title</div>
            <h6>{shipment.title}</h6>
          </div>
          <div className='col-lg-4'>
            <div>Category</div>
            <h6>{shipment.category}</h6>
          </div>
          <div className='col-lg-2'>
            <Link to={`/shipments/${shipment.id}`} className='btn btn-primary'>
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCard;
