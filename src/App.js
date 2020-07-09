import { Route, Switch, BrowserRouter } from "react-router-dom";
import "@patternfly/react-core/dist/styles/base.css";
import React from "react";
import Products from "./Components/Products";
import Versions from "./Components/Versions";
function PageLayoutSimpleNav() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/products" component={Products}></Route>
        <Route
          path="/products/:productid/screenshots"
          component={Versions}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
}
export default PageLayoutSimpleNav;
