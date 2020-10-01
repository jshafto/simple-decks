import React from 'react';
import {NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SignupForm from './SignupForm';
import Container from '@material-ui/core/Container'




const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80vh',
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
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  formcard: {
    alignItems: 'center',
    margin: 'auto',
    marginTop: '30px',
    maxWidth: '500px',
  },
  paper: {
    margin: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  browse: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3)
  }
}));

const SplashPage = () => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} sm={12} md={7} className={classes.titlehalf}>
        <Container maxWidth="xs" className={classes.titlebox}>

          <Typography variant="h2" component="h2">
            simple decks.
          </Typography>
          <Typography color="textSecondary">
            Just flashcards. No frills.
            </Typography>
          <Button className={classes.browse}
            component={NavLink}
            variant="contained"
            color="primary"
            to="/browse"
            size="large"
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
