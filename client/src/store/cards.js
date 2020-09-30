import { apiUrl } from '../config';

// action types
export const LOAD_CARDS = '/simple-decks/cards/LOAD_CARDS'

// action creators
export const loadCards = (cards) => ({
  type: LOAD_CARDS,
  cards
})

// thunks
export const loadCardsThunk = (deckId) => async dispatch => {
  const res = await fetch(`${apiUrl}/decks/${deckId}/cards`);
  if (res.ok) {
    const cards = await res.json();
    dispatch(loadCards(cards))
  }

  //probably dispatch something to suggest an error
}

// reducer

export default function reducer (state = { byId: {} }, action) {
  switch (action.type) {
    case LOAD_CARDS: {
      return {...state, byId: action.cards};
    }
    default: {
      return state;
    }
  }
}
