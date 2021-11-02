import { FC } from 'react';

type Props = {
  title: string;
  detail: string;
};

const DetailListTile: FC<Props> = ({ title, detail }) => {
  return (
    <div className='d-flex justify-content-between'>
      <div className='fs-8'>{title}</div>
      <div>{detail}</div>
    </div>
  );
};

export default DetailListTile;
