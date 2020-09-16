import React from "react";
import { Page } from "@patternfly/react-core";
import { PageHeader } from "@patternfly/react-core";

export default function AppPage(props) {
  const { children } = props;
  const logoProps = {
    href: "https://github.com/lingostack",
    target: "_blank",
  };

  return (
    <Page
      header={<PageHeader logo={"LingoQA Dashboard"} logoProps={logoProps} />}>
      {children}
    </Page>
  )
}
