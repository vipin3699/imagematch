import React from "react";
import { PageHeader } from "@patternfly/react-core";
import AppToolbar from "./toolbar";
class AppHeader extends React.Component {
  render() {
    return <PageHeader logo={"LingoQA Dashboard"} toolbar={<AppToolbar />} />;
  }
}

export default AppHeader;
