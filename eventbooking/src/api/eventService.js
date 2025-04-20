import axios from 'axios';

const API_URL = 'https://localhost:7291/api/Events';

const getAllEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const getEventsByCategory = async (categoryId) => {
  const response = await axios.get(`${API_URL}/category/${categoryId}`);
  return response.data;
};

export default {
  getAllEvents,
  getEventById,
  getEventsByCategory
};