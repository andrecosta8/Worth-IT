import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllComments,
  getAllUsers,
  getAllProducts,
} from "../../services/apiCalls";
import "./Admin.css";
import { AuthContext } from "../../providers/AuthProvider";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();

  const getUsersList = async () => {
    let response = await getAllUsers();
    setUsers(response.data);
  };
  const getProductsList = async () => {
    let response = await getAllProducts();
    setProducts(response.data);
  };

  const getCommentsList = async () => {
    let response = await getAllComments();
    setComments(response.data);
  };

  useEffect(() => {
    getUsersList();
    getProductsList();
    getCommentsList();
  }, []);

  return (
    <div className="adminHomeDesign">
      Admin
      <div>LIST OF USERS:</div>
      {users.map((user) => {
        return (
          <div>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.isAdmin}</div>
            <br></br>
          </div>
        );
      })}
      <div>LIST OF PRODUCTS:</div>
      {products.map((product) => {
        return (
          <div>
            <div>{product.name}</div>
            <br></br>
          </div>
        );
      })}
      <div>LIST OF FLAGED COMMENTS:</div>
      {comments.map((comment) => {
        if (comment.badWordFlaged === true)
          return (
            <div>
              <div>{comment.user}</div>
              <div>{comment.createdAt}</div>
              <div>{comment.body}</div>
              <br></br>
            </div>
          );
      })}
    </div>
  );
};

export default Admin;
