import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';

import Markdown from 'markdown-to-jsx';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import { loadCardsThunk, clearCards } from '../store/cards';
import { loadDeckThunk } from '../store/decks'
import Link from '@material-ui/core/Link'

import { withStyles } from '@material-ui/core'

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },

  expanded: {},
})(MuiAccordion);


const AccordionSummary = withStyles({
  root: {
    alignItems: 'flex-start',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 150,
    '&$expanded': {
      minHeight: 150,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    minHeight: 150,
  },
}))(MuiAccordionDetails);


const PracticeCard = () => {

  const cards = useSelector(state => state.entities.cards.byId);
  const deck = useSelector(state => state.entities.decks.activeDeck);
  const loggedOut = useSelector(state => !state.authentication.id);
  const { deckId } = useParams();


  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadDeckThunk(deckId));
    // return () => dispatch(clearDeck())
  }, [deckId, dispatch])

  useEffect(() => {
    dispatch(loadCardsThunk(deckId))
    return () => dispatch(clearCards());
  }, [deckId, dispatch])


  const [cardOpen, setCardOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState('left');




  const handleChange = () => {
    setCardOpen((prev) => !prev);
  };
  const carouselChange = (direction) => {
    setCardOpen(false);
    const increment = direction === 'left' ? -1 : 1;
    const newCardIndex = (cardIndex + increment + Object.values(cards).length) % Object.values(cards).length;

    const oppDirection = direction === 'left' ? 'right' : 'left';
    setSlideDirection(direction);
    setSlideIn(false);

    setTimeout(() => {
      setCardIndex(newCardIndex);
      setSlideDirection(oppDirection);
      setSlideIn(true);
    }, 250);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 39) {
        carouselChange('right');
      }
      if (e.keyCode === 37) {
        carouselChange('left');
      }
      if (e.keyCode === 13) {
        handleChange();
      }
      if (e.keyCode === 40 || e.keyCode === 38) {
        handleChange();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });


  return (
    <Grid container direction="column">
      <Typography variant="h3" component="h2">{deck.name}</Typography>
      <Typography color="textSecondary" variant="h4" component="h3">{deck.category}</Typography>
      {
        (loggedOut) ? (
          <Grid container>
            <Button component={NavLink} to={`/decks/${deckId}`}>View deck</Button>
          </Grid>
        ) : (
            <Grid container>
              <Button component={NavLink} to={`/decks/${deckId}`}>View deck</Button>
              <Button component={NavLink} to={`/quiz/${deckId}`}>Quiz</Button>
            </Grid>
          )}
      {
        (Object.values(cards).length) ? (
          <Grid item>
            <Box minHeight={500} alignItems="center" >
              <div style={{ maxWidth: "600px", paddingTop: "50px", margin: "0 auto", color: "#494949", overflow: "hidden" }}>
                <Grid container justify="space-between" alignItems="center">
                  <Button onClick={() => carouselChange('left')}>Prev</Button>
                  <Typography color="textSecondary">{`${cardIndex + 1}/${Object.values(cards).length}`}</Typography>
                  <Button onClick={() => carouselChange('right')}>Next</Button>
                </Grid>
                <Slide in={slideIn} direction={slideDirection} timeout={200}>
                  <div>
                    <Box style={{ maxWidth: 600 }} key={Object.values(cards)[cardIndex].id}>
                      <Accordion expanded={cardOpen} onChange={handleChange}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" >
                          <Markdown>
                            {Object.values(cards)[cardIndex].front}
                          </Markdown>
                        </AccordionSummary>
                        <AccordionDetails style={{ verticalAlign: 'top' }}>
                          <Markdown>
                            {Object.values(cards)[cardIndex].back}
                          </Markdown>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  </div>
                </Slide>

              </div>
            </Box>
          </Grid>
        ) : (<Typography color="textSecondary">
          {`There are no cards in this deck to practice. Why not `}
          <Link component={NavLink} style={{ color: "secondary", textDecoration: "none" }} to={`/decks/${deckId}`}>{`add some cards`}
          </Link>?
        </Typography>)
      }
    </Grid>
  )
}

export default PracticeCard;
