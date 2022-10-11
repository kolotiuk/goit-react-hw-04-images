import Button from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from './../Loader/Loader';
import s from './ImageGallery.module.scss';
import { PropTypes } from 'prop-types';

const ImageGallery = ({
  toggleModal,
  imagesGallery,
  handleLoadMoreImages,
  isLoading,
  error,
}) => {
  return (
    <>
      <ul className={s.ImageGallery}>
        {imagesGallery.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              id={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              openModal={toggleModal}
            />
          );
        })}
      </ul>
      {imagesGallery.length > 0 &&
        (imagesGallery.length < 12 || (
          <Button handleLoadMoreImages={handleLoadMoreImages} />
        ))}
      {isLoading && <Loader />}
      {error && <h1>{error.message}</h1>}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  handleLoadMoreImages: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  imagesGallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
