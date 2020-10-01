import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

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
import Carousel from 'react-material-ui-carousel'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import CircularProgress from '@material-ui/core/CircularProgress';
import { loadCardsThunk, clearCards } from '../store/cards';
import { loadDeckThunk, clearDeck } from '../store/decks'

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

const PracticeCard = () => {


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
        if (e.keyCode ===13) {
          handleChange();
        }
        if (e.keyCode === 32 ) {
          // e.preventDefault();
          console.log(e)
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
      {/* <Typography variant="h4" component="h4">Front</Typography> */}
      <Typography variant="h5" component="h5" color="textSecondary">{`${cardIndex + 1}/${Object.values(cards).length}`}</Typography>
      <Grid item>
        <Box component={Paper} variant="outlined" height={1000} alignContent="center" >
          <div style={{ width: "500px", marginTop: "50px", color: "#494949", overflow: "hidden" }}>
            <Button onClick={() => carouselChange('right')}>Next</Button>
            {
              (Object.values(cards).length) ? (
            <Slide maxWidth="sm" in={slideIn} direction={slideDirection} timeout={200}>
              <div>
                <Box style={{ maxWidth: 500 }} key={Object.values(cards)[cardIndex].id}>
                  <Accordion expanded={cardOpen} onChange={handleChange} >
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                      <Typography>{Object.values(cards)[cardIndex].front}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{Object.values(cards)[cardIndex].back}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </div>
            </Slide>

              ) : (<CircularProgress/>)
            }
          </div>
        </Box>
      </Grid>
    </Grid>
    // </Paper>
  )
}

export default PracticeCard;
