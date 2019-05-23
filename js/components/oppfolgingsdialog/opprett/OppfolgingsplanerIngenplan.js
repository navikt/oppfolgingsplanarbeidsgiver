import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    keyValue,
} from 'digisyfo-npm';
import { proptypes as oppfolgingProptypes } from 'oppfolgingsdialog-npm';
import OppfolgingsplanerIngenplanKnapper from './OppfolgingsplanerIngenplanKnapper';

const OppfolgingsplanerIngenplan = (
    {
        ledetekster,
        oppfolgingsdialoger,
        opprett,
        visOppfolgingsdialogOpprett,
        rootUrl,
    }) => {
    return (<div className="oppfolgingsdialogerIngenplan">
        <header className="oppfolgingsdialogerIngenplan__header">
            <h2>{getLedetekst('oppfolgingsdialoger.oppfolgingsdialoger.header.tittel')}</h2>
        </header>
        <div className="oppfolgingsdialogerIngenplan__blokk">
            <img alt="tom-plan" src={`${rootUrl}/img/svg/oppfolgingsdialog-tom.svg`} />
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
                        ledetekster={ledetekster}
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
    ledetekster: keyValue,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    opprett: PropTypes.func,
    visOppfolgingsdialogOpprett: PropTypes.func,
    rootUrl: PropTypes.string,
};

export default OppfolgingsplanerIngenplan;
