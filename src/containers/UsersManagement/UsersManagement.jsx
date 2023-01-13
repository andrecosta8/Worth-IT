import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { deleteUser, getAllUsers, updateUser } from "../../services/apiCalls";
import "./UsersManagement.css";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    if (admin === null) navigate("/");
  });

  const getUsersList = async () => {
    let response = await getAllUsers();
    setUsers(response.data);
  };

  const deleteThisUser = (user) => {
    deleteUser(user);
    getUsersList();
  };

  const makeAdmin = (user) => {
    let updatedUser = {
      id: user.id,
      isAdmin: !user.isAdmin,
    };
    updateUser(updatedUser);
    getUsersList();
  };

  return (
    <div className="adminDesign">
      <div>LIST OF USERS:</div>
      {users.map((user) => {
        return (
          <div>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <button onClick={() => makeAdmin(user)}>
              {user.isAdmin.toString()}
            </button>
            <button onClick={() => deleteThisUser(user)}>Delete User</button>
            <br></br>
          </div>
        );
      })}
    </div>
  );
};

export default UsersManagement;
