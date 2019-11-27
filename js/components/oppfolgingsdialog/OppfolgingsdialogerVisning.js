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
            koblingId,
            kopierOppfolgingsdialog,
            opprettOppfolgingsdialog,
        } = this.props;
        return (<div>
            { this.state.visOppfolgingsdialogOpprett &&
            <OppfolgingsplanerOpprett
                oppfolgingsdialoger={oppfolgingsdialoger}
                opprett={opprettOppfolgingsdialog}
                kopier={kopierOppfolgingsdialog}
                visOppfolgingsdialogOpprett={this.visOppfolgingsdialogOpprett}
            />
            }
            { oppfolgingsdialoger.length > 0 && harAktivOppfolgingsdialog(oppfolgingsdialoger) &&
            <OppfolgingsdialogTeasere
                oppfolgingsdialoger={finnAktiveOppfolgingsdialoger(oppfolgingsdialoger)}
                tittel={texts.teaserActivePlan.title}
                id="OppfolgingsdialogTeasereAG"
                rootUrlPlaner={`${getContextRoot()}/${koblingId}`}
                rootUrl={getContextRoot()}
            />
            }

            { (oppfolgingsdialoger.length === 0 || !harAktivOppfolgingsdialog(oppfolgingsdialoger)) &&
            <div className="blokk--l">
                <OppfolgingsplanerIngenplan
                    oppfolgingsdialoger={oppfolgingsdialoger}
                    opprett={opprettOppfolgingsdialog}
                    visOppfolgingsdialogOpprett={this.visOppfolgingsdialogOpprett}
                />
            </div>
            }

            { oppfolgingsdialoger.length > 0 && harTidligereOppfolgingsdialoger(oppfolgingsdialoger) &&
            <div>
                <OppfolgingsdialogTeasere
                    oppfolgingsdialoger={finnTidligereOppfolgingsdialoger(oppfolgingsdialoger)}
                    harTidligerOppfolgingsdialoger
                    tittel={texts.teaserOutdatedPlaner.title}
                    id="OppfolgingsdialogTeasereAG"
                    rootUrlPlaner={`${getContextRoot()}/${koblingId}`}
                    rootUrl={getContextRoot()}
                    svgUrl={`${getContextRoot()}/img/svg/plan-godkjent.svg`}
                    svgAlt="OppfølgingsdialogTidligere"
                />
            </div>
            }
            <OppfolgingsplanFilm />
        </div>);
    }
}
OppfolgingsdialogerVisning.propTypes = {
    koblingId: PropTypes.string,
    oppfolgingsdialoger: PropTypes.arrayOf(opProptypes.oppfolgingsdialogPt),
    kopierOppfolgingsdialog: PropTypes.func,
    opprettOppfolgingsdialog: PropTypes.func,
};

export default OppfolgingsdialogerVisning;
