import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom';


import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import DeckCollection from './DeckCollection'
import { loadSearchDecksThunk, clearDeck } from '../store/decks';
import NewDeckModal from './NewDeckModal';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
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

const DeckBrowser = () => {
  const getQueryString = (string) => decodeURIComponent(string.match(/[&?]q=([^&]*)/)[1])


  const location = useLocation();
  // debugger;
  const classes = useStyles();

  const numDecks = useSelector(state => Object.values(state.entities.decks.byId).length)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearDeck());
    dispatch(loadSearchDecksThunk(getQueryString(location.search)));
  }, [location, dispatch]);

  // const openNewDeckModal = () => {
  //   dispatch(openModal('newDeckModal'));
  // }



  return (
    <main>
      <NewDeckModal />
      <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Typography component="h1" variant="h2" align="left" color="textPrimary" gutterBottom>
            Search results
            </Typography>
          {/* <Typography variant="h5" align="left" color="textSecondary" paragraph>
            Browse the collection of publicly available flashcard decks.
            </Typography> */}
          <div className={classes.heroButtons}>
          <Typography variant="h6" align="left" color="textSecondary">
            {`${numDecks} results for "${getQueryString(location.search)}"`}
            </Typography>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <DeckCollection />
      </Container>
    </main>

  );
}

export default DeckBrowser;
