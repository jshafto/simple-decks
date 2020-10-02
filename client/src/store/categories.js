import { apiUrl } from '../config';

export const GET_CATEGORIES = '/simple-decks/categories/GET_CATEGORIES';
export const CLEAR_CATEGORIES = '/simple-decks/categories/CLEAR_CATEGORIES'

export const getCategories = categories => ({
  type: GET_CATEGORIES,
  categories
})
export const clearCategories = categories => ({
  type: CLEAR_CATEGORIES,
})

export const loadCategoriesThunk = () => async dispatch => {
  const res = await fetch(`${apiUrl}/categories/`)
  if (res.ok) {
    const categories = await res.json();
    dispatch(getCategories(categories));
  }
}


export default function reducer(state = { byId: {} }, action) {
  switch (action.type) {
    case GET_CATEGORIES: {
      return { ...state, byId: action.categories };
    }
    case CLEAR_CATEGORIES: {
      return { ...state, byId: {} }
    }
    default: {
      return state;
    }
  }
}
