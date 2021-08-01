import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { hideSnackbarAction } from "../../store/Snackbar/actions";
import { injectIntl } from "react-intl";
import "./snackbar.scss";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function MaterialSnackbar(props) {
  const { isOpen, message, type } = useSelector((state) => state.snackbar);
  const {
    intl: { messages },
  } = props;
  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideSnackbarAction());
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => handleClose(null, null), 3000);
    }
  }, [isOpen]);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      key={`bottom,center`}
      onClose={() => handleClose}
      className={`${type === "error" ? "error" : "success"}`}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        className="medium_font d-flex align-items-center f_size_14"
      >
        <p className={`mb-0`}>{messages.errors[message] || message}</p>
      </Alert>
    </Snackbar>
  );
}

export default injectIntl(MaterialSnackbar);
