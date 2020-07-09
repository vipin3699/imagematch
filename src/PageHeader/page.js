import React from "react";
import { Page } from "@patternfly/react-core";
import AppHeader from "./header";
class AppPage extends React.Component {
  render() {
    const { children } = this.props;
    return <Page header={<AppHeader />}>{children}</Page>;
  }
}
export default AppPage;
