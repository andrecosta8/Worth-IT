import Button from "@mui/joy/Button";
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from "react";
import Sheet from "@mui/joy/Sheet";
import TextField from "@mui/joy/TextField";
import Typography from "@mui/joy/Typography";
import { red  } from "@mui/material/colors";
import { updateUser } from "../../services/apiCalls";
import { validateForm } from "../../services/validate";
import { CssVarsProvider } from "@mui/joy";

export const PasswordForm = ({ user, togglePassForm }) => {
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleData = e => {
    setNewPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const changePassword = async () => {
    if (newPassword.newPassword === newPassword.repeatPassword) {
      let validationError = validateForm({
        email: user.email,
        name: user.name,
        password: newPassword.newPassword,
      });

      if (!validationError) {
       await updateUser({
          id: user.id,
          password: newPassword.newPassword,
        });
        togglePassForm();
      }
      setError(validationError);
    } else {
      setError("Passwords needs to match");
    }
  };
  return (
    <CssVarsProvider>
      <main>
        <Sheet
          sx={{
            borderRadius: "sm",
            boxShadow: "md",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mx: "auto", // margin left & right
            my: 4, // margin top & botom
            px: 2, // padding left & right
            py: 3, // padding top & bottom
            width: 300,
          }}
          variant="outlined"
        >
          <CloseIcon  onClick={()=> togglePassForm()} sx={{ color: red[500], fontSize: 30 }} />
          <div>
            <Typography level="h4" component="h1">
              <b>{user.name}</b>
            </Typography>
            <Typography level="body2">Please type the new password</Typography>
          </div>
          <TextField
            name="password"
            type="password"
            placeholder="Type the new password..."
            label="New Password"
            onChange={(e) => {
                handleData(e);
              }}
          />

          <TextField
            name="repeatPassword"
            type="password"
            placeholder="...repeat the new password"
            label="New Password"
            onChange={(e) => {
                handleData(e);
              }}
          />
          <Button onClick={() => changePassword()} sx={{ mt: 1 /* margin top */ }}>Change Password</Button>
          <Typography
            fontSize="sm"
            sx={{ alignSelf: "center" }}
          >
            <div>{error && error}</div>
          </Typography>
        </Sheet>
      </main>
      </CssVarsProvider>
  );
};

