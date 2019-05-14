import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "unstated";
import MainAppPage from "./pages/main-app";
import IndexPage from "./pages/index";

export default () => {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route path="/app" component={MainAppPage} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}
