import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Utvidbar } from '@navikt/digisyfo-npm';
import { getContextRoot } from '../../../../routers/paths';
import { oppfolgingsplanPt } from '../../../../proptypes/opproptypes';
import GodkjennPlanOversiktInformasjon from '../GodkjennPlanOversiktInformasjon';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';
import GodkjennPlanTilAltinnTekst from './GodkjennPlanTilAltinnTekst';
import { EditButton } from './EditButton';
import { SharingCheckbox } from './SharingCheckbox';

const texts = {
    godkjennPlanMottattUtvidbar: {
        title: 'Se planen',
    },
    godkjennPlanMottattKnapper: {
        buttonApprove: 'Godkjenn',
        buttonDecline: 'Gjør endringer',
    },
    godkjennPlanMottatt: {
        title: 'Ønsker du å godkjenne denne versjonen?',
    },
};

const TextReceived = ({ arbeidstakerName }) => {
    return (
        <React.Fragment>
            Du har mottatt en ny oppfølgingsplan fra din arbeidsgiver: <b>{arbeidstakerName}</b> for godkjenning.
        </React.Fragment>
    );
};
TextReceived.propTypes = {
    arbeidstakerName: PropTypes.string,
};

export const GodkjennPlanMottattUtvidbar = ({ oppfolgingsplan, rootUrl }) => {
    return (
        <Utvidbar className="utvidbar--oppfolgingsplan" tittel={texts.godkjennPlanMottattUtvidbar.title}>
            <GodkjennPlanOversiktInformasjon
                oppfolgingsdialog={oppfolgingsplan}
                rootUrl={rootUrl}
            />
        </Utvidbar>
    );
};

GodkjennPlanMottattUtvidbar.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    rootUrl: PropTypes.string,
};
export const GodkjennPlanMottattKnapper = ({ godkjennPlan, oppfolgingsplan }) => {
    const [delMedNav, setDelMedNav] = useState(false);

    const handleChange = () => {
        setDelMedNav(!delMedNav);
    };

    return (
        <div className="knapperad knapperad--justervenstre">
            <SharingCheckbox checked={delMedNav} onChange={handleChange} oppfolgingsplan={oppfolgingsplan} />
            <div className="knapperad__element">
                <Hovedknapp
                    name="godkjentKnapp"
                    id="godkjentKnapp"
                    autoFocus
                    onClick={() => { godkjennPlan(oppfolgingsplan.id, null, true, oppfolgingsplan.arbeidstaker.fnr, delMedNav); }}>
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

const GodkjennPlanMottatt = (
    {
        oppfolgingsplan,
        rootUrlPlaner,
        godkjennPlan,
        avvisDialog,
    }) => {
    const rootUrl = getContextRoot();
    return (
        <OppfolgingsplanInnholdboks
            svgUrl={`${rootUrl}/img/svg/plan-mottatt.svg`}
            svgAlt="mottatt"
            tittel={texts.godkjennPlanMottatt.title}
        >
            <div className="godkjennPlanMottatt">
                <div className="blokk">
                    <p>
                        <TextReceived arbeidstakerName={oppfolgingsplan.arbeidstaker.navn} />
                    </p>
                </div>

                <div className="blokk--xxs">
                    <GodkjennPlanTidspunkt
                        gyldighetstidspunkt={oppfolgingsplan.godkjenninger[0].gyldighetstidspunkt}
                    />
                    <EditButton
                        oppfolgingsdialog={oppfolgingsplan}
                        avvisDialog={avvisDialog}
                    />
                </div>

                <GodkjennPlanMottattUtvidbar
                    oppfolgingsplan={oppfolgingsplan}
                    rootUrl={rootUrl}
                />
                <TidligereAvbruttePlaner
                    oppfolgingsdialog={oppfolgingsplan}
                    rootUrlPlaner={rootUrlPlaner}
                />

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
