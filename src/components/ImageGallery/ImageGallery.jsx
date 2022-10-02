import { useState, useEffect } from 'react';
import Button from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { getImagesApi } from './../../utils/imagesApi';
import Loader from './../Loader/Loader';
import s from './ImageGallery.module.scss';
import { PropTypes } from 'prop-types';

const ImageGallery = ({ query, toggleModal }) => {
  const [imagesGallery, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // static propTypes = {
  //   query: PropTypes.string.isRequired,
  //   toggleModal: PropTypes.func.isRequired,
  // };

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, []);

  useEffect(() => {
    // setImages([]);
    // setPage(1);
    if (query === '') {
      setError(new Error('Enter to search images!'));
    } else {
      // setPage(1);
      getImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const getImages = () => {
    setIsLoading(true);
    setError(null);

    getImagesApi(query, page)
      .then(images => {
        if (!images.length) {
          throw new Error('Bad request!!!');
        }
        setImages(prev => [...prev, ...images]);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLoadMoreImages = () => {
    setPage(page + 1);
  };

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
// class ImageGallery extends Component {
//   state = {
//     images: [],
//     page: 1,
//     isLoading: false,
//     error: null,
//   };

//   static propTypes = {
//     query: PropTypes.string.isRequired,
//     toggleModal: PropTypes.func.isRequired,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.query !== this.props.query) {
//       this.setState({ images: [], page: 1 });
//     }
//     if (
//       prevState.page !== this.state.page ||
//       (prevProps.query !== this.props.query && this.state.page === 1)
//     ) {
//       if (this.props.query === '') {
//         this.setState({ error: new Error('Value NONE!!!') });
//       } else {
//         this.getImages();
//       }
//     }
//   }

//   getImages = () => {
//     this.setState({ isLoading: true, error: null });
//     getImagesApi(this.props.query, this.state.page)
//       .then(images => {
//         if (!images.length) {
//           throw new Error('Bad request!!!');
//         }
//         this.setState(prev => ({ images: [...prev.images, ...images] }));
//       })
//       .catch(error => {
//         this.setState({ error });
//       })
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   handleLoadMoreImages = () => {
//     this.setState(prev => ({ page: prev.page + 1 }));
//   };

//   render() {
//     const { images, isLoading, error } = this.state;
//     const { toggleModal } = this.props;

//     return (
//       <>
//         <ul className={s.ImageGallery}>
//           {images.map(({ id, webformatURL, largeImageURL }) => {
//             return (
//               <ImageGalleryItem
//                 key={id}
//                 id={id}
//                 webformatURL={webformatURL}
//                 largeImageURL={largeImageURL}
//                 openModal={toggleModal}
//               />
//             );
//           })}
//         </ul>
//         {images.length > 0 &&
//           (images.length < 12 || (
//             <Button handleLoadMoreImages={this.handleLoadMoreImages} />
//           ))}
//         {isLoading && <Loader />}
//         {error && <h1>{error.message}</h1>}
//       </>
//     );
//   }
// }

export default ImageGallery;
