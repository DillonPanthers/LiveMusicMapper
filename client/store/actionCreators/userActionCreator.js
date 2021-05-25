import { SET_USER } from '../actions/index';

export const setUser = (user) => ({
  type: SET_USER,
  user,
});
