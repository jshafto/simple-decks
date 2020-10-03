import React, {useState, useLayoutEffect,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { closeModal } from '../store/ui'
import { editCardThunk, unsetActiveCard } from '../store/cards'

const EditCardModal = () => {

  const open = useSelector(state => state.ui.modal==='editCardModal');
  const cardId = useSelector(state => state.entities.cards.activeCard);
  const card = useSelector(state => state.entities.cards.byId[cardId])
  const dispatch = useDispatch();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const updateFront = e => setFront(e.target.value)
  const updateBack = e => setBack(e.target.value);


  const handleClose = () => {
    dispatch(closeModal());
    dispatch(unsetActiveCard())
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editCardThunk(cardId, { front, back }));
    dispatch(closeModal());
  };

  useEffect(() => {
    if (card) {
      setFront(card.front);
      setBack(card.back);
    }
  },[cardId, card])

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
      <IconButton
          style={{
            position: 'absolute',
            right: 2,
            top: 2,
          }}
          onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle>
          <Typography style={{ paddingRight: 20 }} variant="h6">Edit card</Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  inputProps={{style:{fontFamily:'monospace', fontSize: '1.25rem'}}}
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  id="front"
                  label="Front"
                  multiline
                  rows={10}
                  fullWidth
                  value={front}
                  onChange={updateFront}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  inputProps={{style:{fontFamily:'monospace', fontSize: '1.25rem'}}}
                  variant="outlined"
                  margin="dense"
                  id="back"
                  label="Back"
                  multiline
                  rows={10}
                  fullWidth
                  value={back}
                  onChange={updateBack}
                />
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
            <Button type="submit" color="primary">
              Submit
            </Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditCardModal;
