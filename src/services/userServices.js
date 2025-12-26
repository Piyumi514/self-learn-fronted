import axios from "axios";

const API_URL = "http://localhost:5000/api/user";

export const createUser = async (userData) => {
  return await axios.post(`${API_URL}/add-user`, userData);
};

export const getUsers = async () => {
  return await axios.get(`${API_URL}/get-users`);
};
