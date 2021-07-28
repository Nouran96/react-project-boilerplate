import React from "react";
import { Route } from "react-router-dom";
import History from "../../routes/History";
import Layout from "../../components/Layout/MainLayout";
import Auth from "../../utils/Auth";

export const WithLayout = (component) => {
  return <Layout>{component}</Layout>;
};

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const lang = localStorage.getItem("lang");
  return (
    <Route
      {...rest}
      render={(props) =>
        Auth.isAuth()
          ? WithLayout(<Component {...props} />)
          : History.push(`/${lang}/login`)
      }
    />
  );
};

export default PrivateRoute;
