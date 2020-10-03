import Cookies from 'js-cookie';
const themeInit = (Cookies.get('paletteType')==='dark')
// action types
export const OPEN_MODAL = 'simple-decks/ui/OPEN_MODAL';
export const CLOSE_MODAL = 'simple-decks/ui/CLOSE_MODAL';
export const TOGGLE_THEME = 'simple-decks/ui/TOGGLE_THEME';
export const SET_THEME = 'simple-decks/us/SET_THEME';

// action creators
export const openModal = modal => ({
  type: OPEN_MODAL,
  modal
})


export const closeModal = () => ({
  type: CLOSE_MODAL,
})

export const toggleTheme = () => ({
  type: TOGGLE_THEME,
})
export const setThemeDark = () => ({
  type: SET_THEME,
})





export default function reducer (state = {modal:null, darkTheme: themeInit}, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      return {...state, modal: action.modal }
    }
    case CLOSE_MODAL: {
      return {...state, modal: null }
    }
    case TOGGLE_THEME: {
      const newTheme = !state.darkTheme
      return { ...state, darkTheme: newTheme }
    }
    case SET_THEME: {
      return { ...state, darkTheme: true }
    }
    default: {
      return state;
    }
  }

}
