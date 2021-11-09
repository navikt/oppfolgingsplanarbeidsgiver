import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { oppfolgingsplanPt } from '@/proptypes/opproptypes';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';
import GodkjennPlanTilAltinnTekst from './GodkjennPlanTilAltinnTekst';
import { EditButton } from './EditButton';
import { SharingCheckbox } from './SharingCheckbox';
import PlanEkspanderbar from '../PlanEkspanderbar';
import { PlanMottattImage } from '@/images/imageComponents';

const texts = {
  godkjennPlanMottattKnapper: {
    buttonApprove: 'Godkjenn',
  },
  godkjennPlanMottatt: {
    title: 'Ønsker du å godkjenne denne versjonen?',
  },
};

const TextReceived = ({ arbeidstakerName }) => {
  return (
    <React.Fragment>
      Du har mottatt en oppfølgingsplan fra <b>{arbeidstakerName}</b> for godkjenning.
    </React.Fragment>
  );
};
TextReceived.propTypes = {
  arbeidstakerName: PropTypes.string,
};

export const GodkjennPlanMottattKnapper = ({ godkjennPlan, oppfolgingsplan }) => {
  const [delMedNav, setDelMedNav] = useState(false);

  const handleChange = () => {
    setDelMedNav(!delMedNav);
  };

  return (
    <div className="knapperad knapperad--justervenstre">
      <SharingCheckbox checked={delMedNav} onChange={handleChange} oppfolgingsplan={oppfolgingsplan} />
      <div className="knapperad__element godkjent-knapp">
        <Hovedknapp
          name="godkjentKnapp"
          id="godkjentKnapp"
          autoFocus
          onClick={() => {
            godkjennPlan(oppfolgingsplan.id, null, true, oppfolgingsplan.arbeidstaker.fnr, delMedNav);
          }}
        >
          {texts.godkjennPlanMottattKnapper.buttonApprove}
        </Hovedknapp>
      </div>
    </div>
  );
};
GodkjennPlanMottattKnapper.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
  godkjennPlan: PropTypes.func,
};

const GodkjennPlanMottatt = ({ oppfolgingsplan, rootUrlPlaner, godkjennPlan, avvisDialog }) => {
  return (
    <OppfolgingsplanInnholdboks svgUrl={PlanMottattImage} svgAlt="" tittel={texts.godkjennPlanMottatt.title}>
      <div className="godkjennPlanMottatt">
        <div className="blokk">
          <p>
            <TextReceived arbeidstakerName={oppfolgingsplan.arbeidstaker.navn} />
          </p>
        </div>

        <div className="blokk--xxs">
          <GodkjennPlanTidspunkt gyldighetstidspunkt={oppfolgingsplan.godkjenninger[0].gyldighetstidspunkt} />
        </div>

        <PlanEkspanderbar oppfolgingsplan={oppfolgingsplan} />
        <EditButton oppfolgingsdialog={oppfolgingsplan} avvisDialog={avvisDialog} />
        <TidligereAvbruttePlaner oppfolgingsdialog={oppfolgingsplan} rootUrlPlaner={rootUrlPlaner} />

        <GodkjennPlanTilAltinnTekst />

        <GodkjennPlanMottattKnapper
          oppfolgingsplan={oppfolgingsplan}
          godkjennPlan={godkjennPlan}
          avvisDialog={avvisDialog}
        />
      </div>
    </OppfolgingsplanInnholdboks>
  );
};

GodkjennPlanMottatt.propTypes = {
  oppfolgingsplan: oppfolgingsplanPt,
  rootUrlPlaner: PropTypes.string,
  avvisDialog: PropTypes.func,
  godkjennPlan: PropTypes.func,
};

export default GodkjennPlanMottatt;
