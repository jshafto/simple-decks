
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { formatRelative } from 'date-fns';

import { clearDeck } from '../store/decks';


const useStyles = makeStyles((theme) => ({
  deck: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  deckMedia: {
    paddingTop: '56.25%', // 16:9
  },
  deckContent: {
    flexGrow: 1,
  },
}));



const DeckCollection = () => {
  const classes = useStyles();
  const deckCollection = useSelector(state => state.entities.decks.byId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearDeck());
  }, [])



  return (
    <Grid container spacing={4}>
      {Object.values(deckCollection).map((deck) => (
        <Grid item key={deck.id} xs={12} sm={6} md={4}>
          <Card className={classes.deck}>
            <CardContent className={classes.deckContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {deck.name}
              </Typography>
              <Typography gutterBottom>
                {(!deck.maxScore) ? `No previous scores` : `Best Score: ${deck.maxScore}`}
              </Typography>
              <Typography variant="caption">
                {`Created by ${deck.creator} ${formatRelative(new Date(deck.createdAt), new Date())}`}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" component={NavLink} to={`/practice/${deck.id}`}>
                Practice
              </Button>
              <Button size="small" color="primary">
                Quiz
              </Button>
              <Button size="small" color="secondary" component={NavLink} to={`/decks/${deck.id}`}>
                View
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default DeckCollection;
