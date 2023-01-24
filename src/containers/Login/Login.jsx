import "./Login.css";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import React, { useContext, useEffect, useState } from "react";
import Sheet from "@mui/joy/Sheet";
import TextField from "@mui/joy/TextField";
import Typography from "@mui/joy/Typography";
import { AuthContext } from "../../providers/AuthProvider";
import { CssVarsProvider } from "@mui/joy/styles";
import { loginUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { addAdminToContext } = useContext(AuthContext);
  const { addUserToContext } = useContext(AuthContext);

  const handleData = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const login = async (user) => {
    try {
      let response = await loginUser(user);

      if (response.length === 0 || response === false) {
        setError("E-mail or password doesn't match");
      } else {
        addUserToContext(response[0]);
        setError(null);

        if (response[0].isAdmin) {
          addAdminToContext(response[0]);
          setTimeout(() => {
            navigate("/admin");
          }, 250);
        } else
          setTimeout(() => {
            navigate("/profile");
          }, 250);
      }
    } catch (err) {
      setError(err);
      console.log(error)
    }
  };


  return (
    <CssVarsProvider>
      <div data-testeid="loginForm" className="loginDesign">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
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
              <Typography level="body2">Sign in to continue.</Typography>
            </div>
            <TextField
              data-testid="email-input"
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              label="Email"
              value={user.email}
              onChange={(e) => {
                handleData(e);
              }}
            />
            <TextField
              data-testid="password-input"
              name="password"
              type="password"
              placeholder="password"
              label="Password"
              value={(e)=> e.email}
              onChange={(e) => {
                handleData(e);
              }}
            />
            <Button
              data-testid="confirm-login"
              onClick={() => {
                login(user);
              }}
              sx={{ mt: 1 /* margin top */ }}
            >
              Log in
            </Button>
            <Typography
              endDecorator={<Link href="/register">Register</Link>}
              fontSize="sm"
              sx={{ alignSelf: "center" }}
            >
              Don&apos;t have an account?
            </Typography>
            <div>{error && error}</div>
          </Sheet>
        </main>
      </div>
    </CssVarsProvider>
  );
};

export default Login;
