import axios from 'axios';

const API_KEY = '25802265-f217fc33d7f2a9a9b0a0a0132';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImagesApi = (q, page) => {
  axios.defaults.params = {
    q: q,
    page: page,
    key: API_KEY,
    per_page: 12,
  };

  return axios.get().then(({ data }) => data.hits);
};
