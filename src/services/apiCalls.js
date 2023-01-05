import axios from "axios";

const API_BASE_URL = "http://localhost:5000/";

//PRODUCTS
export const getProducts = async () => {
  return await axios.get(`${API_BASE_URL}products`);
};

//USERS
export const registerNewUser = async (user) => {
  return await axios.post(`${API_BASE_URL}users`, user);
};
export const checkEmail = async (email) => {
  let response = await axios.get(`${API_BASE_URL}users?email_like=${email}`);
  if (response.data.length === 0) return true;
  else return false;
};
export const loginUser = async (user) => {
  let response = await axios.get(`${API_BASE_URL}users?email_like=${user.email}`);
  //console.log("RESPONSE", response.data[0].password) 
  if (response.data.length === 0) return false;
  else if(user.password === response.data[0].password) return response.data
  else return false
}

//COMMENTS
export const createNewComment = async (comment) => {
  return await axios.post(`${API_BASE_URL}comments`, comment);
};

export const getAllComments = async () => {
  return await axios.get(`${API_BASE_URL}comments`);
};
