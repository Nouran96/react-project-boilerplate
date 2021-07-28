import * as types from "./types";

const INITIAL_STATE = false;

export default function loader(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SHOW_LOADER:
      return action.data;
    case types.HIDE_LOADER:
      return action.data;
    default:
      return state;
  }
}
