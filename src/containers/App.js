import React from "react";
import { Router } from "react-router-dom";
import history from "../routes/History";
import Routes from "../routes/Routes";
import { IntlProvider } from "react-intl";
import messages from "../assets/locals/messages";
import Loader from "../components/Loader";
import "./App.scss";
import { connect } from "react-redux";
import { setCurrentLang } from "../store/Lang/actions";

class App extends React.Component {
  // App contains routes and also wrapped with snackbar and intl for localization

  render() {
    const { lang, loader } = this.props;
    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
        <div
          className={lang === "ar" ? "rtl" : "ltr"}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          {loader ? <Loader /> : null}
          <Router history={history}>{<Routes lang={lang} />}</Router>
        </div>
      </IntlProvider>
    );
  }
}

const mapStateToProps = ({ lang, loader }) => ({
  lang,
  loader,
});

export default connect(mapStateToProps, { setCurrentLang })(App);
