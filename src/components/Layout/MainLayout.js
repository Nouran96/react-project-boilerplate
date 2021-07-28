import React from "react";
import { injectIntl } from "react-intl";

function MainLayout(props) {
  return (
    <div>
      <main>{props.children}</main>
    </div>
  );
}

export default injectIntl(MainLayout);
