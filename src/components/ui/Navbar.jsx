import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { startLogout } from "../../store/slices/auth/authThunk";
import { Badge } from "@mui/material";
import { Notifications, MoreVert } from "@mui/icons-material/";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// const pages = ["Home", "Pricing", "Blog"];
// const settings = ["Perfil", "Cuenta", "Dashboard", "Salir"];

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

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

  const handleLogout = () => {
    dispatch(startLogout());
  };

  // Menu de carrito y notificaciones
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p> Carrito </p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={7} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <p>Notificaciones</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
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
              Supless Store
            </Typography>

            {/* Para movil */}
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
                {/* {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))} */}
                <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"> Home</Typography>
                </MenuItem>
                <MenuItem component={Link} to="#" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"> Videos</Typography>
                </MenuItem>
              </Menu>
            </Box>

            {/* Para movil */}
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                // fontSize: "20px",
                fontWeight: 500,
                letterSpacing: ".0rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Supless Store
            </Typography>

            {/* Para compu */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))} */}
              <Button
                component={Link}
                to="/"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="#"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Video
              </Button>
            </Box>

            {/* Notificaciones y carrito */}
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new products"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 7 new notifications"
                color="inherit"
              >
                <Badge badgeContent={7} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreVert />
              </IconButton>
            </Box>

            {/* Para usuario */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir configuración">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                  <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
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
                {/* {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))} */}
                <MenuItem onClick={handleCloseUserMenu}>
                  <IconButton>
                    <AccountCircleIcon color="primary" />
                  </IconButton>
                  <Typography textAlign="center">Perfil</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <IconButton>
                    <LogoutIcon color="error" />
                  </IconButton>
                  <Typography textAlign="center" onClick={handleLogout}>
                    Salir
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};
