import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Home from '../Components/Home/Home';
import UserCrud from '../Components/User/UserCrud';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={UserCrud} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}

export default Routes;
