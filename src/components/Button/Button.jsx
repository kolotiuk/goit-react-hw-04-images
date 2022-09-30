import PropTypes from 'prop-types';
import s from './Button.module.scss';

const Button = ({ handleLoadMoreImages }) => {
  return (
    <button className={s.Button} onClick={handleLoadMoreImages}>
      Load more
    </button>
  );
};

Button.propTypes = {
  handleLoadMoreImages: PropTypes.func.isRequired,
};

export default Button;
