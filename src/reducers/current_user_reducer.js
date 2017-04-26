import { UPDATE_CURRENT_USER } from '../actions';

export default (state = null, action)=>{
  console.log(action.type)
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      return action.payload
      break;
    default:
      return state;
  }
}
