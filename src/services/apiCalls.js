import axios from "axios";

const API_BASE_URL = "http://localhost:5000/";


//PRODUCTS
export const getAllProducts = async () => {
  return await axios.get(`${API_BASE_URL}products`);
};

export const createNewProduct = async (product) => {
  return await axios.post(`${API_BASE_URL}products`, product)
}

export const deleteProduct = async (product) => {
  return await axios.delete(`${API_BASE_URL}products/${product.id}`)
}

export const updateProduct = async (product) => {
  return await axios.patch(`${API_BASE_URL}products/${product.id}`,product)
}


//USERS
export const getAllUsers = async () => {
  return await axios.get(`${API_BASE_URL}users`);
};

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
  if (response.data.length === 0) return false;
  else if(user.password === response.data[0].password) return response.data
  else return false
}

export const deleteUser = async (user) => {
  return await axios.delete(`${API_BASE_URL}users/${user.id}`);
}

export const updateUser = async (user) => {
  return await axios.patch(`${API_BASE_URL}users/${user.id}`,user);
}


//COMMENTS
export const createNewComment = async (comment) => {
  console.log("HERE")
  return await axios.post(`${API_BASE_URL}comments`, comment);
};

export const getAllComments = async () => {
  return await axios.get(`${API_BASE_URL}comments`);
};

export const deleteComment = async (comment) => {
  return await axios.delete(`${API_BASE_URL}comments/${comment.id}`);
};

export const updateComment = async (comment) => {
  return await axios.patch(`${API_BASE_URL}comments/${comment.id}`, comment)
}

//BAD WORDS CHECK
export const badWords = async (comment) => {
  return await axios.get(`https://www.purgomalum.com/service/containsprofanity?text=${comment}`)
}

