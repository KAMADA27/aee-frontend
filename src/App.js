import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';

const Users = React.lazy(() => import('./containers/Users/Users'));

const App = props => {
  const { onTryAutoSignup, isAuthenticated } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/" component={ Auth } />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Layout>
        <Route path="/users" exact render={ props => <Users  { ...props } /> } />
        <Route path="/logout" component={ Logout } />
      </Layout>
    );
  }

  return (
    <div>
      <Switch>
        { routes }
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
