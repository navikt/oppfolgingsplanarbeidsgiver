import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Alertstripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import {
    delMedFastlegePt,
    delmednavPt,
    oppfolgingsplanPt,
} from '../../../../proptypes/opproptypes';
import { getContextRoot } from '../../../../routers/paths';

const texts = {
    shareWithNAVError: 'Noe gikk feil da du prøvde å dele planen. Prøv igjen om litt.',
    shareWithFastlegeError: `
        Du får dessverre ikke delt denne planen med legen herfra. Det kan hende legen ikke kan ta imot elektroniske meldinger.
        I dette tilfellet må dere laste ned og skrive ut planen slik at dere får delt den med legen manuelt.   
    `,
    buttonShareWithNAV: 'Del med NAV',
    sharedWithNAV: 'Planen er delt med NAV',
    buttonShareWithFastlege: 'Del med fastlegen',
    buttonDownload: 'Last ned',
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

const ButtonColumn = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
`;

export const ButtonRow = styled.div`
    display: flex;
    flex-wrap: wrap; 
    margin-bottom: 1em;
`;

export const ButtonStyled = styled(Knapp)`
    margin: .5em 1em .5em 0
`;

const IconAndText = styled.div`
    display: flex;
    align-items: center;
    margin: .5em 0
`;

const Text = styled.p`
    margin: 0;
`;

const Image = styled.img`
    width: 1.5em;
    margin-right: .5em;
`;

const GodkjentPlanDelKnapper = (
    {
        oppfolgingsplan,
        delmednav,
        delMedNavFunc,
        fastlegeDeling,
        delMedFastlege,
    }) => {
    return (<ButtonColumn>
        <ButtonRow>
            {!oppfolgingsplan.godkjentPlan.deltMedNAV &&
            <ButtonStyled
                mini
                disabled={delmednav.sender}
                spinner={delmednav.sender}
                onClick={() => {
                    delMedNavFunc(oppfolgingsplan.id, oppfolgingsplan.arbeidstaker.fnr);
                }}>
                {texts.buttonShareWithNAV}
            </ButtonStyled>
            }
            {delmednav.sendt &&
            <IconAndText>
                <Image src={`${getContextRoot()}/img/svg/hake-groenn.svg`} alt="hake" />
                <Text>{texts.sharedWithNAV}</Text>
            </IconAndText>
            }
            {!oppfolgingsplan.godkjentPlan.deltMedFastlege &&
            <ButtonStyled
                mini
                disabled={fastlegeDeling.sender}
                spinner={fastlegeDeling.sender}
                onClick={() => {
                    delMedFastlege(oppfolgingsplan.id, oppfolgingsplan.arbeidstaker.fnr);
                }}>
                {texts.buttonShareWithFastlege}
            </ButtonStyled>
            }
            {fastlegeDeling.sendt &&
            <IconAndText>
                <Image src={`${getContextRoot()}/img/svg/hake-groenn.svg`} alt="hake" />
                <Text>{texts.sharedWithFastlege}</Text>
            </IconAndText>
            }
        </ButtonRow>
        {(delingFeiletNav(delmednav) || delingFeiletFastlege(fastlegeDeling)) &&
        <Alertstripe
            className="alertstripe--notifikasjonboks"
            type="advarsel"
            fylt>
            {textSharePlanFailed(delmednav)}
        </Alertstripe>
        }
    </ButtonColumn>);
};

GodkjentPlanDelKnapper.propTypes = {
    oppfolgingsplan: oppfolgingsplanPt,
    delmednav: delmednavPt,
    fastlegeDeling: delMedFastlegePt,
    delMedNavFunc: PropTypes.func,
    delMedFastlege: PropTypes.func,
};

export default GodkjentPlanDelKnapper;
