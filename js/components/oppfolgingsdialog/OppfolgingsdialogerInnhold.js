import React from 'react';
import PropTypes from 'prop-types';
import Sidetopp from '../Sidetopp';
import { finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging } from '../../utils/oppfolgingsplanUtils';
import { oppfolgingsplanPt } from '../../proptypes/opproptypes';
import OppfolgingsdialogVisning from './OppfolgingsdialogerVisning';
import OppfolgingsdialogerInfoPersonvern from './OppfolgingsdialogerInfoPersonvern';
import NotifikasjonBoksAdvarsel from './godkjennplan/godkjentplan/NotifikasjonBoksAdvarsel';

const texts = {
    pageTitle: 'Oppfølgingsplaner',
    alertstripeDelMedNAVInfo: 'Det er for tiden ikke mulig å dele oppfølgingsplaner med fastlegen ' +
        'på grunn av endringer i registre utenfor NAV som ikke er varslet. Vi jobber med å tilpasse våre systemer.',
};

const textAlertstripeCancelledPlan = (counterPart) => {
    return `${counterPart} har startet en ny oppfølgingsplan. Den gamle er arkivert.`;
};

const alertstripeTexts = (cancelledPlaner) => {
    const alertTexts = [];

    alertTexts.push(texts.alertstripeDelMedNAVInfo);

    if (cancelledPlaner.length > 0) {
        alertTexts.push(textAlertstripeCancelledPlan(cancelledPlaner[0].arbeidstaker.navn));
    }

    return alertTexts;
};

const OppfolgingsdialogerInnhold = ({
    oppfolgingsdialoger,
    koblingId,
    kopierOppfolgingsdialog,
    opprettOppfolgingsdialog,
}) => {
    const planerAvbruttAvMotpartSidenSistInnlogging = finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(oppfolgingsdialoger);
    const allAlertstripeTexts = alertstripeTexts(planerAvbruttAvMotpartSidenSistInnlogging);

    return (
        <div>
            {
                allAlertstripeTexts.length > 0 && <NotifikasjonBoksAdvarsel
                    texts={allAlertstripeTexts}
                />
            }
            <Sidetopp tittel={texts.pageTitle} />
            <OppfolgingsdialogerInfoPersonvern />
            <OppfolgingsdialogVisning
                koblingId={koblingId}
                oppfolgingsdialoger={oppfolgingsdialoger}
                kopierOppfolgingsdialog={kopierOppfolgingsdialog}
                opprettOppfolgingsdialog={opprettOppfolgingsdialog}
            />
        </div>
    );
};
OppfolgingsdialogerInnhold.propTypes = {
    koblingId: PropTypes.string,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
    kopierOppfolgingsdialog: PropTypes.func,
    opprettOppfolgingsdialog: PropTypes.func,
};

export default OppfolgingsdialogerInnhold;
