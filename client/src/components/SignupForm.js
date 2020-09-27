import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SimpleLogo from './TestLogo'

import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../store/authentication';


const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(username, email, password));
  };


  const updateUsername = e => setUsername(e.target.value);
  const updateEmail = e => setEmail(e.target.value);
  const updatePassword = e => setPassword(e.target.value);



  return (
    // <Container component="main" maxWidth="xs">
    <>
      <Avatar className={classes.avatar}>
        <SimpleLogo />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
        </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={updateUsername}
        />
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
        {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
          </Button>
        <Grid container>
          {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
          <Grid item>
            <Link href="/signin" variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}


export default SignupForm;
