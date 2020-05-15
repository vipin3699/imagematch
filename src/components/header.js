import React from "react";
import { PageHeader, Breadcrumb, BreadcrumbItem } from "@patternfly/react-core";
import AppToolbar from "./toolbar";

class AppHeader extends React.Component {
  render() {
    return (
      <PageHeader
        // logo={
        //   <Brand
        //     src="https://pf4.patternfly.org/assets/images/pf-logo-small.svg"
        //     alt="Patternfly Logo"
        //   />
        // }
        logo={"LingoQA Dashboard"}
        toolbar={<AppToolbar />}
      />
    );
  }
}

export default AppHeader;
