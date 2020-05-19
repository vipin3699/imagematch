import "@patternfly/react-core/dist/styles/base.css";
import React from "react";
import { LoginForm, LoginPage } from "@patternfly/react-core";
class SimpleLoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameValue: "",
      passwordValue: "",
    };

    this.handleUsernameChange = (value) => {
      this.setState({ usernameValue: value });
    };

    this.handlePasswordChange = (passwordValue) => {
      this.setState({ passwordValue });
    };

    this.onLoginButtonClick = (event) => {
      if (
        this.state.usernameValue === "user" &&
        this.state.passwordValue === "user"
      ) {
        this.props.history.push("/products");
      } else {
        alert("Please enter valid Username and Password");
      }
      event.preventDefault();
    };
  }

  render() {
    const loginForm = (
      <LoginForm
        usernameLabel="Username"
        usernameValue={this.state.usernameValue}
        onChangeUsername={this.handleUsernameChange}
        passwordLabel="Password"
        passwordValue={this.state.passwordValue}
        onChangePassword={this.handlePasswordChange}
        onLoginButtonClick={this.onLoginButtonClick}
      />
    );

    const images = {};

    return (
      <LoginPage
        footerListVariants="inline"
        backgroundImgSrc={images}
        backgroundImgAlt="Images"
        loginTitle="Log In to LingoQA account"
      >
        {loginForm}
      </LoginPage>
    );
  }
}

export default SimpleLoginPage;
