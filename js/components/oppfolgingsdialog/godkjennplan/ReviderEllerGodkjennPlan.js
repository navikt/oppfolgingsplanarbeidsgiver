import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import {
    getLedetekst,
    Bjorn,
} from 'digisyfo-npm';
import {
    forespoerselRevideringPt,
    oppfolgingsdialogPt,
} from '../../../proptypes/opproptypes';
import { erHerokuApp } from '../../../utils/urlUtils';
import { erIkkeOppfolgingsdialogUtfylt } from '../../../utils/oppfolgingsplanUtils';
import AppSpinner from '../../AppSpinner';
import IkkeUtfyltPlanFeilmelding from './IkkeUtfyltPlanFeilmelding';

export const ReviderEllerGodkjennPlanKnapperad = (
    {
        oppfolgingsdialog,
        forespoerRevidering,
        godkjennPlan,
    }) => {
    const knappReviderPlanTekst = getLedetekst('oppfolgingsdialog.reviderEllerGodkjennPlanKnapperad.forespoerRevidering.arbeidsgiver');
    const godkjennPlanTekst = getLedetekst('oppfolgingsdialog.reviderEllerGodkjennPlanKnapperad.ferdig.arbeidsgiver');
    return (<div className="knapperad">
        <div className="knapperad__element">
            <Knapp
                mini
                onClick={erHerokuApp()
                    ? undefined
                    : () => {
                        forespoerRevidering(oppfolgingsdialog.id);
                    }}>
                { knappReviderPlanTekst }
            </Knapp>
        </div>
        <div className="knapperad__element">
            <Hovedknapp
                mini
                onClick={erHerokuApp()
                    ? undefined
                    : godkjennPlan}>
                {godkjennPlanTekst}
            </Hovedknapp>
        </div>
    </div>);
};
ReviderEllerGodkjennPlanKnapperad.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    forespoerRevidering: PropTypes.func,
    godkjennPlan: PropTypes.func,
};

class ReviderEllerGodkjennPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visIkkeUtfyltFeilmelding: false,
        };
        this.godkjennPlan = this.godkjennPlan.bind(this);
    }

    godkjennPlan() {
        if (erIkkeOppfolgingsdialogUtfylt(this.props.oppfolgingsdialog)) {
            this.setState({
                visIkkeUtfyltFeilmelding: true,
            });
        } else {
            this.props.visSendTilGodkjenning();
        }
    }

    render() {
        const {
            oppfolgingsdialog,
            forespoerselRevidering,
            forespoerRevidering,
            settAktivtSteg,
            rootUrl,
        } = this.props;
        return (<div className="godkjennPlanOversiktInformasjon">
            <div className="panel godkjennPlanOversiktInformasjon__panel">
                { (() => {
                    if (forespoerselRevidering.sender) {
                        return (<AppSpinner />);
                    } else if (forespoerselRevidering.sendt) {
                        return (<Alertstripe
                            type="suksess"
                            solid>
                            {getLedetekst('oppfolgingsdialog.reviderEllerGodkjennPlan.forespoerselRevidering.sendt.arbeidsgiver')}
                        </Alertstripe>);
                    }
                    return (
                        <div>
                            <Bjorn
                                className="z-index-1"
                                rootUrl={rootUrl}>
                                <p>{getLedetekst('oppfolgingsdialog.reviderEllerGodkjennPlan.bjoern.arbeidsgiver')}</p>
                            </Bjorn>
                            { this.state.visIkkeUtfyltFeilmelding &&
                            <IkkeUtfyltPlanFeilmelding
                                oppfolgingsdialog={oppfolgingsdialog}
                                settAktivtSteg={settAktivtSteg}
                            />
                            }
                            <ReviderEllerGodkjennPlanKnapperad
                                oppfolgingsdialog={oppfolgingsdialog}
                                forespoerRevidering={forespoerRevidering}
                                godkjennPlan={this.godkjennPlan}
                            />
                        </div>
                    );
                })()
                }
            </div>
        </div>);
    }
}

ReviderEllerGodkjennPlan.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    forespoerselRevidering: forespoerselRevideringPt,
    forespoerRevidering: PropTypes.func,
    settAktivtSteg: PropTypes.func,
    visSendTilGodkjenning: PropTypes.func,
    rootUrl: PropTypes.string,
};

export default ReviderEllerGodkjennPlan;
