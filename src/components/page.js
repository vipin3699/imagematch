import React from "react";
import {
  Page,
  PageSection,
  PageSectionVariants,
  SkipToContent,
  TextContent,
  Text
} from "@patternfly/react-core";
import AppHeader from "./header";

class AppPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0
    };
  }

  onNavSelect = result => {
    this.setState({
      activeItem: result.itemId
    });
  };
  render() {
    const { activeItem } = this.state;
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
        className="myPageClass"
      >
        <PageSection variant={PageSectionVariants.light}>
          <TextContent>
            <Text component="h1">LingoQA Dashboard</Text>
            <Text component="p">
              LingoQA dashboard provides a automated way to test Web User
              Interfaces <br />
            </Text>
          </TextContent>
        </PageSection>
        <PageSection>{children}</PageSection>
      </Page>
    );
  }
}

export default AppPage;
