import { UPDATE_DECK } from '../actions';

export default (state = {comparer: 'first', cards:[]}, action)=>{
  switch (action.type) {
    case UPDATE_DECK:
      return action.payload
      break;
    default:
      return state;
  }
}
