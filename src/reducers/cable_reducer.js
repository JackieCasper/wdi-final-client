import { UPDATE_CABLE } from '../actions';

export default (state = null, action)=>{
  switch (action.type) {
    case UPDATE_CABLE:
      return action.payload
      break;
    default:
      return state;
  }
}
