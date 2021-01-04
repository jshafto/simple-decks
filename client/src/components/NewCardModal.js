import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid'

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
    setFront('');
    setBack('');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCardThunk(deckId, { front, back }));
    dispatch(closeModal());
  };

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
        <DialogTitle style={{ paddingRight: 20 }}>
          Add a new card
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

export default NewCardModal;
