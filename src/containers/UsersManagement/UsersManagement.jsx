import "./UsersManagement.css";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from '@mui/icons-material/Done';
import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Alert } from "../../components/Alert/Alert";
import { AuthContext } from "../../providers/AuthProvider";
import { deleteUser, getAllUsers, updateUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

const UsersManagement = () => {
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userToAction, setUserToAction] = useState({});
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [action, setAction] = useState("");

  useEffect(() => {
    getUsersList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (admin === null) navigate("/");
  });

  const getUsersList = async () => {
    try {
      let response = await getAllUsers();
      setUsers(response.data);
    } catch (err) {
      setError(err);
      console.error(error)
    }
  };

  const deleteThisUser = async (user) => {
    try {
      await deleteUser(user);
      getUsersList();
      handleClose();
    } catch (err) {
      setError(err);
      console.error(error);
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
    } catch (err) {
      setError(err);
      console.error(error);
    }
  };

  const handleClickOpen = (actionToDo, user) => {
    setAction(actionToDo);
    setUserToAction(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAction("");
  };

  return (
    <div className="adminUsersDesign">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <Alert
        action={action}
        deleteThisUser={deleteThisUser}
        user={userToAction}
        handleClose={handleClose}
        open={open}
      />
      {users.map((user) => {
        return (
          <Card key={user.id} className="card">
            <CardContent className="cardContent">
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                <h3>User: {user.name}</h3>
                <h5>ID: {user.id}</h5>
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <h5>E-mail: {user.email}</h5>
              </Typography>
            </CardContent>
            <CardActions className="cardActions">
              {user.isAdmin === true ? (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => makeAdmin(user)}
                  size="small"
                >
                  <CloseIcon />
                  Remove admin
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => makeAdmin(user)}
                  size="small"
                >
                  <DoneIcon />
                  Set as Admin
                </Button>
              )}
              <Button
                variant="contained"
                color="error"
                onClick={() => handleClickOpen("deleteUser", user)}
                size="small"
              >
                 <DeleteIcon />
                Delete User
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default UsersManagement;
