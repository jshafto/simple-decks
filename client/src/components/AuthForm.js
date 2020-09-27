import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));


const AuthForm = () => {
  const classes = useStyles();

  const loggedOut = useSelector(state => !state.authentication.id);
  const location = useLocation();
  if (!loggedOut) {
    return (
      <Redirect to="/" />
    )
  }
  let FormComponent;
  if (location.pathname === '/signin') {
    FormComponent = LoginForm;
  } else if (location.pathname === '/signup') {
    FormComponent = SignupForm;
  } else {
    FormComponent = () => (
      <div />
    )
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <FormComponent />
      </div>
    </Container >



  )
}

export default AuthForm;
