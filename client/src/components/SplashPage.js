import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Container from '@material-ui/core/Container'
import { spacing } from '@material-ui/system';




const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '90vh',
    alignItems: 'center',
    display: 'flex',
  },
  titlebox: {
    marginTop: '8rem',
    marginBottom: '8rem',

  },
  titlehalf: {
    alignItems: 'center',
    justifyItems: 'center',

  },
  formhalf: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formcard: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    maxWidth: '500px',
    verticalAlign: 'middle',

  },
  paper: {
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  browse: {
    marginTop: theme.spacing(2)
  }
}));

const SplashPage = () => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={12} md={7} className={classes.titlehalf}>
        <Container maxWidth="xs" className={classes.titlebox}>

          <Typography variant="h2" component="h2">
            simple decks
          </Typography>
          <Typography color="textSecondary">
            Just flashcards. No frills.
            </Typography>
          <Button className={classes.browse}
            variant="contained"
            color="primary"
            href="/browse"
            >
            Browse decks</Button>

        </Container>
      </Grid>
      <Grid item xs={12} sm={12} md={4} className={classes.formhalf} >
        <Card className={classes.formcard}>
          <Box className={classes.paper}>
            <SignupForm />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SplashPage;
