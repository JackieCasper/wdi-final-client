import { UPDATE_GAME } from '../actions';

export default (state = null, action)=>{
  switch (action.type) {
    case UPDATE_GAME:
      return action.payload
      break;
    default:
      return state;
  }
}
