import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import AppPage from "./components/page";
import Versions from "./components/Versions";
import Products from "./components/Products";
import Screenshots from "./components/Screenshots";
class PageLayoutSimpleNav extends React.Component {
  render() {
    return (
      <AppPage>
        <BrowserRouter>
          <Switch>
            <Route exact path="/products" component={Products}></Route>
            <Route
              path="/products/:productid/product_versions"
              component={Versions}
            ></Route>
            <Route path="/screenshots" component={Screenshots}></Route>
          </Switch>
        </BrowserRouter>
      </AppPage>
    );
  }
}

export default PageLayoutSimpleNav;
