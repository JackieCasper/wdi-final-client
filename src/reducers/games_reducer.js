import { UPDATE_GAMES } from '../actions';

export default (state = [], action)=>{
  switch (action.type) {
    case UPDATE_GAMES:
      return action.payload
      break;
    default:
      return state;
  }
}
