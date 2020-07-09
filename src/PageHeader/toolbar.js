import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownSeparator,
  Toolbar,
  Avatar,
} from "@patternfly/react-core";
// import avatarImg from "./avatar.png";
class AppToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      isKebabDropdownOpen: false,
      activeItem: 0,
    };
  }

  onDropdownToggle = (isDropdownOpen) => {
    this.setState({
      isDropdownOpen,
    });
  };

  onDropdownSelect = (event) => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen,
    });
  };
  render() {
    const { isDropdownOpen } = this.state;

    const userDropdownItems = [
      <DropdownItem>Link</DropdownItem>,
      <DropdownItem component="button">Action</DropdownItem>,
      <DropdownItem isDisabled>Disabled Link</DropdownItem>,
      <DropdownItem isDisabled component="button">
        Disabled Action
      </DropdownItem>,
      <DropdownSeparator />,
      <DropdownItem>Separated Link</DropdownItem>,
      <DropdownItem component="button">Separated Action</DropdownItem>,
    ];
    return (
      <Toolbar>
        <Dropdown
          isPlain
          position="right"
          onSelect={this.onDropdownSelect}
          isOpen={isDropdownOpen}
          toggle={
            <DropdownToggle onToggle={this.onDropdownToggle}>
              User
            </DropdownToggle>
          }
          dropdownItems={userDropdownItems}
        />
        {/* <Avatar src={avatarImg} alt="avatar"></Avatar> */}
      </Toolbar>
    );
  }
}

export default AppToolbar;
