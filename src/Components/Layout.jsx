import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "@mui/material/Link";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Grid, List, ListItem } from "@mui/material";
import CustomSnackBar from "./CustomSnackBar";
import axios from "axios";
import { useSelector } from "react-redux";

const pages = [
  { name: "Home", url: "/home" },
  { name: "Job Listing", url: "/jobListing" },
  { name: "About", url: "/about" },
  { name: "Contact", url: "/contact" },
  { name: "Gallery", url: "/gallery" },
];

const adminPages = [
  { name: "Employees", url: "/employees" },
  { name: "Add Jobs", url: "/addJobs" },
];

const footerData = {
  name: "JSearch",
  sections: [
    {
      title: "Job Seekers",
      links: [
        { name: "Find All Jobs", url: "/jobListing" },
        { name: "Career Advice", url: "" },
      ],
    },
    {
      title: "Job Search",
      links: [{ name: "About Us", url: "/about" }],
    },
    {
      title: "Help Center",
      links: [{ name: "Customer Support", url: "" }],
    },
    {
      title: "Contacts",
      links: [{ name: "Contact US", url: "/contact" }, { name: "Sales" }],
    },
  ],
};

const Layout = ({ children }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state?.user?.userData?.isAdmin);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigation = (url) => {
    navigate(url);
  };

  const handleLogOut = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_USER_API_HOSTNAME}user/clearCookies`,
        { withCredentials: true }
      );
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userDetails");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Internal Server Error. Please try again later.";
      setApiError(errorMessage);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to={"/home"}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              JSearch
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
                {!isAdmin &&
                  pages?.map((page, index) => (
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                      <Typography textAlign="left">
                        <Link
                          component="button"
                          onClick={() => {
                            handleNavigation(page?.url);
                          }}
                        >
                          {page?.name}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}

                {isAdmin &&
                  adminPages?.map((page, index) => (
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                      <Typography textAlign="left">
                        <Link
                          component="button"
                          onClick={() => {
                            handleNavigation(page?.url);
                          }}
                        >
                          {page?.name}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              JSearch
            </Typography>
            <Box
              sx={{
                gap: 12,
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: { md: "center" },
              }}
            >
              {!isAdmin &&
                pages.map((page, index) => (
                  <Link
                    key={index}
                    component="button"
                    color="#fff"
                    underline="none"
                    onClick={() => handleNavigation(page.url)}
                  >
                    {page?.name}
                  </Link>
                ))}

              {isAdmin &&
                adminPages?.map((page, index) => (
                  <Link
                    key={index}
                    component="button"
                    color="#fff"
                    underline="none"
                    onClick={() => handleNavigation(page.url)}
                  >
                    {page?.name}
                  </Link>
                ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link component="button" onClick={handleLogOut}>
                      Logout
                    </Link>
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
      {!isAdmin && (
        <Box
          component={"footer"}
          sx={{ padding: 3, backgroundColor: "#3d3d3d" }}
        >
          <Container maxWidth="xl" sx={{ padding: "0!important" }}>
            <Typography variant="h4" color="white" mb={3}>
              J S e a r c h
            </Typography>
            <Grid container spacing={3}>
              {footerData?.sections?.map((section, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Typography variant="h6" mb={1} color={"white"}>
                    {section.title}
                  </Typography>
                  <List>
                    {section.links.map((link, idx) => (
                      <ListItem key={idx} sx={{ padding: 0, marginBottom: 2 }}>
                        <RouterLink to={link?.url} style={{ color: "white" }}>
                          {link.name}
                        </RouterLink>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}
      {apiError && (
        <CustomSnackBar
          isOpen={true}
          message={apiError}
          onClose={() => {
            setApiError(null);
          }}
          customKey={"logout"}
        />
      )}
    </>
  );
};

export default Layout;
