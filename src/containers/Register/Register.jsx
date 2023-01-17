import React, { useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { useNavigate } from "react-router-dom";
import { checkEmail, registerNewUser } from "../../services/apiCalls";
import { validateForm } from "../../services/validate";
import "./Register.css";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
}

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleData = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const register = async (user) => {
    let validationError;
    if ((await checkEmail(user.email)) === false) {
      validationError = "E-mail is already in use";
    } else {
      validationError = validateForm(user);
    }
    setError(validationError);
    if (error === null) {
      registerNewUser(user);
      navigate("/login");
    }
  };

  return (
    <CssVarsProvider>
      <div className="registerDesign">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <main>
          <Sheet
            sx={{
              width: "80vw",
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
                <b>Welcome to Worth IT!</b>
              </Typography>
              <Typography level="body2">Register to continue.</Typography>
            </div>
            <TextField
              // html input attribute
              name="name"
              type="name"
              placeholder="Your user name"
              // pass down to FormLabel as children
              label="Name"
              onChange={(e) => {
                handleData(e);
              }}
            />
            <TextField
              // html input attribute
              name="email"
              type="email"
              placeholder="youremail@email.com"
              // pass down to FormLabel as children
              label="Email"
              onChange={(e) => {
                handleData(e);
              }}
            />
            <TextField
              name="password"
              type="password"
              placeholder="password"
              label="Password"
              onChange={(e) => {
                handleData(e);
              }}
            />
            <Button
              onClick={() => {
                register(user);
              }}
              sx={{ mt: 1 /* margin top */ }}
            >
              Register
            </Button>
            <Typography
              endDecorator={<Link href="/login">Login</Link>}
              fontSize="sm"
              sx={{ alignSelf: "center" }}
            >
              Already have an account?
            </Typography>
            <div>{error === null ? null : error}</div>
          </Sheet>
        </main>
      </div>
    </CssVarsProvider>
  );
};

export default Register;
