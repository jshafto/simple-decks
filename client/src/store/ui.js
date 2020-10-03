// action types
export const OPEN_MODAL = 'simple-decks/ui/OPEN_MODAL';
export const CLOSE_MODAL = 'simple-decks/ui/CLOSE_MODAL';
export const TOGGLE_THEME = 'simple-decks/ui/TOGGLE_THEME';

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

export default function reducer (state = {modal:null, darkTheme: false}, action) {
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
    default: {
      return state;
    }
  }

}
