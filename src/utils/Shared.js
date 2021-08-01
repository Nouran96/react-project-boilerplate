import React from "react";
import store from "../store";
import { showSnackbarAction } from "../store/Snackbar/actions";
import messages from "../assets/Local/messages";

// To show error message that returned from backend
export function dispatchSnackbarError(data) {
  if (data?.errors) {
    const errorMsg = data.errors;
    store.dispatch(showSnackbarAction(errorMsg, "error"));
  } else {
    store.dispatch(showSnackbarAction(data, "error"));
  }
}
// To show success message after any success request if needed and rendered from locale files
export function dispatchSnackbarSuccess(message) {
  const lang = store.getState().lang;
  store.dispatch(
    showSnackbarAction(messages[lang].snackbar[message], "success")
  );
}

// Format time from h:m format to h hours m minutes
export const formatTime = (timeStr) => {
  const lang = store.getState().lang;
  const timeParts = timeStr.split(":");
  const date = new Date(
    0,
    0,
    0,
    parseInt(timeParts[0]),
    parseInt(timeParts[1])
  );

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours > 0 ? hours + ` ${messages[lang].shared.hours}` : ""} ${
    minutes > 0 ? minutes + ` ${messages[lang].shared.minutes}` : ""
  }`;
};

// Convert large number to K or M
export const largeNumberFormatter = (num) => {
  const lang = store.getState().lang;

  return Math.abs(num) > 999999
    ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) +
        " " +
        messages[lang].shared.million
    : Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) +
      " " +
      messages[lang].shared.thousand
    : Math.sign(num) * Math.abs(num);
};

// Return name of the month from id
// Id starts from 1 for January
export const getMonthName = (id) => {
  const lang = store.getState().lang;

  switch (id) {
    case 1:
      return messages[lang].dashboard.months.jan;
    case 2:
      return messages[lang].dashboard.months.feb;
    case 3:
      return messages[lang].dashboard.months.march;
    case 4:
      return messages[lang].dashboard.months.april;
    case 5:
      return messages[lang].dashboard.months.may;
    case 6:
      return messages[lang].dashboard.months.june;
    case 7:
      return messages[lang].dashboard.months.july;
    case 8:
      return messages[lang].dashboard.months.aug;
    case 9:
      return messages[lang].dashboard.months.sept;
    case 10:
      return messages[lang].dashboard.months.oct;
    case 11:
      return messages[lang].dashboard.months.nov;
    case 12:
      return messages[lang].dashboard.months.dec;
    default:
      return;
  }
};

export const splitVideoID = (videoLink) => {
  if (videoLink) {
    if (videoLink.match(/(\?|&)v=([^&#]+)/)) {
      return videoLink.split("v=")[1].split("&")[0];
    } else if (videoLink.match(/(\.be\/)+([^\/]+)/)) {
      return videoLink.split("/").pop();
    }
  }
};

export const isUploadedVideo = (link) => {
  if (link.includes("youtube") || link.includes("youtu.be")) {
    return false;
  }

  return true;
};

export const addCommasToPrice = (value) => {
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
