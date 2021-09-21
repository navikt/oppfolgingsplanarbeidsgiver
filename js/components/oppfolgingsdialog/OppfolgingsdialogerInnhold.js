import React from 'react';
import PropTypes from 'prop-types';
import Sidetopp from '../Sidetopp';
import { finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging } from '../../utils/oppfolgingsplanUtils';
import { oppfolgingsplanPt } from '../../proptypes/opproptypes';
import OppfolgingsdialogVisning from './OppfolgingsdialogerVisning';
import OppfolgingsdialogerInfoPersonvern from './OppfolgingsdialogerInfoPersonvern';
import AvbruttPlanNotifikasjonBoksAdvarsel from './godkjennplan/godkjentplan/AvbruttPlanNotifikasjonBoksAdvarsel';
import { sykmeldt as sykmeldtPt } from '../../shapes';

const texts = {
  pageTitle: 'Oppfølgingsplaner',
};

const OppfolgingsdialogerInnhold = ({
  oppfolgingsdialoger,
  koblingId,
  kopierOppfolgingsdialog,
  opprettOppfolgingsdialog,
  sykmeldt,
}) => {
  const planerAvbruttAvMotpartSidenSistInnlogging = finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging(
    oppfolgingsdialoger
  );

  return (
    <div>
      <Sidetopp tittel={texts.pageTitle} />
      <OppfolgingsdialogerInfoPersonvern />
      {planerAvbruttAvMotpartSidenSistInnlogging.length > 0 && (
        <AvbruttPlanNotifikasjonBoksAdvarsel
          motpartnavn={planerAvbruttAvMotpartSidenSistInnlogging[0].arbeidstaker.navn}
        />
      )}
      <OppfolgingsdialogVisning
        koblingId={koblingId}
        oppfolgingsdialoger={oppfolgingsdialoger}
        kopierOppfolgingsdialog={kopierOppfolgingsdialog}
        opprettOppfolgingsdialog={opprettOppfolgingsdialog}
        orgnummer={sykmeldt.orgnummer}
      />
    </div>
  );
};
OppfolgingsdialogerInnhold.propTypes = {
  koblingId: PropTypes.string,
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
  kopierOppfolgingsdialog: PropTypes.func,
  opprettOppfolgingsdialog: PropTypes.func,
  sykmeldt: PropTypes.shape(sykmeldtPt),
};

export default OppfolgingsdialogerInnhold;
