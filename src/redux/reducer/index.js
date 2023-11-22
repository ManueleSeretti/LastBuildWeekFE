import { SET_TOKEN } from "../actions";

const initialState = {
  content: null,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, content: action.payload };

    default:
      return state;
  }
};

export default mainReducer;
