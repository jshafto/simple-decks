import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';

import { logout } from '../store/authentication';


const LogoutButton = () => {
  const loggedOut = useSelector(state => !state.authentication.id);
  const dispatch = useDispatch();
  // const classes = useStyles();
  const handleClick = () => dispatch(logout());

  if (loggedOut) {
    return <div/>;
  }

  return (
    <Button onClick={handleClick} color="inherit">Logout</Button>
  );
};


export default LogoutButton;
