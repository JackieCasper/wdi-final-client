import { UPDATE_PLAYER } from '../actions';

export default (state = [], action)=>{
  switch (action.type) {
    case UPDATE_PLAYER:
      return action.payload
      break;
    default:
      return state;
  }
}
