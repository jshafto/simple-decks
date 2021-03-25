import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon'

import SvgLogo from './SvgLogo'
import { login } from '../store/authentication';



const useStyles = makeStyles((theme) => ({
  logoicon: {
    margin: theme.spacing(1),
    fill: theme.palette.text.primary,
    stroke: theme.palette.text.primary
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 0),
  },
  demo: {
    margin: theme.spacing(2, 0, 2),
  },
}));

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(login("demoaccount@example.com", "somethingmoresecurethanpassword"));
  };

  const updateEmail = e => setEmail(e.target.value);
  const updatePassword = e => setPassword(e.target.value);



  return (
    <>
      <SvgIcon className={classes.logoicon}>
        <SvgLogo />
      </SvgIcon>
      <Typography component="h1" variant="h5">
        Sign in
        </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={updateEmail}
        // error
        // helperText set up helper text prop for errors
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={updatePassword}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.demo}
          onClick={demoLogin}
        >
          Demo Login
        </Button>
        <Grid container>
          <Grid item>
            <Link component={NavLink} to="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}


export default LoginForm;
