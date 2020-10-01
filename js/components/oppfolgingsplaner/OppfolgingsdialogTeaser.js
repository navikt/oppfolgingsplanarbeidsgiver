import React from 'react';
import PropTypes from 'prop-types';
import { EtikettFokus } from 'nav-frontend-etiketter';
import LenkepanelBase from 'nav-frontend-lenkepanel';
import * as opProptypes from '../../proptypes/opproptypes';
import {
    finnOppfolgingsdialogMotpartNavn,
    inneholderGodkjenninger,
    inneholderGodkjenningerAvArbeidsgiver,
} from '../../utils/oppfolgingsplanUtils';
import { hentPlanStatus } from '../../utils/teaserUtils';

const texts = {
    etiketter: {
        tilGodkjenning: 'Til godkjenning',
    },
};

export const TilGodkjenningStatus = ({ oppfolgingsplan }) => {
    return (inneholderGodkjenninger(oppfolgingsplan) &&
        !inneholderGodkjenningerAvArbeidsgiver(oppfolgingsplan) &&
        <EtikettFokus mini>{texts.etiketter.tilGodkjenning}</EtikettFokus>);
};
TilGodkjenningStatus.propTypes = {
    oppfolgingsplan: opProptypes.oppfolgingsplanPt,
};

const OppfolgingsdialogTeaser = (
    {
        oppfolgingsdialog,
        rootUrl,
        rootUrlPlaner,
    }) => {
    const planStatus = hentPlanStatus(oppfolgingsdialog);
    return (
        <LenkepanelBase
            href={`${rootUrlPlaner}/oppfolgingsplaner/${oppfolgingsdialog.id}`}
            border>
            <div className="inngangspanel">
                <span className="oppfolgingsplanInnhold__ikon">
                    <img alt="plan" src={`${rootUrl}/img/svg/${planStatus.img}`} />
                </span>
                <div className="inngangspanel__innhold">
                    <header className="inngangspanel__header">
                        <h3 className="js-title" id={`oppfolgingsdialog-header-${oppfolgingsdialog.id}`}>
                            <span className="inngangspanel__tittel">
                                {finnOppfolgingsdialogMotpartNavn(oppfolgingsdialog)}
                            </span>
                        </h3>
                    </header>
                    {typeof planStatus.tekst === 'object'
                        ? <p className="inngangspanel__tekst" dangerouslySetInnerHTML={planStatus.tekst} />
                        : <p className="inngangspanel__tekst" dangerouslySetInnerHTML={{ __html: planStatus.tekst }} />
                    }
                    <TilGodkjenningStatus oppfolgingsplan={oppfolgingsdialog} />
                </div>
            </div>
        </LenkepanelBase>);
};

OppfolgingsdialogTeaser.propTypes = {
    oppfolgingsdialog: opProptypes.oppfolgingsplanPt,
    rootUrl: PropTypes.string,
    rootUrlPlaner: PropTypes.string,
};

export default OppfolgingsdialogTeaser;
