import React from 'react';
import PropTypes from 'prop-types';
import Sidetopp from '../Sidetopp';
import {
    finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging,
    harForrigeNaermesteLeder,
    harNaermesteLeder,
} from '../../utils/oppfolgingsplanUtils';
import { oppfolgingsdialogPt } from '../../proptypes/opproptypes';
import OppfolgingsdialogVisning from './OppfolgingsdialogerVisning';
import OppfolgingsdialogerInfoPersonvern from './OppfolgingsdialogerInfoPersonvern';
import AvbruttPlanNotifikasjonBoksAdvarsel from './godkjennplan/godkjentplan/AvbruttPlanNotifikasjonBoksAdvarsel';
import NyNaermestelederInfoboks from '../oppfolgingsplaner/NyNaermestelederInfoboks';

const texts = {
    pageTitle: 'Oppfølgingsplaner',
};

const finnOppfolgingsplanMedFoersteInnloggingSidenNyNaermesteLeder = (oppfolgingsplaner) => {
    return oppfolgingsplaner.filter((oppfolgingsplan) => {
        return harForrigeNaermesteLeder(oppfolgingsplan) &&
            harNaermesteLeder(oppfolgingsplan) &&
            (!oppfolgingsplan.arbeidsgiver.naermesteLeder.sistInnlogget ||
                new Date(oppfolgingsplan.arbeidsgiver.naermesteLeder.sistInnlogget).toISOString().split('T')[0]
                < new Date(oppfolgingsplan.arbeidsgiver.naermesteLeder.aktivFom).toISOString().split('T')[0]);
    })[0];
};

const OppfolgingsdialogerInnhold = ({
    oppfolgingsdialoger,
    koblingId,
    kopierOppfolgingsdialog,
    opprettOppfolgingsdialog,
    bekreftetNyNaermesteLeder,
    bekreftNyNaermesteLeder,
    slettSykmeldt,
}) => {
    let panel;
    const planerAvbruttAvMotpartSidenSistInnlogging = finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(oppfolgingsdialoger);
    const oppfolgingsplanMedNyNaermesteLeder = finnOppfolgingsplanMedFoersteInnloggingSidenNyNaermesteLeder(oppfolgingsdialoger);

    if (!bekreftetNyNaermesteLeder && oppfolgingsplanMedNyNaermesteLeder) {
        panel = (<NyNaermestelederInfoboks
            oppfolgingsdialog={oppfolgingsplanMedNyNaermesteLeder}
            avkreftNyNaermesteleder={slettSykmeldt}
            bekreftNyNaermesteLeder={bekreftNyNaermesteLeder}
        />);
    } else {
        panel = (<OppfolgingsdialogVisning
            koblingId={koblingId}
            oppfolgingsdialoger={oppfolgingsdialoger}
            kopierOppfolgingsdialog={kopierOppfolgingsdialog}
            opprettOppfolgingsdialog={opprettOppfolgingsdialog}
        />);
    }
    return (
        <div>
            <Sidetopp tittel={texts.pageTitle} />
            <OppfolgingsdialogerInfoPersonvern />
            {
                planerAvbruttAvMotpartSidenSistInnlogging.length > 0 && <AvbruttPlanNotifikasjonBoksAdvarsel
                    motpartnavn={planerAvbruttAvMotpartSidenSistInnlogging[0].arbeidstaker.navn}
                />
            }
            {panel}
        </div>
    );
};
OppfolgingsdialogerInnhold.propTypes = {
    bekreftetNyNaermesteLeder: PropTypes.bool,
    koblingId: PropTypes.string,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsdialogPt),
    bekreftNyNaermesteLeder: PropTypes.func,
    kopierOppfolgingsdialog: PropTypes.func,
    opprettOppfolgingsdialog: PropTypes.func,
    slettSykmeldt: PropTypes.func,
};

export default OppfolgingsdialogerInnhold;
