import { combineReducers } from "redux";
import lang from "./Lang/reducer";
import loader from "./Loader/reducer";

export default combineReducers({
  lang,
  loader,
});
