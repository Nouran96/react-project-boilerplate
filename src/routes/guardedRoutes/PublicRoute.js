import React from "react";
import { Route } from "react-router-dom";
import History from "../../routes/History";
import Layout from "../../components/Layout/AuthLayout";
import Auth from "../../utils/Auth";

export const WithLayout = (component) => {
  return <Layout>{component}</Layout>;
};

const PublicRoute = ({ component: Component, path, ...rest }) => {
  const lang = localStorage.getItem("lang");
  return (
    <Route
      {...rest}
      render={(props) =>
        !Auth.isAuth()
          ? WithLayout(<Component {...props} />)
          : History.push(`/${lang}`)
      }
    />
  );
};

export default PublicRoute;
