import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Auth from './containers/Auth/Auth';


const App = props => {
  let routes = (
    <Switch>
      <Route path="/" component={ Auth } />
    </Switch>
  )

  return (
    <div>
      <Switch>
        { routes }
      </Switch>
    </div>
  );
}

export default withRouter(App);
