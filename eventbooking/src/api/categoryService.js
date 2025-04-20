import axios from 'axios';

const API_URL = 'https://localhost:7291/api/Categories';

const getAllCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export default {
  getAllCategories
};