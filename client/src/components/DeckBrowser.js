import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import DeckCollection from './DeckCollection'
import { loadPublicDecksThunk, clearDeck } from '../store/decks';
import NewDeckModal from './NewDeckModal';
import CategoryButtons from './CategoryButtons';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    // background: theme.palette.background.default,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const DeckBrowser = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearDeck());
    dispatch(loadPublicDecksThunk());
  }, [dispatch]);



  return (
    <main>
      <NewDeckModal />
      <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Typography component="h1" variant="h2" align="left" color="textPrimary" gutterBottom>
            Flashcard decks
          </Typography>
          <div className={classes.heroButtons}>
            <Typography variant="h6" align="left" color="textSecondary">
              Browse by category
            </Typography>
            <CategoryButtons />
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
