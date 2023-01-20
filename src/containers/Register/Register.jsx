import "./Register.css";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import React, { useState } from "react";
import Sheet from "@mui/joy/Sheet";
import TextField from "@mui/joy/TextField";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import { checkEmail, registerNewUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../../services/validate";

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
    try {
      let validationError;
      if ((await checkEmail(user.email)) === false) {
        validationError = "E-mail is already in use";
      } else {
        validationError = validateForm(user);
      }
      setError(validationError);
      if (!error) {
        await registerNewUser(user);
        setTimeout(() => {
          navigate("/login");
        }, 250);
      }
    } catch (error) {
      setError(error);
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
              borderRadius: "sm",
              boxShadow: "md",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mx: "auto", // margin left & right
              my: 4, // margin top & botom
              px: 2, // padding left & right
              py: 3, // padding top & bottom
              width: "80vw",
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
            <div>{error && error}</div>
          </Sheet>
        </main>
      </div>
    </CssVarsProvider>
  );
};

export default Register;
