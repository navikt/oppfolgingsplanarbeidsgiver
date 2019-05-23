import React from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import {
    getLedetekst,
    keyValue,
    togglesPt,
} from 'digisyfo-npm';
import {
    AvbruttPlanNotifikasjonBoksAdvarsel,
    BRUKERTYPE,
    finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging,
    NyNaermestelederInfoboks,
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import Sidetopp from '../Sidetopp';
import { harForrigeNaermesteLeder, harNaermesteLeder } from '../../utils/oppfolgingsplanUtils';
import { getContextRoot } from '../../routers/paths';
import OppfolgingsdialogVisning from './OppfolgingsdialogerVisning';
import OppfolgingsdialogerInfoPersonvern from './OppfolgingsdialogerInfoPersonvern';

const finnOppfolgingsdialogMedFoersteInnloggingSidenNyNaermesteLeder = (oppfolgingsdialoger) => {
    return oppfolgingsdialoger.filter((oppfolgingsdialog) => {
        return harForrigeNaermesteLeder(oppfolgingsdialog) &&
            harNaermesteLeder(oppfolgingsdialog) &&
            (!oppfolgingsdialog.arbeidsgiver.naermesteLeder.sistInnlogget ||
                new Date(oppfolgingsdialog.arbeidsgiver.naermesteLeder.sistInnlogget).toISOString().split('T')[0]
                < new Date(oppfolgingsdialog.arbeidsgiver.naermesteLeder.aktivFom).toISOString().split('T')[0]);
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
    const dialogerAvbruttAvMotpartSidenSistInnlogging = finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(oppfolgingsdialoger, BRUKERTYPE.ARBEIDSGIVER);
    const oppfolgingsdialogMedNyNaermesteLeder = finnOppfolgingsdialogMedFoersteInnloggingSidenNyNaermesteLeder(oppfolgingsdialoger);

    if (!bekreftetNyNaermesteLeder && oppfolgingsdialogMedNyNaermesteLeder) {
        panel = (<NyNaermestelederInfoboks
            ledetekster={ledetekster}
            oppfolgingsdialog={oppfolgingsdialogMedNyNaermesteLeder}
            avkreftNyNaermesteleder={slettSykmeldt}
            bekreftNyNaermesteLeder={bekreftNyNaermesteLeder}
            brukerType={BRUKERTYPE.ARBEIDSGIVER}
            rootUrlImg={getContextRoot()}
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
            <OppfolgingsdialogerInfoPersonvern
                ledetekster={ledetekster}
            />
            {
                dialogerAvbruttAvMotpartSidenSistInnlogging.length > 0 && <AvbruttPlanNotifikasjonBoksAdvarsel
                    ledetekster={ledetekster}
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
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    bekreftNyNaermesteLeder: PropTypes.func,
    kopierOppfolgingsdialog: PropTypes.func,
    opprettOppfolgingsdialog: PropTypes.func,
    slettSykmeldt: PropTypes.func,
};

export default OppfolgingsdialogerInnhold;
