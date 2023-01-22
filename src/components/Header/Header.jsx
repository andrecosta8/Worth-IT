import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import "./Header.css";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import HomeIcon from "@mui/icons-material/Home";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const { admin, user } = useContext(AuthContext);
  const { removeAdminFromContext } = useContext(AuthContext);
  const { removeUserFromContext } = useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logOut = () => {
    removeUserFromContext();
    removeAdminFromContext();
    navigate("/");
  };

  return (
    <div className="headerDesign">
      <AppBar className="navBar" position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                color: "black",
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontSize: "3em",
                fontWeight: 700,
                letterSpacing: ".3rem",
                mr: 2,
                textDecoration: "none",
              }}
            >
              Worth IT?
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Button>
                <IconButton
                  onClick={() =>
                    setTimeout(() => {
                      navigate("/");
                    }, 250)
                  }
                >
                  <HomeIcon />
                </IconButton>
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {user && !admin && (
                  <MenuItem
                    onClick={() =>
                      setTimeout(() => {
                        navigate("/profile");
                        handleCloseNavMenu();
                      }, 250)
                    }
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                )}
                {user && (
                  <MenuItem
                    onClick={() =>
                      setTimeout(() => {
                        navigate("/products");
                        handleCloseNavMenu();
                      }, 250)
                    }
                  >
                    <Typography textAlign="center">Products</Typography>
                  </MenuItem>
                )}
                {!user && (
                  <MenuItem
                    onClick={() =>
                      setTimeout(() => {
                        navigate("/register");
                        handleCloseNavMenu();
                      }, 250)
                    }
                  >
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>
                )}
                {admin && (
                  <MenuItem
                    onClick={() =>
                      setTimeout(() => {
                        navigate("/admin");
                        handleCloseNavMenu();
                      }, 250)
                    }
                  >
                    <Typography textAlign="center">Admin</Typography>
                  </MenuItem>
                )}
                {user ? (
                  <MenuItem
                    onClick={() =>
                      setTimeout(() => {
                        logOut();
                        handleCloseNavMenu();
                      }, 250)
                    }
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() =>
                      setTimeout(() => {
                        navigate("/login");
                        handleCloseNavMenu();
                      }, 250)
                    }
                  >
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                color: "inherit",
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                mr: 2,
                textDecoration: "none",
              }}
            >
              Worth IT?
            </Typography>
            <IconButton onClick={() => navigate(-1)}>
              <KeyboardBackspaceIcon />
            </IconButton>

            <Box
              className="box"
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              <Button>
                <IconButton
                  onClick={() =>
                    setTimeout(() => {
                      navigate("/");
                    }, 250)
                  }
                >
                  <HomeIcon />
                </IconButton>
              </Button>
              {user && (
                <IconButton
                  onClick={() =>
                    setTimeout(() => {
                      navigate("/products");
                    }, 250)
                  }
                >
                  <Button
                    className="NavBar-buttons"
                    sx={{ my: 3, color: "white", display: "block" }}
                  >
                    Products
                  </Button>
                </IconButton>
              )}
              {!user && (
                <IconButton
                  onClick={() =>
                    setTimeout(() => {
                      navigate("/register");
                    }, 250)
                  }
                >
                  <Button sx={{ my: 3, color: "white", display: "block" }}>
                    Register
                  </Button>
                </IconButton>
              )}
              {user && !admin && (
                <IconButton
                  onClick={() =>
                    setTimeout(() => {
                      navigate("/profile");
                    }, 250)
                  }
                >
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    Profile
                  </Button>
                </IconButton>
              )}
              {admin && (
                <IconButton
                  onClick={() =>
                    setTimeout(() => {
                      navigate("/admin");
                    }, 250)
                  }
                >
                  <Button sx={{ my: 3, color: "white", display: "block" }}>
                    Admin
                  </Button>
                </IconButton>
              )}
              {user ? (
                <IconButton
                  onClick={() =>
                    setTimeout(() => {
                      logOut();
                    }, 250)
                  }
                >
                  <Button sx={{ my: 3, color: "white", display: "block" }}>
                    Logout
                  </Button>
                </IconButton>
              ) : (
                <IconButton
                  onClick={() =>
                    setTimeout(() => {
                      navigate("/login");
                    }, 250)
                  }
                >
                  <Button sx={{ my: 3, color: "white", display: "block" }}>
                    {" "}
                    Login
                  </Button>
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
