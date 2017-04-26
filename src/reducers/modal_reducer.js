import { UPDATE_MODAL_CONTENTS, OPEN_MODAL, CLOSE_MODAL } from '../actions';
const innitialState = {
  open: false,
  content: null
}

export default (state = innitialState , action)=>{
  const newState = {...state};
  switch (action.type) {
    case UPDATE_MODAL_CONTENTS:
      newState.content = action.payload;
      return newState;
      break;
    case OPEN_MODAL:
      newState.open = true;
      return newState;
      break;
    case CLOSE_MODAL:
      newState.open = false;
      return newState;
      break;
    default:
      return state;
  }
}
