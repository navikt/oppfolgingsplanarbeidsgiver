import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as opProptypes from '../../proptypes/opproptypes';
import { getContextRoot } from '../../routers/paths';
import {
  finnAktiveOppfolgingsdialoger,
  finnTidligereOppfolgingsdialoger,
  harAktivOppfolgingsdialog,
  harTidligereOppfolgingsdialoger,
} from '../../utils/oppfolgingsplanUtils';
import OppfolgingsplanerOpprett from './opprett/OppfolgingsplanerOpprett';
import OppfolgingsplanerIngenplan from './opprett/OppfolgingsplanerIngenplan';
import OppfolgingsplanFilm from '../oppfolgingsplaner/OppfolgingsplanFilm';
import OppfolgingsdialogTeasere from '../oppfolgingsplaner/OppfolgingsdialogTeasere';
import SamtalestottePanel from '../../SamtalestottePanel/SamtalestottePanel';

const texts = {
  teaserActivePlan: {
    title: 'Aktiv oppfølgingsplan',
  },
  teaserOutdatedPlaner: {
    title: 'Tidligere oppfølgingsplaner',
  },
};

class OppfolgingsdialogerVisning extends Component {
  constructor() {
    super();
    this.state = {
      visOppfolgingsdialogOpprett: false,
    };
    this.visOppfolgingsdialogOpprett = this.visOppfolgingsdialogOpprett.bind(this);
  }

  visOppfolgingsdialogOpprett(vis) {
    this.setState({
      visOppfolgingsdialogOpprett: vis,
    });
  }

  render() {
    const {
      oppfolgingsdialoger,
      narmestelederId,
      kopierOppfolgingsdialog,
      opprettOppfolgingsdialog,
      orgnummer,
    } = this.props;
    return (
      <div>
        {this.state.visOppfolgingsdialogOpprett && (
          <OppfolgingsplanerOpprett
            oppfolgingsdialoger={oppfolgingsdialoger}
            opprett={opprettOppfolgingsdialog}
            kopier={kopierOppfolgingsdialog}
            visOppfolgingsdialogOpprett={this.visOppfolgingsdialogOpprett}
          />
        )}
        {oppfolgingsdialoger.length > 0 && harAktivOppfolgingsdialog(oppfolgingsdialoger) && (
          <OppfolgingsdialogTeasere
            oppfolgingsdialoger={finnAktiveOppfolgingsdialoger(oppfolgingsdialoger)}
            tittel={texts.teaserActivePlan.title}
            id="OppfolgingsdialogTeasereAG"
            rootUrlPlaner={`${getContextRoot()}/${narmestelederId}`}
          />
        )}

        {(oppfolgingsdialoger.length === 0 || !harAktivOppfolgingsdialog(oppfolgingsdialoger)) && (
          <div className="blokk--l">
            <OppfolgingsplanerIngenplan
              oppfolgingsdialoger={oppfolgingsdialoger}
              opprett={opprettOppfolgingsdialog}
              visOppfolgingsdialogOpprett={this.visOppfolgingsdialogOpprett}
            />
          </div>
        )}

        {oppfolgingsdialoger.length > 0 && harTidligereOppfolgingsdialoger(oppfolgingsdialoger) && (
          <div>
            <OppfolgingsdialogTeasere
              oppfolgingsdialoger={finnTidligereOppfolgingsdialoger(oppfolgingsdialoger)}
              harTidligerOppfolgingsdialoger
              tittel={texts.teaserOutdatedPlaner.title}
              id="OppfolgingsdialogTeasereAG"
              rootUrlPlaner={`${getContextRoot()}/${narmestelederId}`}
            />
          </div>
        )}
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <SamtalestottePanel orgnummer={orgnummer} />
        <OppfolgingsplanFilm />
      </div>
    );
  }
}

OppfolgingsdialogerVisning.propTypes = {
  narmestelederId: PropTypes.string,
  oppfolgingsdialoger: PropTypes.arrayOf(opProptypes.oppfolgingsplanPt),
  kopierOppfolgingsdialog: PropTypes.func,
  opprettOppfolgingsdialog: PropTypes.func,
  orgnummer: PropTypes.string,
};

export default OppfolgingsdialogerVisning;
