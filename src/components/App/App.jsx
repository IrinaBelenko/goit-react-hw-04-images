import { Searchbar } from '../Searchbar/Searchbar';
import { getImages } from 'service/image-service';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button.styled';
import { Text } from '../Text/Text.styled';
import { BallTriangle } from 'react-loader-spinner';
import { AppDiv } from './App.styled';
import { Modal } from 'components/Modal/Modal';
import { useEffect, useState } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesList, setImagesList] = useState([]);
  const [modalParams, setModalParams] = useState({
    largeImageURL: '',
    tags: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisibleBtn, setIsVisibleBtn] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    const getImagesByQuery = async (query, page) => {
      try {
        setIsLoading(true);
        const { totalHits, hits } = await getImages(query, page);

        if (hits.length === 0) {
          setIsEmpty(true);
          return;
        }

        const imgList = hits.map(hit => ({
          id: hit.id,
          webformatURL: hit.webformatURL,
          largeImageURL: hit.largeImageURL,
          tags: hit.tags,
        }));

        setImagesList(prev => [...prev, ...imgList]);
        setIsVisibleBtn(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      getImagesByQuery(query, page);
    }
  }, [query, page]);

  const onSubmit = query => {
    // обнуление параметров
    setQuery(query);
    setPage(1);
    setImagesList([]);
    setModalParams({ largeImageURL: '', tags: '' });
    setIsLoading(false);
    setIsEmpty(false);
    setIsVisibleBtn(false);
    setIsShowModal(false);
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  const showModal = (largeImageURL, tags) => {
    setIsShowModal(true);
    setModalParams({ largeImageURL, tags });
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <AppDiv>
      <Searchbar onSubmit={onSubmit}></Searchbar>
      <ImageGallery imagesList={imagesList} showModal={showModal} />
      {isLoading && (
        <>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4d5ea9"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
          <Text>Loading ... </Text>
        </>
      )}
      {isEmpty && <Text>Sorry. There are no images ... 😭</Text>}
      {isVisibleBtn && (
        <Button type="button" onClick={onLoadMore}>
          Load more
        </Button>
      )}
      {isShowModal && (
        <Modal
          largeImageURL={modalParams.largeImageURL}
          tags={modalParams.tags}
          closeModal={closeModal}
        ></Modal>
      )}
    </AppDiv>
  );
};
