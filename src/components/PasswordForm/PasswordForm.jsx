import React, { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import { validateForm } from "../../services/validate";
import { updateUser } from "../../services/apiCalls";

export const PasswordForm = ({ user, togglePassForm }) => {
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleData = (e) => {
    setNewPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const changePassword = () => {
    if (newPassword.newPassword === newPassword.repeatPassword) {
      let validationError = validateForm({
        name: user.name,
        email: user.email,
        password: newPassword.newPassword,
      });
      if (validationError === null) {
        updateUser({
          password: newPassword.newPassword,
          id: user.id,
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
            width: 300,
            mx: "auto", // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant="outlined"
        >
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
            <div>{error === null ? null : error}</div>
          </Typography>
          
        </Sheet>
      </main>
    </CssVarsProvider>
  );
};

