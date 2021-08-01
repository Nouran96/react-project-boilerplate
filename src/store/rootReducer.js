import { combineReducers } from "redux";
import lang from "./Lang/reducer";
import loader from "./Loader/reducer";
import snackbar from "./Snackbar/reducer";

export default combineReducers({
  lang,
  loader,
  snackbar,
});
