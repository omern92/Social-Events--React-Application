import {
  CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS
} from './eventConstants';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_EVENTS:
      return action.events;
    case CREATE_EVENT:
      return [
        ...state,
        action.event,
      ];
    case UPDATE_EVENT:
      return [
        ...state.filter(event => event.id !== action.event.id),
        action.event,
      ];
    case DELETE_EVENT:
      return [
        ...state.filter(event => event.id !== action.event.id)
      ];
    default:
      return state;
  }
}


  export default reducer;

