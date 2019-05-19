import { MODAL_OPEN, MODAL_CLOSE } from './modalsConstants';

const initialState = null;

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case MODAL_OPEN:
      return {
        ...state,
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    case MODAL_CLOSE:
      return null;
    default:
      return state;
  }
}

export default reducer;