import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { Knapp } from 'nav-frontend-knapper';
import {
    delMedFastlegePt,
    delmednavPt,
    oppfolgingsdialogPt,
} from '../../../../proptypes/opproptypes';
import { erGyldigDatoIFortiden } from '../../../../utils/datoUtils';
import { STATUS } from '../../../../konstanter';
import InnholdboksPilTidligerePlaner from './InnholdboksPilTidligerePlaner';
import InnholdboksPilDelplan from './InnholdboksPilDelplan';

class GodkjentPlanKnapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visning: '',
        };
        this.toggleVisning = this.toggleVisning.bind(this);
    }

    toggleVisning(visning) {
        if (this.state.visning === visning) {
            this.setState({
                visning: '',
            });
        } else {
            this.setState({
                visning,
            });
        }
    }

    render() {
        const {
            oppfolgingsdialog,
            apneBekreftelse,
            delmednav,
            delMedNavFunc,
            fastlegeDeling,
            delMedFastlege,
            rootUrlPlaner,
        } = this.props;
        return (<ul className="godkjentPlanKnapper">
            { !erGyldigDatoIFortiden(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom)
            && oppfolgingsdialog.status !== STATUS.AVBRUTT &&
            <li>
                <div className="godkjentPlanKnapper__knapp godkjentPlanKnapper__knapp--endre">
                    <button
                        className="lenke"
                        onClick={() => {
                            apneBekreftelse();
                        }}>
                        {getLedetekst('oppfolgingsdialog.knapp.gjoer-endring')}
                    </button>
                </div>
            </li>
            }
            { oppfolgingsdialog.avbruttPlanListe.length > 0 && <li>
                <div
                    className={`godkjentPlanKnapper__knapp godkjentPlanKnapper__knapp--tidligere ${this.state.visning === 'tidligereUtgaver'
                        ? 'godkjentPlanKnapper__knapp--aktiv'
                        : ''}`}>
                    <button
                        className="lenke"
                        onClick={() => {
                            this.toggleVisning('tidligereUtgaver');
                        }}>
                        {getLedetekst('oppfolgingsdialog.knapp.tidligere-utgaver')}
                    </button>
                </div>
                { this.state.visning === 'tidligereUtgaver' && <InnholdboksPilTidligerePlaner
                    oppfolgingsdialog={oppfolgingsdialog}
                    rootUrlPlaner={rootUrlPlaner}
                />
                }
            </li>
            }
            <li>
                <div className={`godkjentPlanKnapper__knapp ${this.state.visning === 'deling' ? 'godkjentPlanKnapper__knapp--aktiv' : ''}`}>
                    <Knapp onClick={() => {
                        this.toggleVisning('deling');
                    }}>
                        {getLedetekst('oppfolgingsdialog.knapp.del-plan')}
                    </Knapp>
                </div>
                { this.state.visning === 'deling' && <InnholdboksPilDelplan
                    oppfolgingsdialog={oppfolgingsdialog}
                    delmednav={delmednav}
                    delMedNavFunc={delMedNavFunc}
                    fastlegeDeling={fastlegeDeling}
                    delMedFastlege={delMedFastlege}
                />
                }
            </li>
        </ul>);
    }
}

GodkjentPlanKnapper.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    apneBekreftelse: PropTypes.func,
    fastlegeDeling: delMedFastlegePt,
    delmednav: delmednavPt,
    delMedFastlege: PropTypes.func,
    delMedNavFunc: PropTypes.func,
    rootUrlPlaner: PropTypes.string,
};

export default GodkjentPlanKnapper;
