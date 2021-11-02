import { FC } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  text: string;
  type: 'error' | 'info';
};

const Notification: FC<Props> = ({ text, type }) => {
  return ReactDOM.createPortal(
    <>
      <div className={`notification ${type}`}>{text}</div>
    </>,
    document.getElementById('notification')!
  );
};

export default Notification;
