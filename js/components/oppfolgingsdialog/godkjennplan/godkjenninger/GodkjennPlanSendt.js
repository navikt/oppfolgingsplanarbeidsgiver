import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { oppfolgingsplanPt } from '../../../../proptypes/opproptypes';
import { finnNyesteGodkjenning } from '../../../../utils/oppfolgingsplanUtils';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';
import GodkjennPlanVenterInfo from '../GodkjennPlanVenterInfo';
import PlanEkspanderbar from '../PlanEkspanderbar';
import { HakeGronnLysImage } from '@/images/imageComponents';

const texts = {
  godkjennPlanSendt: {
    title: 'Sendt til godkjenning',
    buttonUndo: 'Avbryt planen',
  },
};

const CancelButtonStyled = styled.button`
  margin-top: 1em;
`;
export const CancelButton = ({ nullstillGodkjenning, oppfolgingsplan }) => {
  return (
    <CancelButtonStyled
      className="lenke lenke--avbryt"
      onClick={() => {
        nullstillGodkjenning(oppfolgingsplan.id, oppfolgingsplan.arbeidstaker.fnr);
      }}
    >
      {texts.godkjennPlanSendt.buttonUndo}
    </CancelButtonStyled>
  );
};
CancelButton.propTypes = {
  nullstillGodkjenning: PropTypes.func,
  oppfolgingsplan: oppfolgingsplanPt,
};

const GodkjenPlanSentBlokk = (arbeidstakerName) => {
  const text = 'Du har sendt en ny versjon av oppfølgingsplanen til din arbeidstaker ';
  return (
    <div className="blokk">
      <p>
        {text}
        <b>{arbeidstakerName}</b>
      </p>
    </div>
  );
};

const GodkjennPlanSendt = ({ oppfolgingsplan, nullstillGodkjenning, rootUrlPlaner }) => {
  return (
    <OppfolgingsplanInnholdboks svgUrl={HakeGronnLysImage} liteikon svgAlt="" tittel={texts.godkjennPlanSendt.title}>
      <div className="godkjennPlanSendt">
        {GodkjenPlanSentBlokk(oppfolgingsplan.arbeidstaker.navn)}

        <GodkjennPlanTidspunkt
          gyldighetstidspunkt={finnNyesteGodkjenning(oppfolgingsplan.godkjenninger).gyldighetstidspunkt}
        />

        <PlanEkspanderbar oppfolgingsplan={oppfolgingsplan} />
        <CancelButton nullstillGodkjenning={nullstillGodkjenning} oppfolgingsplan={oppfolgingsplan} />
        <GodkjennPlanVenterInfo />
        <TidligereAvbruttePlaner oppfolgingsdialog={oppfolgingsplan} rootUrlPlaner={rootUrlPlaner} />
      </div>
    </OppfolgingsplanInnholdboks>
  );
};
GodkjennPlanSendt.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
  nullstillGodkjenning: PropTypes.func,
  rootUrlPlaner: PropTypes.string,
};

export default GodkjennPlanSendt;
