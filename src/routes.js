import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
//import US_Map from "./components/US_Map"
import News from "./components/News";
import Health from "./components/Health";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/news" component={News} />
      <Route exact path="/health" component={Health} />
    </Switch>
  );
};

export default Routes;
