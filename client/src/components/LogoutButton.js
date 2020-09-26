import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../store/authentication';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const LogoutButton = () => {
  // const loggedOut = useSelector(state => !state.authentication.id);
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleClick = () => dispatch(logout());

  // if (loggedOut) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <div id="logout-button-holder">
      <Button color="primary" onClick={handleClick}>Logout</Button>
    </div>
  );
};


export default LogoutButton;
