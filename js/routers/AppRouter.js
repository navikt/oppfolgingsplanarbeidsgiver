import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import OppfolgingsdialogerContainer from '../sider/OppfolgingsdialogerSide';
import OppfolgingsdialogContainer from '../sider/OppfolgingsdialogSide';

const AppRouter = ({ history }) => {
    return (<Router history={history}>
        <Route path="/oppfolgingsplanarbeidsgiver/:koblingId" component={OppfolgingsdialogerContainer} />
        <Route path="/oppfolgingsplanarbeidsgiver/:koblingId/oppfolgingsplaner" component={OppfolgingsdialogerContainer} />
        <Route path="/oppfolgingsplanarbeidsgiver/:koblingId/oppfolgingsplaner/:oppfolgingsdialogId" component={OppfolgingsdialogContainer} />
    </Router>);
};

AppRouter.propTypes = {
    history: PropTypes.shape().isRequired,
};

export default AppRouter;
