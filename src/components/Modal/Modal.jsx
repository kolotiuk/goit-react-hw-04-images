import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';
import s from './Modal.module.scss';

const modalRef = document.querySelector('.modal');

const Modal = ({ modalImg, closeModal }) => {
  useEffect(() => {
    const handleEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeModal]);

  const handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdrop}>
      <div className={s.Modal}>
        <img className={s.ModalImg} src={modalImg} alt="" />
      </div>
    </div>,
    modalRef
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalImg: PropTypes.string.isRequired,
};
