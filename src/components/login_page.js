import ReactDOM from "react-dom";
import "@patternfly/react-core/dist/styles/base.css";
import Products from "./Products";

import React from "react";
import {
  LoginFooterItem,
  LoginForm,
  LoginMainFooterBandItem,
  LoginMainFooterLinksItem,
  LoginPage,
  BackgroundImageSrc,
  ListItem
} from "@patternfly/react-core";
class SimpleLoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // showHelperText: false,
      usernameValue: "",
      // isValidUsername: true,
      passwordValue: ""
      // isValidPassword: true
      // isRememberMeChecked: false
    };

    this.handleUsernameChange = value => {
      this.setState({ usernameValue: value });
    };

    this.handlePasswordChange = passwordValue => {
      this.setState({ passwordValue });
    };

    // this.onRememberMeClick = () => {
    //   this.setState({ isRememberMeChecked: !this.state.isRememberMeChecked });
    // };

    this.onLoginButtonClick = event => {
      this.props.history.push("/products");

      // console.log("login clicked");
      event.preventDefault();
    };
  }

  render() {
    const loginForm = (
      <LoginForm
        // showHelperText={this.state.showHelperText}
        // helperText={helperText}
        usernameLabel="Username"
        usernameValue={this.state.usernameValue}
        onChangeUsername={this.handleUsernameChange}
        // isValidUsername={this.state.isValidUsername}
        passwordLabel="Password"
        passwordValue={this.state.passwordValue}
        onChangePassword={this.handlePasswordChange}
        // isValidPassword={this.state.isValidPassword}
        // rememberMeLabel="Keep me logged in for 30 days."
        // isRememberMeChecked={this.state.isRememberMeChecked}
        // onChangeRememberMe={this.onRememberMeClick}
        onLoginButtonClick={this.onLoginButtonClick}
      />
    );

    const images = {
      // [BackgroundImageSrc.lg]: "/assets/images/pfbg_1200.jpg",
      // [BackgroundImageSrc.sm]: "/assets/images/pfbg_768.jpg",
      // [BackgroundImageSrc.sm2x]: "/assets/images/pfbg_768@2x.jpg",
      // [BackgroundImageSrc.xs]: "/assets/images/pfbg_576.jpg",
      // [BackgroundImageSrc.xs2x]: "/assets/images/pfbg_576@2x.jpg"
    };

    return (
      <LoginPage
        footerListVariants="inline"
        // brandImgSrc={brandImg}
        // brandImgAlt="PatternFly logo"
        backgroundImgSrc={images}
        backgroundImgAlt="Images"
        // footerListItems={listItem}
        // textContent="This is placeholder text only. Use this area to place any information or introductory message about your application that may be relevant to users."
        loginTitle="Log In to LingoQA account"
        // loginSubtitle="Please use your single sign-on LDAP credentials"
      >
        {loginForm}
      </LoginPage>
    );
  }
}

export default SimpleLoginPage;
