import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import {
    OppfolgingsdialogTeasere,
    BRUKERTYPE,
} from 'oppfolgingsdialog-npm';
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
import OppfolgingsdialogFilm from '../../filmer/OppfolgingsdialogFilm';

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
            ledetekster,
            oppfolgingsdialoger,
            koblingId,
            kopierOppfolgingsdialog,
            opprettOppfolgingsdialog,
        } = this.props;
        return (<div>
            { this.state.visOppfolgingsdialogOpprett &&
            <OppfolgingsplanerOpprett
                ledetekster={ledetekster}
                oppfolgingsdialoger={oppfolgingsdialoger}
                opprett={opprettOppfolgingsdialog}
                kopier={kopierOppfolgingsdialog}
                visOppfolgingsdialogOpprett={this.visOppfolgingsdialogOpprett}
            />
            }
            { oppfolgingsdialoger.length > 0 && harAktivOppfolgingsdialog(oppfolgingsdialoger) &&
            <OppfolgingsdialogTeasere
                ledetekster={ledetekster}
                oppfolgingsdialoger={finnAktiveOppfolgingsdialoger(oppfolgingsdialoger)}
                tittel={getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.header.tittel')}
                id="OppfolgingsdialogTeasereAG"
                brukerType={BRUKERTYPE.ARBEIDSGIVER}
                rootUrlPlaner={`${getContextRoot()}/${koblingId}`}
                rootUrl={getContextRoot()}
            />
            }

            { (oppfolgingsdialoger.length === 0 || !harAktivOppfolgingsdialog(oppfolgingsdialoger)) &&
            <div className="blokk--l">
                <OppfolgingsplanerIngenplan
                    ledetekster={ledetekster}
                    oppfolgingsdialoger={oppfolgingsdialoger}
                    opprett={opprettOppfolgingsdialog}
                    visOppfolgingsdialogOpprett={this.visOppfolgingsdialogOpprett}
                />
            </div>
            }

            { oppfolgingsdialoger.length > 0 && harTidligereOppfolgingsdialoger(oppfolgingsdialoger) &&
            <div>
                <OppfolgingsdialogTeasere
                    ledetekster={ledetekster}
                    oppfolgingsdialoger={finnTidligereOppfolgingsdialoger(oppfolgingsdialoger)}
                    harTidligerOppfolgingsdialoger
                    tittel={getLedetekst('oppfolgingsdialoger.tidligereplaner.tittel')}
                    id="OppfolgingsdialogTeasereAG"
                    brukerType={BRUKERTYPE.ARBEIDSGIVER}
                    rootUrlPlaner={`${getContextRoot()}/${koblingId}`}
                    rootUrl={getContextRoot()}
                    svgUrl={`${getContextRoot()}/img/svg/plan-godkjent.svg`}
                    svgAlt="OppfølgingsdialogTidligere"
                />
            </div>
            }
            <OppfolgingsdialogFilm />
        </div>);
    }
}
OppfolgingsdialogerVisning.propTypes = {
    ledetekster: keyValue,
    koblingId: PropTypes.string,
    oppfolgingsdialoger: PropTypes.arrayOf(opProptypes.oppfolgingsdialogPt),
    kopierOppfolgingsdialog: PropTypes.func,
    opprettOppfolgingsdialog: PropTypes.func,
};

export default OppfolgingsdialogerVisning;
