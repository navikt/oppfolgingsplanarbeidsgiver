import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Bjorn } from '@navikt/digisyfo-npm';
import { oppfolgingsplanPt } from '../../../proptypes/opproptypes';
import { erHerokuApp } from '../../../utils/urlUtils';
import { erIkkeOppfolgingsdialogUtfylt } from '../../../utils/oppfolgingsplanUtils';
import IkkeUtfyltPlanFeilmelding from './IkkeUtfyltPlanFeilmelding';

const texts = {
    bjorn: 'Er du ferdig med denne planen og ønsker å sende den til godkjenning?',
    buttonGodkjenn: 'Jeg er ferdig',
};

export const ReviderEllerGodkjennPlanKnapperad = (
    {
        godkjennPlan,
    }) => {
    return (<div className="knapperad">
        <div className="knapperad__element">
            <Hovedknapp
                mini
                onClick={erHerokuApp()
                    ? undefined
                    : godkjennPlan}>
                {texts.buttonGodkjenn}
            </Hovedknapp>
        </div>
    </div>);
};
ReviderEllerGodkjennPlanKnapperad.propTypes = {
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
        if (erIkkeOppfolgingsdialogUtfylt(this.props.oppfolgingsplan)) {
            this.setState({
                visIkkeUtfyltFeilmelding: true,
            });
        } else {
            this.props.visSendTilGodkjenning();
        }
    }

    render() {
        const {
            oppfolgingsplan,
            settAktivtSteg,
            rootUrl,
        } = this.props;
        return (<div className="godkjennPlanOversiktInformasjon">
            <div className="panel godkjennPlanOversiktInformasjon__panel">
                <Bjorn
                    className="z-index-1"
                    rootUrl={rootUrl}>
                    <p>{texts.bjorn}</p>
                </Bjorn>
                { this.state.visIkkeUtfyltFeilmelding &&
                <IkkeUtfyltPlanFeilmelding
                    oppfolgingsplan={oppfolgingsplan}
                    settAktivtSteg={settAktivtSteg}
                />
                }
                <ReviderEllerGodkjennPlanKnapperad
                    godkjennPlan={this.godkjennPlan}
                />
            </div>
        </div>);
    }
}

ReviderEllerGodkjennPlan.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    settAktivtSteg: PropTypes.func,
    visSendTilGodkjenning: PropTypes.func,
    rootUrl: PropTypes.string,
};

export default ReviderEllerGodkjennPlan;
