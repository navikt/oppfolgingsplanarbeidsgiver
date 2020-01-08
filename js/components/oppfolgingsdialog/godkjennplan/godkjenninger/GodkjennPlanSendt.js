import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Utvidbar } from '@navikt/digisyfo-npm';
import { oppfolgingsdialogPt } from '../../../../proptypes/opproptypes';
import { finnNyesteGodkjenning } from '../../../../utils/oppfolgingsplanUtils';
import GodkjennPlanOversiktInformasjon from '../GodkjennPlanOversiktInformasjon';
import OppfolgingsplanInnholdboks from '../../../app/OppfolgingsplanInnholdboks';
import GodkjennPlanTidspunkt from '../GodkjennPlanTidspunkt';
import TidligereAvbruttePlaner from '../TidligereAvbruttePlaner';
import GodkjennPlanVenterInfo from '../GodkjennPlanVenterInfo';
import { getContextRoot } from '../../../../routers/paths';

const texts = {
    godkjennPlanSendtInfoTekst: {
        title: 'Hva skjer nå?',
    },
    godkjennPlanSendtUtvidbar: {
        title: 'Se planen',
    },
    godkjennPlanSendt: {
        title: 'Sendt til godkjenning',
        buttonUndo: 'Avbryt planen',
    },
};

const CancelButtonStyled = styled.button`
    margin-top: 1em;
`;
export const CancelButton = (
    {
        nullstillGodkjenning,
        oppfolgingsplan,
    }) => {
    return (
        <CancelButtonStyled
            className="lenke"
            onClick={() => {
                nullstillGodkjenning(oppfolgingsplan.id, oppfolgingsplan.arbeidstaker.fnr);
            }}>
            {texts.godkjennPlanSendt.buttonUndo}
        </CancelButtonStyled>
    );
};
CancelButton.propTypes = {
    nullstillGodkjenning: PropTypes.func,
    oppfolgingsplan: oppfolgingsdialogPt,
};

export const GodkjennPlanSendtInfoTekst = () => {
    return (
        <div className="godkjennPlanSendt_infoTekst">
            <h3 className="typo-element">{texts.godkjennPlanSendtInfoTekst.title}</h3>
            <GodkjennPlanVenterInfo />
        </div>
    );
};

const GodkjenPlanSentBlokk = (arbeidstakerName) => {
    const text = 'Du har sendt en ny versjon av oppfølgingsplanen til din arbeidstaker ';
    return (
        <div className="blokk">
            <p>
                {text}<b>{arbeidstakerName}</b>
            </p>
        </div>
    );
};

export const GodkjennPlanSendtUtvidbar = ({ oppfolgingsdialog }) => {
    const rootUrl = getContextRoot();
    return (
        <Utvidbar tittel={texts.godkjennPlanSendtUtvidbar.title}>
            <GodkjennPlanOversiktInformasjon
                oppfolgingsdialog={oppfolgingsdialog}
                rootUrl={rootUrl}
            />
        </Utvidbar>
    );
};
GodkjennPlanSendtUtvidbar.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
};

const GodkjennPlanSendt = (
    {
        oppfolgingsdialog,
        nullstillGodkjenning,
        rootUrlPlaner,
    }) => {
    return (
        <OppfolgingsplanInnholdboks
            svgUrl={`${getContextRoot()}/img/svg/hake-groenn--lys.svg`}
            liteikon
            svgAlt="sendt"
            tittel={texts.godkjennPlanSendt.title}
        >
            <div className="godkjennPlanSendt">
                {GodkjenPlanSentBlokk(oppfolgingsdialog.arbeidstaker.navn)}

                <GodkjennPlanTidspunkt
                    gyldighetstidspunkt={finnNyesteGodkjenning(oppfolgingsdialog.godkjenninger).gyldighetstidspunkt}
                />

                <GodkjennPlanSendtUtvidbar
                    oppfolgingsdialog={oppfolgingsdialog}
                />
                <CancelButton
                    nullstillGodkjenning={nullstillGodkjenning}
                    oppfolgingsplan={oppfolgingsdialog}
                />
                <TidligereAvbruttePlaner
                    oppfolgingsdialog={oppfolgingsdialog}
                    rootUrlPlaner={rootUrlPlaner}
                />
                <GodkjennPlanSendtInfoTekst
                    oppfolgingsdialog={oppfolgingsdialog}
                />
            </div>
        </OppfolgingsplanInnholdboks>
    );
};
GodkjennPlanSendt.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    nullstillGodkjenning: PropTypes.func,
    rootUrlPlaner: PropTypes.string,
};

export default GodkjennPlanSendt;
