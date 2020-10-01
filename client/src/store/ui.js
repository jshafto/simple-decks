// action types
export const OPEN_MODAL = 'simple-decks/ui/OPEN_MODAL';
export const CLOSE_MODAL = 'simple-decks/ui/CLOSE_MODAL';


// action creators
export const openModal = modal => ({
  type: OPEN_MODAL,
  modal
})


export const closeModal = () => ({
  type: CLOSE_MODAL,
})

export default function reducer (state = {modal:null}, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      return {...state, modal: action.modal }
    }
    case CLOSE_MODAL: {
      return {...state, modal: null }
    }
    default: {
      return state;
    }
  }

}
