import * as types from "./types";

export const setCurrentLang = (payload) => {
  localStorage.setItem("lang", payload);
  return { type: types.SET_LANG, payload };
};
