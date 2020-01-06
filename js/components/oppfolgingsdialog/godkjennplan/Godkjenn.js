import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsdialogPt } from '../../../proptypes/opproptypes';
import GodkjennPlanOversiktInformasjon from './GodkjennPlanOversiktInformasjon';
import ReviderEllerGodkjennPlan from './ReviderEllerGodkjennPlan';
import GodkjennPlanLightboks from './GodkjennPlanLightboks';

class Godkjenn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visBekreftelse: false,
            visGodkjenPlanSkjema: false,
        };
        this.sendGodkjennPlan = this.sendGodkjennPlan.bind(this);
        this.visGodkjenPlanSkjema = this.visGodkjenPlanSkjema.bind(this);
        this.lukkGodkjenPlanSkjema = this.lukkGodkjenPlanSkjema.bind(this);
        this.formRef = React.createRef();
    }

    componentWillMount() {
        window.location.hash = 'godkjenn';
        window.sessionStorage.setItem('hash', 'godkjenn');
    }

    componentDidMount() {
        window.scrollTo(0, this.formRef.current.offsetTop);
    }

    visGodkjenPlanSkjema() {
        this.setState({
            visGodkjenPlanSkjema: true,
        });
    }

    lukkGodkjenPlanSkjema() {
        this.setState({
            visGodkjenPlanSkjema: false,
        });
    }

    sendGodkjennPlan(gyldighetstidspunkt, status, delMedNav) {
        const { oppfolgingsdialog } = this.props;
        this.props.godkjennPlan(oppfolgingsdialog.id, gyldighetstidspunkt, status, oppfolgingsdialog.arbeidstaker.fnr, delMedNav);
    }

    render() {
        const {
            oppfolgingsdialog,
            settAktivtSteg,
            rootUrl,
        } = this.props;
        return (<div ref={this.formRef} className="godkjennPlanOversikt">
            <GodkjennPlanOversiktInformasjon
                oppfolgingsdialog={oppfolgingsdialog}
                rootUrl={rootUrl}
            />

            {!this.state.visGodkjenPlanSkjema &&
            <ReviderEllerGodkjennPlan
                oppfolgingsdialog={oppfolgingsdialog}
                rootUrl={rootUrl}
                settAktivtSteg={settAktivtSteg}
                visSendTilGodkjenning={this.visGodkjenPlanSkjema}
            />
            }

            {this.state.visGodkjenPlanSkjema &&
            <GodkjennPlanLightboks
                avbryt={this.lukkGodkjenPlanSkjema}
                rootUrl={rootUrl}
                oppfolgingsdialog={oppfolgingsdialog}
                godkjennPlan={this.sendGodkjennPlan}
            />
            }
        </div>);
    }
}
Godkjenn.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    godkjennPlan: PropTypes.func,
    settAktivtSteg: PropTypes.func,
    rootUrl: PropTypes.string,
};

export default Godkjenn;
