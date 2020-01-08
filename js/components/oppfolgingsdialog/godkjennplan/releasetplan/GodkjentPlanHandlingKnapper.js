import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../../../proptypes/opproptypes';
import { erGyldigDatoIFortiden } from '../../../../utils/datoUtils';
import { STATUS } from '../../../../konstanter';
import { API_NAVN, hentSyfoapiUrl } from '../../../../gateway-api';
import InnholdboksPilTidligerePlaner from './InnholdboksPilTidligerePlaner';

const texts = {
    buttonEndre: 'Gjør endringer',
    buttonUtgaver: 'Se tidligere utgaver',
    buttonDownload: 'Last ned',
};

export const ButtonDownload = ({ oppfolgingsplan }) => {
    return (
        <div className="knapperad__element godkjentPlanDelKnapper__lastNed">
            <a
                className="lenke"
                href={`${hentSyfoapiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/dokument/${oppfolgingsplan.id}/`}
                download="oppfølgingsplan"
            >
                {texts.buttonDownload}
            </a>
        </div>
    );
};
ButtonDownload.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
};

class GodkjentPlanHandlingKnapper extends Component {
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
            oppfolgingsplan,
            apneBekreftelse,
            rootUrlPlaner,
        } = this.props;
        return (
            <div>
                <ul className="godkjentPlanKnapper">
                    { oppfolgingsplan.avbruttPlanListe.length > 0 && <li>
                        <div
                            className={`godkjentPlanKnapper__knapp godkjentPlanKnapper__knapp--tidligere ${this.state.visning === 'tidligereUtgaver'
                                ? 'godkjentPlanKnapper__knapp--aktiv'
                                : ''}`}>
                            <button
                                className="lenke"
                                onClick={() => {
                                    this.toggleVisning('tidligereUtgaver');
                                }}>
                                {texts.buttonUtgaver}
                            </button>
                        </div>
                        { this.state.visning === 'tidligereUtgaver' && <InnholdboksPilTidligerePlaner
                            oppfolgingsplan={oppfolgingsplan}
                            rootUrlPlaner={rootUrlPlaner}
                        />
                        }
                    </li>
                    }
                    { !erGyldigDatoIFortiden(oppfolgingsplan.godkjentPlan.gyldighetstidspunkt.tom)
                    && oppfolgingsplan.status !== STATUS.AVBRUTT &&
                        <li>
                            <div className="godkjentPlanKnapper__knapp godkjentPlanKnapper__knapp--endre">
                                <button
                                    className="lenke"
                                    onClick={() => {
                                        apneBekreftelse();
                                    }}>
                                    {texts.buttonEndre}
                                </button>
                            </div>
                        </li>
                    }
                    <li>
                        <ButtonDownload
                            oppfolgingsplan={oppfolgingsplan}
                        />
                    </li>
                </ul>
            </div>);
    }
}

GodkjentPlanHandlingKnapper.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    apneBekreftelse: PropTypes.func,
    rootUrlPlaner: PropTypes.string,
};

export default GodkjentPlanHandlingKnapper;
