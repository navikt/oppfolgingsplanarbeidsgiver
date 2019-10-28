import {
    getLedetekst,
    getHtmlLedetekst,
} from '@navikt/digisyfo-npm';
import { STATUS } from '../konstanter';
import { finnSistEndretAvNavn } from './oppfolgingsplanUtils';
import { toDateMedMaanedNavn } from './datoUtils';

export const hentPlanStatus = (oppfolgingsdialog, ledetekster) => {
    const status = {
        tekst: '',
        img: '',
    };
    switch (oppfolgingsdialog.status) {
        case STATUS.UTDATERT:
            status.tekst = oppfolgingsdialog
                && oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt
                // eslint-disable-next-line max-len
                && `${toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.fom)} - ${toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom)}`;
            status.img = 'plan-godkjent.svg';
            break;
        case STATUS.AVBRUTT:
            status.tekst = getLedetekst('oppfolgingsdialoger.plan.status.avbrutt', ledetekster);
            status.img = 'plan-avbrutt.svg';
            break;
        case STATUS.UNDER_ARBEID:
            status.tekst = getHtmlLedetekst('oppfolgingsdialog.oppfolgingsdialogTeaser.underArbeid', ledetekster, {
                '%DATO%': toDateMedMaanedNavn(oppfolgingsdialog.sistEndretDato),
                '%BRUKERNAVN%': finnSistEndretAvNavn(oppfolgingsdialog),
            });
            status.img = 'oppfolgingsdialog-tom.svg';
            break;
        case STATUS.AKTIV:
            status.tekst = oppfolgingsdialog
                && oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt
                // eslint-disable-next-line max-len
                && `${toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.fom)} - ${toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom)}`;
            status.img = 'plan-godkjent.svg';
            break;
        default:
            status.tekst = oppfolgingsdialog
                && oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt
                // eslint-disable-next-line max-len
                && `${toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.fom)} - ${toDateMedMaanedNavn(oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt.tom)}`;
            status.img = 'plan-godkjent.svg';
            break;
    }
    return status;
};
