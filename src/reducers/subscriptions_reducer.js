import { ADD_SUBSCRIPTION, REMOVE_SUBSCRIPTIONS } from '../actions';

export default (state = {} , action)=>{
  switch (action.type) {
    case ADD_SUBSCRIPTION:
      const newState = {...state};
      newState[action.payload.name] = action.payload.subscription
      return newState;
      break;
    case REMOVE_SUBSCRIPTIONS:
      return action.payload
      break;
    default:
      return state;
  }
}
