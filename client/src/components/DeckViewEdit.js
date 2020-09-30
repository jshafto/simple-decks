import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';


import FlashCardView from './FlashCardView';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));


const DeckViewEdit = () => {


  const classes = useStyles();




  return (
    <main>
      <div className={classes.heroContent}>
        <Container>
          <Typography component="h1" variant="h3" align="left" color="textPrimary" gutterBottom>
            Deck name.
          </Typography>
          <Typography variant="h5" align="left" color="textSecondary" paragraph>
            Deck category
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} >
              <Grid item>
                <Button variant="contained" color="primary">
                  Create a new deck
                  </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Browse public decks
                  </Button>
              </Grid>
            </Grid>
          </div>
          <TableContainer component={Paper}>
            <FlashCardView />
          </TableContainer>
        </Container>
      </div>
    </main>
  )
}

export default DeckViewEdit;
