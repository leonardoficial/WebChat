//import "babel-polyfill";
import "./styles/styles";

import React from "react";
import { render } from "react-dom";

//import { Route, HashRouter } from "react-router-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ChatPage     from "./containers/ChatPage";
import SignInPage   from "./containers/SignInPage";
import RegisterPage from "./containers/RegisterPage";

const NotFound = () => {
  return(<h1>ERROR 404</h1>);
}

/*
render(
  <HashRouter>
    <div id="haha">
      <Route exact path="/" component={SignInPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/chat" component={ChatPage} />
    </div>
  </HashRouter>,
  document.getElementById("root")
);
*/

render((
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignInPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/chat" component={ChatPage} />
    </Switch>
  </BrowserRouter>),
document.getElementById("root")
);



