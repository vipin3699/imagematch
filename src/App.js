import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import AppPage from "./components/page";
import Versions from "./components/Versions";
import Products from "./components/Products";
import Locales from "./components/Locales";
import Screenshots from "./components/Screenshots";
class PageLayoutSimpleNav extends React.Component {
  render() {
    return (
      <AppPage>
        <BrowserRouter>
          <Switch>
            <Route
              path="/products/:productid/versions/:versionid/locales/:localeid/screenshots"
              component={Screenshots}
            ></Route>
            <Route
              path="/products/:productid/versions/:versionid/locales"
              component={Locales}
            ></Route>
            <Route exact path="/products" component={Products}></Route>
            <Route
              path="/products/:productid/versions"
              component={Versions}
            ></Route>
          </Switch>
        </BrowserRouter>
      </AppPage>
    );
  }
}

export default PageLayoutSimpleNav;
