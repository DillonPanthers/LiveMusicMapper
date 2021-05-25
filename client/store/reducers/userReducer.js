import { SET_USER } from '../actions/index';

const initialState = { user: {} };

const userReducer = (state = initialState, action) => {
  if (action.type === SET_USER) return action.user;
  return state;
};

export default userReducer;
