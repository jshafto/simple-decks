import { apiUrl } from '../config';

// action types
// get a collection of public decks
export const LOAD_PUBLIC_DECKS = '/simple-decks/decks/LOAD_PUBLIC_DECKS';
// load deck details
export const LOAD_DECK = '/simple-decks/decks/LOAD_DECK';


// action creators
// get a collection of public decks
export const loadPublicDecks = (decks) => ({
  type: LOAD_PUBLIC_DECKS,
  decks
})
// load_deck_details
export const loadDeck = (deck) => ({
  type: LOAD_DECK,
  activeDeck: deck
})

// thunks
// thunk for getting public decks
export const loadPublicDecksThunk = () => async dispatch => {
  const res = await fetch(`${apiUrl}/decks`);
  if (res.ok) {
    const decks = await res.json();
    dispatch(loadPublicDecks(decks));
  }
}

// thunk for loading an existing deck
export const loadDeckThunk = (deckId) => async dispatch => {
  const res = await fetch(`${apiUrl}/decks/${deckId}`);
  if (res.ok) {
    const deck = await res.json();
    dispatch(loadDeck(deck));
  }
}


// thunk for creating decks
export const createDeckThunk = (data) => async dispatch => {
  const res = await fetch(`${apiUrl}/decks`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  if (res.ok) {
    const deck = await res.json()
    dispatch(loadDeck(deck))
  }
}



//
export default function reducer(state = { byId: {} }, action) {
  switch (action.type) {
    case LOAD_PUBLIC_DECKS: {
      return { ...state, byId: action.decks };
    }
    case LOAD_DECK: {
      return { ...state, activeDeck: action.activeDeck }
    }
    default: {
      return state;
    }
  }
}
