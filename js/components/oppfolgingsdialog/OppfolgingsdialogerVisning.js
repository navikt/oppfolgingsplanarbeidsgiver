import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst, keyValue } from 'digisyfo-npm';
import {
    OppfolgingsdialogTeasere,
    BRUKERTYPE,
    finnTidligereOppfolgingsdialoger,
    harTidligereOppfolgingsdialoger,
    finnAktiveOppfolgingsdialoger,
    harAktivOppfolgingsdialog,
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import { getContextRoot } from '../../routers/paths';
import OppfolgingsdialogerOpprett from './opprett/OppfolgingsdialogerOpprett';
import OppfolgingsdialogerIngenplanAG from './opprett/OppfolgingsdialogerIngenplanAG';
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
        return (
            <div>
                { this.state.visOppfolgingsdialogOpprett &&
                <OppfolgingsdialogerOpprett
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
                    <OppfolgingsdialogerIngenplanAG
                        ledetekster={ledetekster}
                        oppfolgingsdialoger={oppfolgingsdialoger}
                        opprett={opprettOppfolgingsdialog}
                        visOppfolgingsdialogOpprett={this.visOppfolgingsdialogOpprett}
                        rootUrl={getContextRoot()}
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
            </div>
        );
    }
}
OppfolgingsdialogerVisning.propTypes = {
    ledetekster: keyValue,
    koblingId: PropTypes.string,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    kopierOppfolgingsdialog: PropTypes.func,
    opprettOppfolgingsdialog: PropTypes.func,
};

export default OppfolgingsdialogerVisning;
