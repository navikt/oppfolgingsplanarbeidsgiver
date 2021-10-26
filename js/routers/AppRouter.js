import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import OppfolgingsplanerContainer from '../sider/OppfolgingsplanerSide';
import OppfolgingsplanContainer from '../sider/OppfolgingsplanSide';

const AppRouter = ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/oppfolgingsplanarbeidsgiver/:narmestelederId" component={OppfolgingsplanerContainer} />
      <Route
        path="/oppfolgingsplanarbeidsgiver/:narmestelederId/oppfolgingsplaner"
        component={OppfolgingsplanerContainer}
      />
      <Route
        path="/oppfolgingsplanarbeidsgiver/:narmestelederId/oppfolgingsplaner/:oppfolgingsplanId"
        component={OppfolgingsplanContainer}
      />
    </Router>
  );
};

AppRouter.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default AppRouter;
