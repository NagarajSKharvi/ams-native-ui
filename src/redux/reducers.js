import { SET_USER_NAME, SET_USER_ID } from "./actions";

const initialState = {
  name: "",
  uId: 0,
};

function userReducer(state = initialState, action) {
  switch (action) {
    case SET_USER_NAME: {
      return { ...state, name: action.payload };
    }
    case SET_USER_ID: {
      return { ...state, uId: action.payload };
    }
    default:
      return state;
  }
}

export default userReducer;
