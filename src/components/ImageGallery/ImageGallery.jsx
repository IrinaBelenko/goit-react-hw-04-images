import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryUl } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ imagesList, showModal }) => {
  return (
    <ImageGalleryUl>
      {imagesList.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            showModal={showModal}
          />
        );
      })}
    </ImageGalleryUl>
  );
};

ImageGallery.propTypes = {
  imagesList: PropTypes.array,
  showModal: PropTypes.func,
};
