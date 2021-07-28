import * as types from "./types";

const INITIAL_STATE = localStorage.getItem("lang") || "en";

export default function locale(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_LANG:
      return action.payload;
    default:
      return state;
  }
}
