import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { AuthContext } from "../../providers/AuthProvider";
import { PasswordForm } from "../../components/PasswordForm/PasswordForm";
import Button from "@mui/material/Button";
import { Card, CardActions, CardContent } from "@mui/material";
import { Typography } from "@mui/joy";

const Admin = () => {
  const { admin, user } = useContext(AuthContext);
  const [passForm, setPassForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin === null) navigate("/");
  });
  const togglePassForm = () => {
    setPassForm(!passForm);
  };

  return (
    <div className="adminHomeDesign">
       {passForm === true ? (
        <PasswordForm user={user} togglePassForm={togglePassForm} />
      ) : <>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div className="adminProfile">
      <Card className="card" >
      <CardContent className="cardContent">
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          <h3>Admin: {user.name}</h3>
          <h5>ID: {user.id}</h5>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <h5>E-mail: {user.email}</h5>
        </Typography>
      </CardContent>
      <CardActions className="cardActions">
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() =>
          setTimeout(() => {
            togglePassForm();
          }, 250)
        }
      >
        Change Password
      </Button>
      </CardActions>
    </Card>
      
      </div>
      <div className="managementSelectors">
     
      <Button
        className="managementButton"
         variant="contained"
         color="primary"
         size="small"
        onClick={() =>
          setTimeout(() => {
            navigate("/admin/products");
          }, 250)
        }
      >
        Products Management
      </Button>
      <Button
        className="managementButton"
         variant="contained"
         color="primary"
         size="small"
        onClick={() =>
          setTimeout(() => {
            navigate("/admin/comments");
          }, 250)
        }
      >
        Comments Management
      </Button>
      <Button
         variant="contained"
         color="primary"
         className="managementButton"
        onClick={() =>
          setTimeout(() => {
            navigate("/admin/users");
          }, 250)
        }
        size="small"
      >
        Users Management
      </Button>
      </div>
      </>}
    </div>
  );
};

export default Admin;
