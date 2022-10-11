import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { getImagesApi } from 'utils/imagesApi';

const App = () => {
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [imagesGallery, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = q => {
    setQuery(prev => {
      if (prev !== q) {
        setImages([]);
        setPage(1);
      }
    });
    setQuery(q);
  };

  const toggleModal = (modalImage = null) => {
    setIsModalOpen(!isModalOpen);
    setModalImg(modalImage);
  };

  useEffect(() => {
    if (query === '') {
      setError(new Error('Enter to search images!'));
    } else {
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
    setPage(prev => prev + 1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery
        query={query}
        toggleModal={toggleModal}
        imagesGallery={imagesGallery}
        handleLoadMoreImages={handleLoadMoreImages}
        isLoading={isLoading}
        error={error}
      />
      {isModalOpen && <Modal modalImg={modalImg} closeModal={toggleModal} />}
    </div>
  );
};

export default App;
