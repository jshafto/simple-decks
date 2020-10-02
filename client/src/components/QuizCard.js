// carousel inspired by this demo
// https://levelup.gitconnected.com/adding-transitions-to-a-react-carousel-with-material-ui-b95825653c1b
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Markdown from 'markdown-to-jsx';
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent';
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import CircularProgress from '@material-ui/core/CircularProgress';
import { loadCardsThunk, clearCards } from '../store/cards';
import { loadDeckThunk, clearDeck, postScoreThunk } from '../store/decks'
import AccordionActions from '@material-ui/core/AccordionActions';


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

// const cards = [
//   { front: 'hello1', back: 'goodbye1', id: '1' },
//   { front: 'hello2', back: 'goodbye2', id: '2' },
//   { front: 'hello3', back: 'goodbye3', id: '3' }
// ]

const QuizCard = () => {


  const cards = useSelector(state => state.entities.cards.byId);
  const deck = useSelector(state => state.entities.decks.activeDeck);
  const { deckId } = useParams();


  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(loadDeckThunk(deckId));
    return () => dispatch(clearDeck())
  }, [])
  useEffect(() => {
    dispatch(loadCardsThunk(deckId))
    return () => dispatch(clearCards());
  }, [deckId])




  const [cardOpen, setCardOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);



  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState('left');

  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const [deckFinished, setDeckFinished] = useState(false);

  const handleGotIt = () => {
    const newScore = score + 1;
    setScore(newScore);
    setAnswered(true);
  }
  const handleNoGotIt = () => {
    const newScore = score;
    setScore(newScore);
    setAnswered(true);
  }

  const handleSubmitScore = () => {
    // dispatch
    dispatch(postScoreThunk(score, Object.values(cards).length, deckId))
    // reset
    setDeckFinished(false);
    setScore(0);


  }

  const handleChange = () => {
    setCardOpen((prev) => !prev);
  };
  const carouselChange = (direction) => {
    setCardOpen(false);
    const increment = direction === 'left' ? -1 : 1;
    if ((cardIndex + 1+increment) === Object.values(cards).length && !deckFinished) {
      setDeckFinished(true);
    }


    const newCardIndex = (cardIndex + increment + Object.values(cards).length) % Object.values(cards).length;

    const oppDirection = direction === 'left' ? 'right' : 'left';
    setSlideDirection(direction);
    setSlideIn(false);

    setAnswered(false);

    setTimeout(() => {
      setCardIndex(newCardIndex);
      setSlideDirection(oppDirection);
      setSlideIn(true);
    }, 250);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 39) {
        if (answered) {
          carouselChange('right');
        }
      }

      if (e.keyCode === 13) {
        handleChange();
      }
      if (e.keyCode === 40 ||e.keyCode === 38) {
        handleChange();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });


  return (
    // <Paper variant="outline">
    <Grid container direction="column">
      <Typography variant="h3" component="h2">{deck.name}</Typography>
      <Typography>{(deck.maxScore) ? `Best Score: ${deck.maxScore}` : "No previous scores"}</Typography>
      <Typography variant="h5" component="h5" color="textSecondary">{`${cardIndex + 1}/${Object.values(cards).length}`}</Typography>
      <Grid item>
        <Box minHeight={500} alignItems="center" >
          <div style={{ maxWidth: "600px", paddingTop: "50px", margin: "0 auto", color: "#494949", overflow: "hidden" }}>
        <Typography align="center" variant="h4" component="h5">{`Score: ${score}/${Object.values(cards).length}`}</Typography>
            <Grid container justify="center">

              <Button disabled={answered} style={{ margin: 4 }} color="primary" variant="contained" onClick={handleGotIt}>Got it</Button>
              <Button disabled={answered}style={{ margin: 4 }} color="secondary" variant="contained" onClick={handleNoGotIt} >Didn't get it</Button>

            </Grid>
            <Grid container justify="flex-end">
              {(deckFinished) ? (
                <Button color="primary" disabled={!answered} onClick={handleSubmitScore}>Save Score</Button>
              ) :
              (
                <Button disabled={!answered} onClick={() => carouselChange('right')}>Next</Button>
              )
            }
            </Grid>
            {
              (Object.values(cards).length) ? (
                <Slide maxWidth="sm" in={slideIn} direction={slideDirection} timeout={200}>
                  <div>
                    <Box style={{ maxWidth: 600 }} key={Object.values(cards)[cardIndex].id}>
                      <Accordion expanded={cardOpen} onChange={handleChange}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" >

                          <Typography>
                            <Markdown>
                              {Object.values(cards)[cardIndex].front}
                            </Markdown>
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ verticalAlign: 'top' }}>
                          <Typography>
                            <Markdown>
                              {Object.values(cards)[cardIndex].back}
                            </Markdown>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  </div>
                </Slide>

              ) : (<CircularProgress />)
            }
          </div>
        </Box>
      </Grid>
    </Grid>
    // </Paper>
  )
}

export default QuizCard;
