import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Alertstripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { delMedFastlegePt, delmednavPt, oppfolgingsplanPt } from '../../../../proptypes/opproptypes';
import FadingIconWithText from './FadingIconWithText';

const texts = {
  shareWithNAVError: 'Noe gikk feil da du prøvde å dele planen. Prøv igjen om litt.',
  shareWithFastlegeError: `
        Du får dessverre ikke delt denne planen med legen herfra. Det kan hende legen ikke kan ta imot elektroniske meldinger.
        I dette tilfellet må dere laste ned og skrive ut planen slik at dere får delt den med legen manuelt.
    `,
  buttonShareWithNAV: 'Del med NAV',
  sharedWithNAV: 'Planen er delt med NAV',
  buttonShareWithFastlege: 'Del med fastlegen',
  sharedWithFastlege: 'Planen er delt med fastlegen',
};

export const delingFeiletNav = (delmednav) => {
  return delmednav.sendingFeilet;
};

export const delingFeiletFastlege = (fastlegeDeling) => {
  return fastlegeDeling.sendingFeilet;
};

export const textSharePlanFailed = (delmednav) => {
  if (delingFeiletNav(delmednav)) {
    return texts.shareWithNAVError;
  }
  return texts.shareWithFastlegeError;
};

export const isGodkjentPlanDelKnapperAvailable = (oppfolgingsplan) => {
  return !(oppfolgingsplan.godkjentPlan.deltMedFastlege && oppfolgingsplan.godkjentPlan.deltMedNAV);
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const GodkjentPlanDelKnapper = ({ oppfolgingsplan, delmednav, delMedNavFunc, fastlegeDeling, delMedFastlege }) => {
  const [showFadingIconWithText, setShowFadingIconWithText] = useState(false);

  const prevProp = usePrevious(delmednav.sendt);

  useEffect(() => {
    if (prevProp === false && delmednav.sendt) {
      setShowFadingIconWithText(true);
    }
  }, [delmednav.sendt]);

  return (
    <div>
      <div className="buttonColumn">
        {!oppfolgingsplan.godkjentPlan.deltMedNAV && (
          <Knapp
            className="buttonElement"
            mini
            disabled={delmednav.sender}
            spinner={delmednav.sender}
            onClick={() => {
              delMedNavFunc(oppfolgingsplan.id, oppfolgingsplan.arbeidstaker.fnr);
            }}
          >
            {texts.buttonShareWithNAV}
          </Knapp>
        )}
        {showFadingIconWithText && <FadingIconWithText text={texts.sharedWithNAV} />}
        {!oppfolgingsplan.godkjentPlan.deltMedFastlege && (
          <Knapp
            className="buttonElement"
            mini
            disabled={fastlegeDeling.sender}
            spinner={fastlegeDeling.sender}
            onClick={() => {
              delMedFastlege(oppfolgingsplan.id, oppfolgingsplan.arbeidstaker.fnr);
            }}
          >
            {texts.buttonShareWithFastlege}
          </Knapp>
        )}
        {fastlegeDeling.sendt && <FadingIconWithText text={texts.sharedWithFastlege} />}
      </div>

      {(delingFeiletNav(delmednav) || delingFeiletFastlege(fastlegeDeling)) && (
        <Alertstripe className="alertstripe--notifikasjonboks" type="advarsel" fylt>
          {textSharePlanFailed(delmednav)}
        </Alertstripe>
      )}
    </div>
  );
};

GodkjentPlanDelKnapper.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
  delmednav: delmednavPt,
  fastlegeDeling: delMedFastlegePt,
  delMedNavFunc: PropTypes.func,
  delMedFastlege: PropTypes.func,
};

export default GodkjentPlanDelKnapper;
