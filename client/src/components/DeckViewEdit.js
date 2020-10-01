import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';


import { formatRelative } from 'date-fns';

import FlashCardView from './FlashCardView';
import { loadDeckThunk, clearDeck } from '../store/decks';
import {openModal} from '../store/ui'

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

  const dispatch = useDispatch();

  const { deckId } = useParams();

  const deck = useSelector(state => state.entities.decks.activeDeck);

  useEffect(() => {
    dispatch(loadDeckThunk(deckId));
    return () => dispatch(clearDeck())
  }, [])

  const handleClickOpen = () => {
    dispatch(openModal('addCardModal'));
  }



  return (
    <main>
      <div className={classes.heroContent}>
        <Container>
          <Typography component="h1" variant="h3" align="left" color="textPrimary" gutterBottom>
            {deck.name}
          </Typography>
          <Typography variant="h5" align="left" color="textSecondary" paragraph>
            {deck.category}
          </Typography>
          <Typography variant="h6" align="left" color="textSecondary" paragraph>
          {(deck.createdAt) ? `Created by ${deck.creator} ${formatRelative(new Date(deck.createdAt), new Date())}` : `Created by`}
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} >
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                  Add Card
                  </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="secondary">
                  Delete deck
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
