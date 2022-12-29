import axios from "axios";

const API_BASE_URL = "http://localhost:5000/";

export const getProducts = async () => {
  return await axios.get(`${API_BASE_URL}products`);
};
export const registerNewUser = async (user) => {
  return await axios.post(`${API_BASE_URL}users`, user);
};

export const checkEmail = async (email) => {
  let response = await axios.get(`${API_BASE_URL}users?email_like=${email}`);
  if (response.data.length === 0) return true;
  else return false;
};
