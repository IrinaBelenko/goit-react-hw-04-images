import {
  ImageGalleryItemImage,
  ImageGalleryItemli,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  showModal,
}) => {
  return (
    <ImageGalleryItemli onClick={() => showModal(largeImageURL, tags)}>
      <ImageGalleryItemImage src={webformatURL} alt={tags} />
    </ImageGalleryItemli>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  showModal: PropTypes.func,
};
