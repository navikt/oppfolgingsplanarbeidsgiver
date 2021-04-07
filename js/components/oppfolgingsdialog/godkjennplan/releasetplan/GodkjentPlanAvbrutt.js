import React from 'react';
import PropTypes from 'prop-types';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import { finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt } from '../../../../utils/oppfolgingsplanUtils';
import { textBothApprovedOppfolgingsplan } from '../../../../utils/tekstUtils';
import GodkjentPlanAvbruttTidspunkt from './GodkjentPlanAvbruttTidspunkt';
import GodkjentPlanDelKnapper, { isGodkjentPlanDelKnapperAvailable } from './GodkjentPlanDelKnapper';
import PlanEkspanderbar from '../PlanEkspanderbar';
import { delMedFastlegePt, delmednavPt, oppfolgingsplanPt } from '../../../../proptypes/opproptypes';
import GodkjentPlanDeltBekreftelse from './GodkjentPlanDeltBekreftelse';
import TextForcedApprovedOppfolgingsplan from './TextForcedApprovedOppfolgingsplan';
import { ButtonDownload } from './GodkjentPlanHandlingKnapper';

const texts = {
  linkActivePlan: 'Tilbake til den gjeldende utgave',
  title: 'Tidligere oppfølgingsplan',
  tvungenGodkjenning: 'Denne oppfølgingsplanen ble ferdigstilt uten godkjenning fra arbeidstakeren',
};

const GodkjentPlanAvbrutt = ({
  oppfolgingsdialog,
  oppfolgingsdialoger,
  delmednav,
  delMedNavFunc,
  fastlegeDeling,
  delMedFastlege,
  rootUrl,
  rootUrlPlaner,
}) => {
  const aktivPlan = finnNyOppfolgingsplanMedVirkshomhetEtterAvbrutt(
    oppfolgingsdialoger,
    oppfolgingsdialog.virksomhet.virksomhetsnummer
  );
  const godkjentPlan = oppfolgingsdialog.godkjentPlan;
  const arbeidstakerNavn = oppfolgingsdialog.arbeidstaker.navn;

  return (
    <div className="godkjentPlanAvbrutt">
      <div className="godkjentPlanAvbrutt_lenke">
        {aktivPlan && (
          <a className="lenke" href={`${rootUrlPlaner}/oppfolgingsplaner/${aktivPlan.id}`}>
            {texts.linkActivePlan}
          </a>
        )}
      </div>
      <OppfolgingsplanInnholdboks svgUrl={`${rootUrl}/img/svg/plan-avbrutt.svg`} svgAlt="" tittel={texts.title}>
        <div className="godkjentPlanAvbrutt">
          {!godkjentPlan.tvungenGodkjenning && <p>{textBothApprovedOppfolgingsplan(arbeidstakerNavn)}</p>}
          {godkjentPlan.tvungenGodkjenning && (
            <TextForcedApprovedOppfolgingsplan rootUrl={rootUrl} text={texts.tvungenGodkjenning} />
          )}

          <GodkjentPlanAvbruttTidspunkt
            rootUrl={rootUrl}
            oppfolgingsdialog={oppfolgingsdialog}
            gyldighetstidspunkt={oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt}
          />
          <GodkjentPlanDeltBekreftelse oppfolgingsplan={oppfolgingsdialog} />

          <PlanEkspanderbar oppfolgingsplan={oppfolgingsdialog} />
          {isGodkjentPlanDelKnapperAvailable(oppfolgingsdialog) && (
            <GodkjentPlanDelKnapper
              className="godkjentPlanAvbruttDelKnapper"
              oppfolgingsplan={oppfolgingsdialog}
              delmednav={delmednav}
              delMedNavFunc={delMedNavFunc}
              fastlegeDeling={fastlegeDeling}
              delMedFastlege={delMedFastlege}
            />
          )}
          <div className="knapperad knapperad--justervenstre">
            <ButtonDownload oppfolgingsplan={oppfolgingsdialog} />
          </div>
        </div>
      </OppfolgingsplanInnholdboks>
    </div>
  );
};

GodkjentPlanAvbrutt.propTypes = {
  oppfolgingsdialog: oppfolgingsplanPt,
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
  delmednav: delmednavPt,
  delMedNavFunc: PropTypes.func,
  fastlegeDeling: delMedFastlegePt,
  delMedFastlege: PropTypes.func,
  rootUrl: PropTypes.string,
  rootUrlPlaner: PropTypes.string,
};

export default GodkjentPlanAvbrutt;
