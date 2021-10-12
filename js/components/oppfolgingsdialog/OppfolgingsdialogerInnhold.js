import React from 'react';
import PropTypes from 'prop-types';
import Sidetopp from '../Sidetopp';
import { finnGodkjentedialogerAvbruttAvMotpartSidenSistInnlogging } from '../../utils/oppfolgingsplanUtils';
import { oppfolgingsplanPt } from '../../proptypes/opproptypes';
import OppfolgingsdialogVisning from './OppfolgingsdialogerVisning';
import OppfolgingsdialogerInfoPersonvern from './OppfolgingsdialogerInfoPersonvern';
import AvbruttPlanNotifikasjonBoksAdvarsel from './godkjennplan/godkjentplan/AvbruttPlanNotifikasjonBoksAdvarsel';

const texts = {
  pageTitle: 'Oppfølgingsplaner',
};

const OppfolgingsdialogerInnhold = ({
  oppfolgingsdialoger,
  narmestelederId,
  kopierOppfolgingsdialog,
  opprettOppfolgingsdialog,
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
        narmestelederId={narmestelederId}
        oppfolgingsdialoger={oppfolgingsdialoger}
        kopierOppfolgingsdialog={kopierOppfolgingsdialog}
        opprettOppfolgingsdialog={opprettOppfolgingsdialog}
      />
    </div>
  );
};
OppfolgingsdialogerInnhold.propTypes = {
  narmestelederId: PropTypes.string,
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
  kopierOppfolgingsdialog: PropTypes.func,
  opprettOppfolgingsdialog: PropTypes.func,
};

export default OppfolgingsdialogerInnhold;
