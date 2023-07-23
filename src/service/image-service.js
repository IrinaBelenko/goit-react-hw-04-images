import axios from 'axios';

const API_KEY = '36838949-c6733ba7cda813dd9dfa43f4c';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(axios.defaults.baseURL, {
    params: {
      q: query,
      page,
    },
  });
  return data;
};
