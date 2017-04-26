import { UPDATE_WINNERS } from '../actions';

export default (state = [], action)=>{
  switch (action.type) {
    case UPDATE_WINNERS:
      return action.payload
      break;
    default:
      return state;
  }
}
