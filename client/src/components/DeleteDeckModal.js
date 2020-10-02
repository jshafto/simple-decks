import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

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
import Autocomplete from '@material-ui/lab/Autocomplete'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { closeModal } from '../store/ui'
import { createDeckThunk, clearDeck, deleteDeckThunk } from '../store/decks'
import { loadCategoriesThunk, clearCategories } from '../store/categories';



const DeleteDeckModal = () => {

  const open = useSelector(state => state.ui.modal === 'deleteDeckModal');
  const dispatch = useDispatch();

  const activeDeck = useSelector(state => state.entities.decks.activeDeck);


  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(deleteDeckThunk(activeDeck.id ));
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
          <Typography variant="h5">Are you sure you want to delete your deck?</Typography>
          <form onSubmit={handleSubmit}>
          <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Delete deck
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeleteDeckModal;
