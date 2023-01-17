import React, { useContext, useState } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { loginUser } from '../../services/apiCalls';
import './Login.css'

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  
  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

const Login = () => {
  const [user, setUser] = useState({
    email:"",
    password:"",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { addUserToContext } = useContext(AuthContext);
  const { addAdminToContext } = useContext(AuthContext);
 
  const handleData = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const login = async (user) => {

    let response = await loginUser(user);
    if (response.length === 0 || response === false){
      setError("E-mail or password doesn't match");
    } else {
      addUserToContext(response[0]);
      setError("no error")
      if(response[0].isAdmin === true){
      addAdminToContext(response[0]);
      navigate("/admin")
      }else
      navigate("/profile")
    }
  }


  return (
    <CssVarsProvider>
      <div className="loginDesign">
      <div class="wave"></div><div class="wave"></div><div class="wave"></div>
      <main>
        <Sheet
          sx={{
            width: "80vw",
            mx: 'auto', // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
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
            // html input attribute
            name="email"
            type="email"
            placeholder="johndoe@email.com"
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
            label="Password"onChange={(e) => {
              handleData(e);
            }}
          />
          <Button onClick={() => {
            login(user);
          }} sx={{ mt: 1 /* margin top */ }}>Log in</Button>
          <Typography
            endDecorator={<Link href="/register">Register</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
          <div>{error === null ? null : error}</div>
        </Sheet>
      </main>
      </div>
    </CssVarsProvider>
  );
}

export default Login;