import * as ReactDOM from 'react-dom';

import './Modal.scss';

const Modal = (props) => {
  const { modalHandler } = props;
  return ReactDOM.createPortal(
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className='modal-content__title'>
          {props.title}
          <button onClick={modalHandler}>X</button>
        </div>
        <div className='modal-content__body'>{props.children}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
