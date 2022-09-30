import { Component } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';
import s from './Modal.module.scss';

const modalRef = document.querySelector('.modal');
class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    modalImg: PropTypes.string.isRequired,
  };

  handleEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { modalImg } = this.props;

    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdrop}>
        <div className={s.Modal}>
          <img className={s.ModalImg} src={modalImg} alt="" />
        </div>
      </div>,
      modalRef
    );
  }
}

export default Modal;
