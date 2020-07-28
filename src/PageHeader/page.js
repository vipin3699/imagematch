// import React from "react";
// import { Page } from "@patternfly/react-core";
// import AppHeader from "./header";
// class AppPage extends React.Component {
//   render() {
//     const { children } = this.props;
//     return <Page header={<AppHeader />}>{children}</Page>;
//   }
// }
// export default AppPage;
import React from "react";
import { Page, SkipToContent } from "@patternfly/react-core";
import AppHeader from "./header";
class AppPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0,
    };
  }

  onNavSelect = (result) => {
    this.setState({
      activeItem: result.itemId,
    });
  };

  render() {
    const { children } = this.props;
    const pageId = "main-content-page-layout-simple-nav";
    const PageSkipToContent = (
      <SkipToContent href={`#${pageId}`}>Skip to Content</SkipToContent>
    );
    return (
      <Page
        header={<AppHeader />}
        isManagedSidebar
        skipToContent={PageSkipToContent}
        mainContainerId={pageId}
      >
        {children}
      </Page>
    );
  }
}
export default AppPage;
