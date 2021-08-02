import React from "react";
import { TextField, IconButton, InputAdornment } from "@material-ui/core";
import Visibility from "../../../assets/images/icons/visible.svg";
import VisibilityOff from "../../../assets/images/icons/invisible.svg";
import "./InputField.scss";

const InputField = ({
  name,
  label,
  value,
  error,
  handleChange,
  helperText,
  isMultiline,
  isRequired,
  variant,
  type,
  placeholder,
  startIcon,
}) => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <TextField
      className="my-3"
      classes={{ root: !error && value ? "valid" : "" }}
      name={name}
      type={
        values.showPassword && type === "password"
          ? "text"
          : type
          ? type
          : "password"
      }
      label={label ? label : ""}
      inputProps={{ maxLength: isMultiline ? 500 : 50 }}
      variant={variant ? variant : "outlined"}
      fullWidth
      value={value}
      error={error}
      helperText={error && helperText}
      onChange={handleChange}
      multiline={isMultiline}
      rows={isMultiline ? 3 : 1}
      placeholder={placeholder}
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? (
                      <img src={Visibility} alt="" />
                    ) : (
                      <img src={VisibilityOff} alt="" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">
                  <img src={startIcon} alt="" />
                </InputAdornment>
              ),
            }
          : startIcon
          ? {
              startAdornment: (
                <InputAdornment position="start">
                  <img src={startIcon} alt="" />
                </InputAdornment>
              ),
            }
          : ""
      }
    />
  );
};

export default InputField;
