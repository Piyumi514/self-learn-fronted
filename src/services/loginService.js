import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginVerify = async (email, password) => {
  return await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
};
