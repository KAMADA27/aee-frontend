import React, { Suspense, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import * as actions from './store/actions/index';

import Auth from './containers/Auth/Auth';
import Layout from './hoc/Layout/Layout';
import UserEdit from './containers/Users/UserEdit/UserEdit';
import Logout from './containers/Auth/Logout/Logout';

import Spinner from './components/UI/Spinner/Spinner';

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
        <Route path="/users" exact render={ props => <Users { ...props } /> } />
        <Route path="/users/register" component={ UserEdit } />
        <Route path="/users/edit/:id" component={ UserEdit } />
        <Route path="/logout" component={ Logout } />
      </Layout>
    );
  }

  return (
    <div>
      <Switch>
        <Suspense fallback={ <Spinner /> }>
          { routes }
        </Suspense>
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
