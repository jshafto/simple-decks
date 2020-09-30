import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'

import { loadCardsThunk } from '../store/cards'

// import ReactMarkdown from 'react-markdown';
import Markdown from 'markdown-to-jsx';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

// const flashcards = [
//   {id: 1, front: 'this is the front of a card', back: 'this is the back of a card'},
//   {id: 2, front: 'this is the front of a card', back: 'this is the back of a card'},
//   {id: 3, front: 'this is the front of a card', back: 'this is the back of a card'},
//   {id: 4, front: 'this is the front of a card', back: 'this is the back of a card but long. this is the back of a card but long. this is the back of a card but long. this is the back of a card but long. '},
// ]

const FlashCardView = () => {
  const classes = useStyles();
  const { deckId } = useParams();

  const flashcards = useSelector(state => state.cards.byId);

  const dispatch = useDispatch();
  // console.log(deckId)

  useEffect(() => {
    dispatch(loadCardsThunk(deckId))
  }, [deckId])


  return (
    // <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="flashcard-table">
      <TableHead>
        <TableRow>
          <TableCell align="left" width="40%">Front</TableCell>
          <TableCell align="left" width="40%">Back</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.values(flashcards).map((flashcard) => (
          <TableRow key={flashcard.id}>
            <TableCell align="left">
              <Markdown>{flashcard.front}</Markdown>
            </TableCell>
            <TableCell align="left">
              <Markdown>{flashcard.back}</Markdown>
            </TableCell>
            <TableCell align="left" size="small">
              <Button color="secondary">
                Edit Card
                </Button>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell align="center" colSpan={3}>
            <Button color="primary" size='large' variant='contained'>
              Add card
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default FlashCardView;
