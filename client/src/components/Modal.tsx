import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  children: ReactNode;
  show: boolean;
  toggle: () => void;
  title: string;
};

const Modal: FC<Props> = ({ children, show, toggle, title }) => {
  if (show) {
    return ReactDOM.createPortal(
      <>
        <div className='modal fade show' tabIndex={-1} aria-hidden='true' onClick={toggle}>
          <div className='modal-dialog modal-dialog-centered' onClick={(e) => e.stopPropagation()}>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>{title}</h5>
                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={toggle}></button>
              </div>
              <div className='modal-body'>{children}</div>
            </div>
          </div>
        </div>
      </>,
      document.getElementById('modal-root')!
    );
  }
  return null;
};

export default Modal;
