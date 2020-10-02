import { apiUrl } from '../config';

// action types
// get a collection of public decks
export const LOAD_DECKS = '/simple-decks/decks/LOAD_DECKS';
// load single deck details
export const LOAD_DECK_DETAILS = '/simple-decks/decks/LOAD_DECK_DETAILS';

export const CLEAR_DECK = 'simple-decks/decks/CLEAR_DECK'

export const UPDATE_SCORE = 'simple-decks/decks/UPDATE_SCORE';


// action creators
// get a collection of public decks
export const loadDecks = (decks) => ({
  type: LOAD_DECKS,
  decks
})
// load_deck_details
export const loadDeck = (deck) => ({
  type: LOAD_DECK_DETAILS,
  activeDeck: deck
})
//
export const clearDeck = () => ({
  type: CLEAR_DECK
})

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  score
})

// thunks
// thunk for getting public decks
export const loadPublicDecksThunk = () => async dispatch => {
  const res = await fetch(`${apiUrl}/decks`);
  if (res.ok) {
    const decks = await res.json();
    dispatch(loadDecks(decks));
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

// thunk for loading a user's own decks
export const loadOwnDecksThunk = () => async dispatch => {
  const res = await fetch(`${apiUrl}/users/me/decks`);
  if (res.ok) {
    const decks = await res.json();
    dispatch(loadDecks(decks));
  }
}

export const postScoreThunk = (hits, total, deckId) => async dispatch => {
  const data = {hits, total};
  const res = await fetch(`${apiUrl}/users/me/decks/${deckId}/scores`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  if (res.ok) {
    const maxScore = await res.json();
    dispatch(updateScore(maxScore))
  }

}

// thunk for creating decks
export const createDeckThunk = (data) => async dispatch => {
  const deckData = {
    categoryId: data.category.id,
    private: data.privacy,
    name: data.name
  }
  // console.log(data);
  const res = await fetch(`${apiUrl}/decks`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(deckData),
  })
  if (res.ok) {
    const deck = await res.json()
    dispatch(loadDeck(deck))
  }

}



//
export default function reducer(state = { byId: {}, activeDeck: { } }, action) {
  switch (action.type) {
    case LOAD_DECKS: {
      return { ...state, byId: action.decks, activeDeck: {} };
    }
    case LOAD_DECK_DETAILS: {
      return { ...state, activeDeck: action.activeDeck }
    }
    case CLEAR_DECK: {
      return {...state, activeDeck: {} }
    }
    case UPDATE_SCORE: {
      return {...state, activeDeck: {...state.activeDeck, maxScore: action.score.maxScore}}
    }
    default: {
      return state;
    }
  }
}
