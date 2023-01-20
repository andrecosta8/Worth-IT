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
import { Badge } from "@mui/material";
import { getAllComments } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState(0);
  const navigate = useNavigate();
  const { admin, user } = useContext(AuthContext);
  const { removeAdminFromContext } = useContext(AuthContext);
  const { removeUserFromContext } = useContext(AuthContext);

  useEffect(() => {
    getNotifications();
  });

  const getNotifications = async () => {
    try {
      let comments = await getAllComments();
      let notificationsArr = [];
      comments.data.map((comment) => {
        if (
          (comment.badWordFlaged || comment.reported) &&
          comment.userID === user.id
        ) {
          notificationsArr.push(comment);
        }
      });
      setNotifications(notificationsArr.length);
    } catch (error) {
      setError(error);
    }
  };

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
              <Button
                onClick={() =>
                  setTimeout(() => {
                    navigate("/");
                  }, 250)
                }
              >
                <IconButton>
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

            <Box
              className="box"
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              <Button
                onClick={() =>
                  setTimeout(() => {
                    navigate("/");
                  }, 250)
                }
              >
                <IconButton>
                  <HomeIcon />
                </IconButton>
              </Button>
              {user && !admin && (
                <IconButton>
                  <Button
                    onClick={() =>
                      setTimeout(() => {
                        navigate("/profile");
                      }, 250)
                    }
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Badge badgeContent={notifications} color="error">
                      Profile
                    </Badge>
                  </Button>
                </IconButton>
              )}
              {user && (
                <IconButton>
                  <Button
                    className="NavBar-buttons"
                    onClick={() =>
                      setTimeout(() => {
                        navigate("/products");
                      }, 250)
                    }
                    sx={{ my: 3, color: "white", display: "block" }}
                  >
                    Products
                  </Button>
                </IconButton>
              )}
              {!user && (
                <IconButton>
                  <Button
                    onClick={() =>
                      setTimeout(() => {
                        navigate("/register");
                      }, 250)
                    }
                    sx={{ my: 3, color: "white", display: "block" }}
                  >
                    Register
                  </Button>
                </IconButton>
              )}
              {admin && (
                <IconButton>
                  <Button
                    onClick={() =>
                      setTimeout(() => {
                        navigate("/admin");
                      }, 250)
                    }
                    sx={{ my: 3, color: "white", display: "block" }}
                  >
                    Admin
                  </Button>
                </IconButton>
              )}
              {user ? (
                <IconButton>
                  <Button
                    onClick={() =>
                      setTimeout(() => {
                        logOut();
                      }, 250)
                    }
                    sx={{ my: 3, color: "white", display: "block" }}
                  >
                    Logout
                  </Button>
                </IconButton>
              ) : (
                <IconButton>
                  <Button
                    onClick={() =>
                      setTimeout(() => {
                        navigate("/login");
                      }, 250)
                    }
                    sx={{ my: 3, color: "white", display: "block" }}
                  >
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
