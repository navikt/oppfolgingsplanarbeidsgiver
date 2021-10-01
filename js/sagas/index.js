import { all } from 'redux-saga/effects';

import arbeidsforholdSagas from './oppfolgingsplan/arbeidsforholdSagas';
import arbeidsoppgaveSagas from './oppfolgingsplan/arbeidsoppgaveSagas';
import avbrytdialogSagas from './oppfolgingsplan/avbrytdialogSagas';
import delMedFastlegeSagas from './oppfolgingsplan/delMedFastlegeSagas';
import delMedNavSagas from './oppfolgingsplan/delMedNavSagas';
import kommentarSagas from './oppfolgingsplan/kommentarSagas';
import kontaktinfoSagas from './oppfolgingsplan/kontaktinfoSagas';
import kopierOppfolgingsplanSagas from './oppfolgingsplan/kopierOppfolgingsplanSagas';
import naermesteLederSagas from './oppfolgingsplan/naermestelederSagas';
import nullstillGodkjenningSagas from './oppfolgingsplan/nullstillGodkjenningSagas';
import oppfolgingsdialogerSagas from './oppfolgingsplan/oppfolgingsplanerSagas';
import personSagas from './oppfolgingsplan/personSagas';
import samtykkeSagas from './oppfolgingsplan/samtykkeSagas';
import settDialogSagas from './oppfolgingsplan/settDialogSagas';
import tilgangSagas from './oppfolgingsplan/tilgangSagas';
import tiltakSagas from './oppfolgingsplan/tiltakSagas';
import virksomhetSagas from './oppfolgingsplan/virksomhetSagas';
import sykmeldteSagas from './sykmeldteSagas';

export default function* rootSaga() {
  yield all([
    arbeidsforholdSagas(),
    sykmeldteSagas(),
    oppfolgingsdialogerSagas(),
    avbrytdialogSagas(),
    nullstillGodkjenningSagas(),
    tilgangSagas(),
    arbeidsoppgaveSagas(),
    kommentarSagas(),
    kopierOppfolgingsplanSagas(),
    samtykkeSagas(),
    tiltakSagas(),
    settDialogSagas(),
    delMedFastlegeSagas(),
    delMedNavSagas(),
    virksomhetSagas(),
    personSagas(),
    kontaktinfoSagas(),
    naermesteLederSagas(),
  ]);
}
