import { SIGN_IN, SIGN_OUT } from './authConstants';

const initialState = {
  currentUser: {}
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SIGN_IN:
      return {
        ...state,
        authenticated: true,
        currentUser: action.creds.email,
      };
    case SIGN_OUT:
      return {
        ...state,
        authenticated: false,
        currentUser: {},
      }
    default:
      return state;
  }
}

export default reducer;