import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { oppfolgingsplanPt } from '../../../proptypes/opproptypes';
import { erIkkeOppfolgingsdialogUtfylt } from '../../../utils/oppfolgingsplanUtils';
import IkkeUtfyltPlanFeilmelding from './IkkeUtfyltPlanFeilmelding';
import VeilederAvatar from '../../app/VeilederAvatar';

const texts = {
  veileder: 'Er du ferdig med denne planen og ønsker å sende den til godkjenning?',
  buttonGodkjenn: 'Jeg er ferdig',
};

export const ReviderEllerGodkjennPlanKnapperad = ({ godkjennPlan }) => {
  return (
    <div className="knapperad">
      <div className="knapperad__element">
        <Hovedknapp mini onClick={godkjennPlan}>
          {texts.buttonGodkjenn}
        </Hovedknapp>
      </div>
    </div>
  );
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
    const { oppfolgingsplan, settAktivtSteg } = this.props;
    return (
      <div className="godkjennPlanOversiktInformasjon">
        <div className="panel godkjennPlanOversiktInformasjon__panel">
          <Veilederpanel svg={<VeilederAvatar />}>{texts.veileder}</Veilederpanel>
          {this.state.visIkkeUtfyltFeilmelding && (
            <IkkeUtfyltPlanFeilmelding oppfolgingsplan={oppfolgingsplan} settAktivtSteg={settAktivtSteg} />
          )}
          <ReviderEllerGodkjennPlanKnapperad godkjennPlan={this.godkjennPlan} />
        </div>
      </div>
    );
  }
}

ReviderEllerGodkjennPlan.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
  settAktivtSteg: PropTypes.func,
  visSendTilGodkjenning: PropTypes.func,
};

export default ReviderEllerGodkjennPlan;
