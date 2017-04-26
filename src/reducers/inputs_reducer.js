import { UPDATE_INPUTS } from '../actions';

export default (state = null , action)=>{
  switch (action.type) {
    case UPDATE_INPUTS:
      return action.payload
      break;
    default:
      return state;
  }
}
