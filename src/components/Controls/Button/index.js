import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
    borderRadius: "10px",
    width: (props) => (props.fullWidth ? "100%" : "auto"),
    boxShadow: "none",
    backgroundColor: (props) =>
      props.bgColor ? props.bgColor : theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: (props) =>
        props.bgColor ? props.bgColor : theme.palette.secondary.main,
    },
  },
}));

const ButtonComponent = ({
  bgColor,
  fullWidth,
  content,
  handleClick,
  classes,
  type,
}) => {
  const classNames = useStyles({ bgColor, fullWidth });

  return (
    <Button
      variant="contained"
      type={type}
      className={`${classes} ${classNames.root}`}
      onClick={handleClick}
    >
      {content}
    </Button>
  );
};

export default ButtonComponent;
