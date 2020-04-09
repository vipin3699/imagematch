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
    const { children } = this.props;

    //   const PageNav = (
    //     <Nav onSelect={this.onNavSelect} aria-label="Nav">
    //       <NavList variant={NavVariants.simple}>
    //         <NavItem itemId={0} isActive={activeItem === 0}>
    //           Products
    //         </NavItem>
    //         <NavItem itemId={1} isActive={activeItem === 1}>
    //           Versions
    //         </NavItem>
    //         <NavItem itemId={2} isActive={activeItem === 2}>
    //           Locales
    //         </NavItem>
    //         <NavItem itemId={3} isActive={activeItem === 3}>
    //           Screenshots
    //         </NavItem>
    //         {/* <NavItem itemId={4} isActive={activeItem === 4}>
    //           Server
    //         </NavItem> */}
    //       </NavList>
    //     </Nav>
    //   );

    // const Sidebar = <PageSidebar nav={PageNav} />;
    const pageId = "main-content-page-layout-simple-nav";
    const PageSkipToContent = (
      <SkipToContent href={`#${pageId}`}>Skip to Content</SkipToContent>
    );

    return (
      <Page
        header={<AppHeader />}
        // sidebar={Sidebar}
        isManagedSidebar
        skipToContent={PageSkipToContent}
        mainContainerId={pageId}
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
        <PageSection isFilled>{children}</PageSection>
      </Page>
    );
  }
}

export default AppPage;
