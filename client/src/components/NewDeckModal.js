import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { closeModal } from '../store/ui'
import { createDeckThunk, clearDeck } from '../store/decks'
import { loadCategoriesThunk, clearCategories } from '../store/categories';




const NewDeckModal = () => {
  const [isNotFirstMount, setIsNotFirstMount] = useState(false);

  const open = useSelector(state => state.ui.modal === 'newDeckModal');
  const dispatch = useDispatch();

  const history = useHistory();
  const activeDeck = useSelector(state => state.entities.decks.activeDeck);


  const categories = useSelector(state => state.entities.categories.byId)


  const [name, setName] = useState('');
  const [category, setCategory] = useState(null);
  const [privacy, setPrivacy] = useState(false);

  const updateName = e => setName(e.target.value)
  const updateCategory = (e, newValue) => setCategory(newValue);
  const updatePrivacy = e => setPrivacy(e.target.checked);

  useEffect(() => {
    if (isNotFirstMount && activeDeck.id) {
      history.push(`/decks/${activeDeck.id}`)
    }
    setIsNotFirstMount(true);
  }, [activeDeck, history])


  useEffect(() => {
    dispatch(loadCategoriesThunk());
    return () => dispatch(clearCategories());
  }, [dispatch])


  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearDeck());
    dispatch(createDeckThunk({ name, category, privacy }));
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
          Create a new deck
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              autoComplete="off"
              autoFocus
              variant="outlined"
              id="name"
              label="Name"
              fullWidth
              value={name}
              onChange={updateName}
            />
            <Autocomplete
              required
              options={Object.values(categories)}
              getOptionLabel={(option) => option.label}
              value={category}
              clearOnEscape
              renderInput={(params) => <TextField {...params} label="Category" variant="outlined" margin="normal" required />}
              onChange={updateCategory}
            />
            <Grid container justify="space-between">
            <FormControlLabel
              control={<Switch checked={privacy} onChange={updatePrivacy} name="privacy" />}
              label="Private (only you will be able to see this deck)"
            />
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

export default NewDeckModal;
