import { ledeteksterSagas, togglesSagas, sykeforlopsPerioderSagas } from 'digisyfo-npm';
import {
    oppfolgingsdialogerAgSagas as oppfolgingsdialogerSagas,
    settDialogSagas,
    tilgangAgSagas as tilgangSagas,
    arbeidsoppgaveSagas,
    kommentarSagas,
    kopierOppfolgingsdialogSagas,
    samtykkeSagas,
    tiltakSagas,
    nullstillGodkjenningSagas,
    dokumentSagas,
    avbrytdialogSagas,
    arbeidsforholdSagas,
    delMedFastlegeSagas,
    delMedNavSagas,
    forespoerRevideringSagas,
    virksomhetSagas,
    personSagas,
    kontaktinfoSagas,
    naermesteLederSagas,
} from 'oppfolgingsdialog-npm';
import sykmeldteSagas from './sykmeldteSagas';
import sykmeldingerSagas from './sykmeldingerSagas';

export default function* rootSaga() {
    yield [
        ledeteksterSagas(),
        arbeidsforholdSagas(),
        sykmeldteSagas(),
        sykmeldingerSagas(),
        oppfolgingsdialogerSagas(),
        avbrytdialogSagas(),
        nullstillGodkjenningSagas(),
        togglesSagas(),
        tilgangSagas(),
        arbeidsoppgaveSagas(),
        kommentarSagas(),
        kopierOppfolgingsdialogSagas(),
        samtykkeSagas(),
        tiltakSagas(),
        dokumentSagas(),
        settDialogSagas(),
        delMedFastlegeSagas(),
        delMedNavSagas(),
        forespoerRevideringSagas(),
        virksomhetSagas(),
        personSagas(),
        kontaktinfoSagas(),
        naermesteLederSagas(),
        sykeforlopsPerioderSagas(),
    ];
}

