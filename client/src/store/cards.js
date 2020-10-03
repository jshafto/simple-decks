import { apiUrl } from '../config';

// action types
export const LOAD_CARDS = '/simple-decks/cards/LOAD_CARDS';
export const ADD_CARD= '/simple-decks/cards/ADD_CARD';
export const CLEAR_CARDS = 'simple-decks/cards/CLEAR_CARDS';
export const DELETE_CARD = 'simple-decks/carse/DELETE_CARD'


// action creators
export const loadCards = (cards) => ({
  type: LOAD_CARDS,
  cards
})

export const addCard = (card) => ({
  type: ADD_CARD,
  card
})
export const clearCards = () => ({
  type: CLEAR_CARDS
})

export const deleteCard = (cardId) => ({
  type: DELETE_CARD,
  cardId
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

export const createCardThunk = (deckId, data) => async dispatch => {

  const res = await fetch(`${apiUrl}/decks/${deckId}/cards`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  if (res.ok) {
    const card = await res.json()
    dispatch(addCard(card))
  }
  // error dispatch?
}



export const deleteCardThunk = (cardId) => async dispatch => {

  const res = await fetch(`${apiUrl}/cards/${cardId}`, {
    method: "DELETE",
  })
  if (res.ok) {
    dispatch(deleteCard(cardId))
  }
  // error dispatch?
}


// reducer

export default function reducer (state = { byId: {} }, action) {
  switch (action.type) {
    case LOAD_CARDS: {
      return {...state, byId: action.cards};
    }
    case ADD_CARD: {
      const cards = {...state.byId};
      cards[action.card.id] = action.card;
      return {...state, byId: cards}
    }
    case CLEAR_CARDS: {
      return {...state, byId: {}}
    }
    case DELETE_CARD: {
      const newState = {...state, byId: {...state.byId}};
      const id = action.cardId;
      delete newState.byId[id];
      return newState;
    }
    default: {
      return state;
    }
  }
}
