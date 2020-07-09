import React from "react";
import { PageHeader } from "@patternfly/react-core";
class AppHeader extends React.Component {
  render() {
    const logoProps = {
      href: "https://github.com/lingostack",
      target: "_blank",
    };
    return <PageHeader logo={"LingoQA Dashboard"} logoProps={logoProps} />;
  }
}

export default AppHeader;
