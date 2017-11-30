import { UPDATE_MESSAGES, ADD_MESSAGE, UPDATE_CHAT_OPEN } from '../actions';
const innitialState = {
  open: false,
  messages: [],
  read: true
}

export default (state = innitialState , action)=>{
  const newState = {...state};
  switch (action.type) {
    case UPDATE_MESSAGES:
      newState.messages = action.payload;
      if(!newState.open){
        newState.read = false;
      }
      return newState;
      break;
    case UPDATE_CHAT_OPEN:
      newState.open = action.payload;
      if(action.payload){
        newState.read = true;
      }
      return newState;
      break;
    case ADD_MESSAGE:
      newState.messages.push(action.payload)
      if(!newState.open){
        newState.read = false;
      }
      return newState;
      break;
    default:
      return state;
  }
}
