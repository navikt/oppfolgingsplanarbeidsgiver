import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import OppfolgingsplanerContainer from '../sider/OppfolgingsplanerSide';
import OppfolgingsplanContainer from '../sider/OppfolgingsplanSide';

const appendToBase = (path) => {
  return process.env.REACT_APP_CONTEXT_ROOT + path;
};

const AppRouter = ({ history }) => {
  return (
    <Router history={history}>
      <Route path={appendToBase('/:narmestelederId')} component={OppfolgingsplanerContainer} />
      <Route path={appendToBase('/:narmestelederId/oppfolgingsplaner')} component={OppfolgingsplanerContainer} />
      <Route
        path={appendToBase('/:narmestelederId/oppfolgingsplaner/:oppfolgingsplanId')}
        component={OppfolgingsplanContainer}
      />
    </Router>
  );
};

AppRouter.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default AppRouter;
