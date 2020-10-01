import React, {useState} from 'react';
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
import { createCardThunk } from '../store/cards'

const NewCardModal = () => {

  const open = useSelector(state => state.ui.modal==='addCardModal');
  const { deckId } = useParams();
  const dispatch = useDispatch();
  const [front, setFront] = useState();
  const [back, setBack] = useState();

  const updateFront = e => setFront(e.target.value)
  const updateBack = e => setBack(e.target.value);


  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCardThunk(deckId, { front, back }));
    dispatch(closeModal());
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
        <DialogActions>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
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
            <Button type="submit" color="primary">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewCardModal;
