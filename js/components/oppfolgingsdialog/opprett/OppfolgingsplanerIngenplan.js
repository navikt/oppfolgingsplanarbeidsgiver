import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { getContextRoot } from '../../../routers/paths';
import { oppfolgingsdialogPt } from '../../../proptypes/opproptypes';
import OppfolgingsplanerIngenplanKnapper from './OppfolgingsplanerIngenplanKnapper';

const OppfolgingsplanerIngenplan = (
    {
        oppfolgingsdialoger,
        opprett,
        visOppfolgingsdialogOpprett,
    }) => {
    return (<div className="oppfolgingsdialogerIngenplan">
        <header className="oppfolgingsdialogerIngenplan__header">
            <h2>{getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.header.tittel')}</h2>
        </header>
        <div className="oppfolgingsdialogerIngenplan__blokk">
            <img alt="tom-plan" src={`${getContextRoot()}/img/svg/oppfolgingsdialog-tom.svg`} />
            <div className="inngangspanel__innhold">
                <header className="inngangspanel__header">
                    <h3 className="js-title">
                        <span className="inngangspanel__tittel">
                            {getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.ingenplan.tittel')}
                        </span>
                    </h3>
                </header>
                <div>
                    <p className="oppfolgingsdialoger__start_tekst">
                        {getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.ingenplan.tekst')}
                    </p>
                    <OppfolgingsplanerIngenplanKnapper
                        oppfolgingsdialoger={oppfolgingsdialoger}
                        opprett={opprett}
                        visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
                    />
                </div>
            </div>
        </div>
    </div>);
};

OppfolgingsplanerIngenplan.propTypes = {
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsdialogPt),
    opprett: PropTypes.func,
    visOppfolgingsdialogOpprett: PropTypes.func,
};

export default OppfolgingsplanerIngenplan;
