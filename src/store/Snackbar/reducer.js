import * as types from "./types";

export default function snackbar(state = {}, action) {
  switch (action.type) {
    case types.SHOW_SNACKBAR:
      return {
        ...state,
        isOpen: true,
        message: action.message,
        type: action.snacknarType,
      };
    case types.HIDE_SNACKBAR:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
}
