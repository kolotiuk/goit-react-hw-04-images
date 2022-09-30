import { useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const onSubmit = query => {
    setQuery(query);
  };

  const toggleModal = (modalImage = null) => {
    setIsModalOpen(!isModalOpen);
    setModalImg(modalImage);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery query={query} toggleModal={toggleModal} />
      {isModalOpen && <Modal modalImg={modalImg} closeModal={toggleModal} />}
    </div>
  );
};

export default App;
