import React, { useState, useEffect } from "react";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import rtl from "jss-rtl";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import { useSelector } from "react-redux";
import App from "./containers/App";

function ThemeApp() {
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
  const lang = useSelector((state) => state.lang);
  const [direction, setDirection] = useState(lang === "en" ? "ltr" : "rtl");
  const defaultFontFamilies = [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ];
  useEffect(() => {
    setDirection(lang === "en" ? "ltr" : "rtl");
  }, [lang]);

  const theme = createTheme({
    direction: direction,
    palette: {
      type: "light",
      primary: {
        main: "#000",
      },
      secondary: {
        main: "#ac4556",
      },
      background: {
        drawer: "rgba(22, 69, 111, 1)",
      },
      text: {
        light: "#fff",
      },
    },
    typography: {
      fontFamily:
        lang === "en"
          ? ["Roboto-Regular", ...defaultFontFamilies].join(",")
          : ["Dubai-Regular", ...defaultFontFamilies].join(","),
      button: {
        fontSize: "1rem",
        fontWeight: 600,
        textTransform: "capitalize",
      },
    },
  });
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StylesProvider>
  );
}

export default ThemeApp;
