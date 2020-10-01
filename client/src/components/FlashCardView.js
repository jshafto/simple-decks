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
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

import { loadCardsThunk, clearCards } from '../store/cards';
import { openModal } from '../store/ui';
import NewCardModal from './NewCardModal';

// import ReactMarkdown from 'react-markdown';
import Markdown from 'markdown-to-jsx';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));


const FlashCardView = () => {
  const classes = useStyles();
  const { deckId } = useParams();

  const flashcards = useSelector(state => state.entities.cards.byId);


  const dispatch = useDispatch();
  // console.log(deckId)

  useEffect(() => {
    dispatch(loadCardsThunk(deckId))
    return () => dispatch(clearCards());
  }, [deckId])

  const handleClickOpen = () => {
    dispatch(openModal('addCardModal'));
  }


  return (
    // <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="flashcard-table">
      <TableHead>
        <TableRow>
          <TableCell align="left" width="40%">Front</TableCell>
          <TableCell align="left" width="40%">Back</TableCell>
          <TableCell>
            <NewCardModal />
          </TableCell>
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
            <TableCell align="right" size="small" style={{ verticalAlign: 'top' }}>
              <IconButton>
                <EditIcon />
              </IconButton>
            <IconButton>
                <CloseIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell align="center" colSpan={3}>
            <Button color="primary" size='large' variant='contained' onClick={handleClickOpen}>
              Add card
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default FlashCardView;
