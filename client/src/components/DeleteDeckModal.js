import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid'

import { closeModal } from '../store/ui'
import { deleteDeckThunk } from '../store/decks'




const DeleteDeckModal = () => {
  const open = useSelector(state => state.ui.modal === 'deleteDeckModal');
  const dispatch = useDispatch();
  const activeDeck = useSelector(state => state.entities.decks.activeDeck);
  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(deleteDeckThunk(activeDeck.id));
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
          Are you sure you want to delete this deck?
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container justify="flex-end">
              <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
              <Button type="submit" color="secondary">
                Delete deck
            </Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeleteDeckModal;
