import { apiUrl } from '../config';

// action types
// get a collection of public decks
export const LOAD_PUBLIC_DECKS = '/simple-decks/decks/LOAD_PUBLIC_DECKS';


// action creators
// get a collection of public decks
export const loadPublicDecks = (decks) => ({
  type: LOAD_PUBLIC_DECKS,
  decks
})

// thunks
// thunk for getting public decks
export const loadPublicDecksThunk = () => async dispatch => {
  const res = await fetch(`${apiUrl}/decks`);
  const decks= await res.json();
  // const decks = {};
  // data.forEach(deck => decks[deck.id] = deck);
  // const decks = {};
  // data.forEach(deck => {
  //   const { id, name, categoryId, userId, createdAt, updatedAt} = deck;
  //   const privacy = deck.private;
  //   const numCards = deck.Cards.length;
  //   const category = deck.Category.label;
  //   const creator = deck.User.username;
  //   const maxScore = (deck.Scores.length) ? Math.max(deck.Scores) :null;
  //   decks[id] = {
  //     id,
  //     name,
  //     categoryId,
  //     creatorId: userId,
  //     privacy,
  //     numCards,
  //     category,
  //     creator,
  //     maxScore,
  //     createdAt,
  //     updatedAt,
  //   }
  // })
  dispatch(loadPublicDecks(decks));
}

//
export default function reducer (state = { byId: { } }, action) {
  switch (action.type) {
    case LOAD_PUBLIC_DECKS: {
      return {...state, byId: action.decks};
    }
    default: {
      return state;
    }
  }
}
