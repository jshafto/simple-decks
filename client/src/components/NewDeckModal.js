import React, { useState } from 'react';
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
import { createDeckThunk } from '../store/decks'


const NewDeckModal = () => {

  const open = useSelector(state => state.ui.modal === 'newDeckModal');
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [privacy, setPrivacy] = useState();

  const updateName = e => setName(e.target.value)
  const updateCategory = e => setCategory(e.target.value);
  const updatePrivacy = e => setPrivacy(e.target.value);


  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDeckThunk({name, category, privacy}));
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
            <TextField
              autoFocus
              variant="outlined"
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              value={name}
              onChange={updateName}
            />
            <Button type="submit" color="primary">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewDeckModal;
