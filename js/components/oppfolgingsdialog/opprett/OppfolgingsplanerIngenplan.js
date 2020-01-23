import React from 'react';
import PropTypes from 'prop-types';
import { getContextRoot } from '../../../routers/paths';
import { oppfolgingsplanPt } from '../../../proptypes/opproptypes';
import OppfolgingsplanerIngenplanKnapper from './OppfolgingsplanerIngenplanKnapper';

const texts = {
    title: 'Aktiv oppfølgingsplan',
    panelTitle: 'Det finnes ingen aktiv oppfølgingsplan',
    panelInfo: 'Dere kan når som helst lage en ny plan. Da legger dere inn arbeidsoppgavene og noen forslag til hva som skal til for å klare dem.',
};

const OppfolgingsplanerIngenplan = (
    {
        oppfolgingsdialoger,
        opprett,
        visOppfolgingsdialogOpprett,
    }) => {
    return (<div className="oppfolgingsdialogerIngenplan">
        <header className="oppfolgingsdialogerIngenplan__header">
            <h2>{texts.title}</h2>
        </header>
        <div className="oppfolgingsdialogerIngenplan__blokk">
            <img alt="tom-plan" src={`${getContextRoot()}/img/svg/oppfolgingsdialog-tom.svg`} />
            <div className="inngangspanel__innhold">
                <header className="inngangspanel__header">
                    <h3 className="js-title">
                        <span className="inngangspanel__tittel">
                            {texts.panelTitle}
                        </span>
                    </h3>
                </header>
                <div>
                    <p className="oppfolgingsdialoger__start_tekst">
                        {texts.panelInfo}
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
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
    opprett: PropTypes.func,
    visOppfolgingsdialogOpprett: PropTypes.func,
};

export default OppfolgingsplanerIngenplan;
