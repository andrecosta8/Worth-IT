import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { deleteUser, getAllUsers, updateUser } from "../../services/apiCalls";
import "./UsersManagement.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


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
    try {
      let response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteThisUser = async (user) => {
    try {
      await deleteUser(user);
      getUsersList();
    } catch (error) {
      console.log(error);
    }
  };

  const makeAdmin = async (user) => {
    let updatedUser = {
      id: user.id,
      isAdmin: !user.isAdmin,
    };
    try {
      await updateUser(updatedUser);
      getUsersList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="adminDesign">
      <div>LIST OF USERS:</div>
      {users.map((user) => {
        return (
    <Card sx={{ width: 350 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {user.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {user.email}
        </Typography>
      </CardContent>
      <CardActions>
        {user.isAdmin === true ? <Button className="redButton" onClick={() => makeAdmin(user)} size="small">Remove from admin</Button> : <Button className="greenButton" onClick={() => makeAdmin(user)} size="small">Set as Admin</Button> }
        <Button onClick={() => deleteThisUser(user)} size="small">Delete User</Button>
      </CardActions>
    </Card>
    );
      })}
    </div>
  );
}

export default UsersManagement;