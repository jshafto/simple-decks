import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import SvgLogo from './SvgLogo';
import SvgIcon from '@material-ui/core/SvgIcon'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { logout } from '../store/authentication';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logoicon: {
    fill: theme.palette.background.default,
    stroke: theme.palette.background.default,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  logoutButton: {
    color: 'inherit',
  }
}));

const NavBar = () => {
  const classes = useStyles();

  const loggedOut = useSelector(state => !state.authentication.id);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const updateSearchTerm = (e) => setSearchTerm(e.target.value);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const dispatch = useDispatch();


  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton component={NavLink} to="/">
            <SvgIcon className={classes.logoicon}>
              <SvgLogo />
            </SvgIcon>
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <form onSubmit={handleSubmit}>
              <InputBase
                type='search'
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={updateSearchTerm}
              />
              <button type="submit" style={{ display: 'none' }} />
            </form>
          </div>
          <Typography className={classes.title} />
          {/* <LogoutButton className={classes.logoutButton} /> */}
          <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {(loggedOut) ? (
              <>
                <MenuItem onClick={handleClose} component={NavLink} to={'/'}>Home</MenuItem>
                <MenuItem onClick={handleClose} component={NavLink} to={'/browse'}>Browse</MenuItem>
                <MenuItem onClick={handleClose} component={NavLink} to={'/signin'}>Sign in</MenuItem>
                <MenuItem onClick={handleClose} component={NavLink} to={'/signup'}>Sign up</MenuItem>
              </>
            ) : (
                <>
                  <MenuItem onClick={handleClose} component={NavLink} to={'/'}>Home</MenuItem>
                  <MenuItem onClick={handleClose} component={NavLink} to={'/browse'}>Browse</MenuItem>
                  <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                </>
              )}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
