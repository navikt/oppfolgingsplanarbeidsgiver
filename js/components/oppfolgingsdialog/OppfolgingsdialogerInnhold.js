import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import {
    getLedetekst,
    keyValue,
    togglesPt,
} from 'digisyfo-npm';
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

const finnOppfolgingsdialogMedFoersteInnloggingSidenNyNaermesteLeder = (oppfolgingsplaner) => {
    return oppfolgingsplaner.filter((oppfolgingsplan) => {
        return harForrigeNaermesteLeder(oppfolgingsplan) &&
            harNaermesteLeder(oppfolgingsplan) &&
            (!oppfolgingsplan.arbeidsgiver.naermesteLeder.sistInnlogget ||
                new Date(oppfolgingsplan.arbeidsgiver.naermesteLeder.sistInnlogget).toISOString().split('T')[0]
                < new Date(oppfolgingsplan.arbeidsgiver.naermesteLeder.aktivFom).toISOString().split('T')[0]);
    })[0];
};

const OppfolgingsdialogerInnhold = ({
    ledetekster,
    oppfolgingsdialoger,
    toggles,
    koblingId,
    kopierOppfolgingsdialog,
    opprettOppfolgingsdialog,
    bekreftetNyNaermesteLeder,
    bekreftNyNaermesteLeder,
    slettSykmeldt,
}) => {
    let panel;
    const dialogerAvbruttAvMotpartSidenSistInnlogging = finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(oppfolgingsdialoger);
    const oppfolgingsdialogMedNyNaermesteLeder = finnOppfolgingsdialogMedFoersteInnloggingSidenNyNaermesteLeder(oppfolgingsdialoger);

    if (!bekreftetNyNaermesteLeder && oppfolgingsdialogMedNyNaermesteLeder) {
        panel = (<NyNaermestelederInfoboks
            oppfolgingsdialog={oppfolgingsdialogMedNyNaermesteLeder}
            avkreftNyNaermesteleder={slettSykmeldt}
            bekreftNyNaermesteLeder={bekreftNyNaermesteLeder}
        />);
    } else {
        panel = (<OppfolgingsdialogVisning
            ledetekster={ledetekster}
            koblingId={koblingId}
            oppfolgingsdialoger={oppfolgingsdialoger}
            kopierOppfolgingsdialog={kopierOppfolgingsdialog}
            opprettOppfolgingsdialog={opprettOppfolgingsdialog}
        />);
    }
    return (
        <div>
            { toggles.data['syfotoggles.send.oppfoelgingsdialog.fastlege'] === 'false' &&
            <Alertstripe
                className="alertstripe--notifikasjonboks"
                type="info"
                solid>
                {getLedetekst('oppfolgingsdialog.oppfolgingsdialoger.notifikasjonboks.generell-info')}
            </Alertstripe>
            }
            <Sidetopp tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
            <OppfolgingsdialogerInfoPersonvern />
            {
                dialogerAvbruttAvMotpartSidenSistInnlogging.length > 0 && <AvbruttPlanNotifikasjonBoksAdvarsel
                    motpartnavn={dialogerAvbruttAvMotpartSidenSistInnlogging[0].arbeidstaker.navn}
                />
            }
            {panel}
        </div>
    );
};
OppfolgingsdialogerInnhold.propTypes = {
    ledetekster: keyValue,
    toggles: togglesPt,
    bekreftetNyNaermesteLeder: PropTypes.bool,
    koblingId: PropTypes.string,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsdialogPt),
    bekreftNyNaermesteLeder: PropTypes.func,
    kopierOppfolgingsdialog: PropTypes.func,
    opprettOppfolgingsdialog: PropTypes.func,
    slettSykmeldt: PropTypes.func,
};

export default OppfolgingsdialogerInnhold;
