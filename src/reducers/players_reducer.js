import { UPDATE_PLAYERS } from '../actions';

export default (state = [], action)=>{
  switch (action.type) {
    case UPDATE_PLAYERS:
      return action.payload
      break;
    default:
      return state;
  }
}
