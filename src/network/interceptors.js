import store from "../../store";
import { loader } from "../../store/Loader/actions";
import Auth from "../../utils/Auth";
// import { dispatchSnackbarError } from "../../utils/Shared";
import messages from "../../assets/Local/messages";

export const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

export const requestHandler = (request) => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
  if (isHandlerEnabled(request)) {
    // Modify request here
    store.dispatch(loader(true));
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return request;
};

export const successHandler = (response) => {
  if (isHandlerEnabled(response)) {
    // Hanlde Response
    store.dispatch(loader(false));
  }
  return response;
};

export const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
    store.dispatch(loader(false));
    error.response.status === 401 && Auth.signOut();
  }
  return Promise.reject({ ...error });
};
