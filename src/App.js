import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import SimpleLoginPage from "./components/login_page";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Versions from "./components/Versions";
import Products from "./components/Products";
class PageLayoutSimpleNav extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SimpleLoginPage}></Route>
          <Route exact path="/products" component={Products}></Route>
          <Route
            path="/products/:productid/screenshots"
            component={Versions}
          ></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default PageLayoutSimpleNav;
