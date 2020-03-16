import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Versions from "./Versions";
import Locales from "./Locales";
import Screenshots from "./Screenshots";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/versions" component={Versions} />
      <Route exact path="/locales" component={Locales} />
      <Route exact path="/screenshots" component={Screenshots} />
    </Switch>
  </BrowserRouter>
);
export default Routes;
