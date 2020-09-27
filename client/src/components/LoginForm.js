// material ui template
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authentication';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon'

import SvgLogo from './SvgLogo'



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
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = () => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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
          Sign In
          </Button>
        <Grid container>
          {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
          <Grid item>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}


export default LoginForm;
