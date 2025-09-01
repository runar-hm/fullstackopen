import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Avatar,
  Tooltip,
  Typography,
  MenuItem,
  Menu,
  Box,
} from '@mui/material';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const settings = ['log out'];
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = (e) => {
    dispatch(logoutUser());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Button color="inherit" component={Link} to="/">
            home
          </Button>

          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key="logout" onClick={handleLogout}>
              <Typography sx={{ textAlign: 'center' }}>
                Log out user {user.username}
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
