import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Versions from "./components/Versions";
import Products from "./components/Products";
import Screenshots from "./components/Screenshots";
import SimpleLoginPage from "./components/login_page";
class PageLayoutSimpleNav extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SimpleLoginPage}></Route>
          <Route exact path="/products" component={Products}></Route>
          <Route
            path="/products/:productid/product_versions"
            component={Versions}
          ></Route>
          <Route path="/screenshots" component={Screenshots}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default PageLayoutSimpleNav;
