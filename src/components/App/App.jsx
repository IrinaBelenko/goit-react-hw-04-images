import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { getImages } from 'service/image-service';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button.styled';
import { Text } from '../Text/Text.styled';
import { BallTriangle } from 'react-loader-spinner';
import { AppDiv } from './App.styled';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    imagesList: [],
    modalParams: { largeImageURL: '', tags: '' },
    isLoading: false,
    isEmpty: false,
    isVisibleBtn: false,
    isShowModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImagesByQuery(query, page);
    }
  }

  getImagesByQuery = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const { totalHits, hits } = await getImages(query, page);

      if (hits.length === 0) {
        this.setState({ isEmpty: true });
        return;
      }

      const imgList = hits.map(hit => ({
        id: hit.id,
        webformatURL: hit.webformatURL,
        largeImageURL: hit.largeImageURL,
        tags: hit.tags,
      }));

      this.setState(prevState => ({
        imagesList: [...prevState.imagesList, ...imgList],
        isVisibleBtn: page < Math.ceil(totalHits / 12),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSubmit = query => {
    // обнуление параметров
    this.setState({
      query,
      page: 1,
      imagesList: [],
      modalParams: { largeImageURL: '', tags: '' },
      isLoading: false,
      isEmpty: false,
      isVisibleBtn: false,
      isShowModal: false,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  showModal = (largeImageURL, tags) => {
    this.setState({
      isShowModal: true,
      modalParams: { largeImageURL, tags },
    });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const {
      imagesList,
      isLoading,
      isEmpty,
      isVisibleBtn,
      isShowModal,
      modalParams,
    } = this.state;
    return (
      <AppDiv>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>
        <ImageGallery imagesList={imagesList} showModal={this.showModal} />
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
          <Button type="button" onClick={this.onLoadMore}>
            Load more
          </Button>
        )}
        {isShowModal && (
          <Modal
            largeImageURL={modalParams.largeImageURL}
            tags={modalParams.tags}
            closeModal={this.closeModal}
          ></Modal>
        )}
      </AppDiv>
    );
  }
}
