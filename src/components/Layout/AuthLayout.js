import React from "react";
import "./layout.scss";

function AuthLayout(props) {
  return (
    <div className="container authLayout d-flex align-items-center justify-content-center">
      <div className="p-5 authCard">{props.children}</div>
    </div>
  );
}

export default AuthLayout;
