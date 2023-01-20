import "./UsersManagement.css";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Alert } from "../../components/Alert/Alert";
import { AuthContext } from "../../providers/AuthProvider";
import { deleteUser, getAllUsers, updateUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

const UsersManagement = () => {
  const [action, setAction] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [userToAction, setUserToAction] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { admin } = useContext(AuthContext);

  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    if (!admin) navigate("/");
  });

  const getUsersList = async () => {
    try {
      let response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const deleteThisUser = (user) => {
    try {
      deleteUser(user);
      getUsersList();
      handleClose();
    } catch (error) {
      setError(error);
    }
  };

  const makeAdmin = (user) => {
    let updatedUser = {
      id: user.id,
      isAdmin: !user.isAdmin,
    };
    try {
      updateUser(updatedUser);
      getUsersList();
    } catch (error) {
      setError(error);
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
    <div className="adminDesign">
      <Alert
        action={action}
        deleteThisUser={deleteThisUser}
        user={userToAction}
        handleClose={handleClose}
        open={open}
      />
      {users.map((user) => {
        return (
          <Card className="card">
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
                  Remove from admin
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => makeAdmin(user)}
                  size="small"
                >
                  Set as Admin
                </Button>
              )}
              <Button
                variant="contained"
                color="error"
                onClick={() => handleClickOpen("deleteUser", user)}
                size="small"
              >
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
