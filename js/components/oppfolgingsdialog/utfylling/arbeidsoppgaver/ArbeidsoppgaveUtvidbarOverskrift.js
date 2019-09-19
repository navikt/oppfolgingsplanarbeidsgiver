import React from 'react';
import PropTypes from 'prop-types';
import {
    getLedetekst,
    keyValue,
} from 'digisyfo-npm';
import { KANGJENNOMFOERES } from '../../../../konstanter';
import * as opProptypes from '../../../../proptypes/opproptypes';

export const hentArbeidsoppgaveIkon = (arbeidsoppgave, rootUrlImg) => {
    if (arbeidsoppgave.gjennomfoering) {
        if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN) {
            return `${rootUrlImg}/img/svg/hake-groenn--lys.svg`;
        } else if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.TILRETTELEGGING) {
            return `${rootUrlImg}/img/svg/hake-oransje.svg`;
        } else if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN_IKKE) {
            return `${rootUrlImg}/img/svg/kryss-roed.svg`;
        }
    }
    return `${rootUrlImg}/img/svg/varseltrekant.svg`;
};

export const hentArbeidsoppgaveUnderTekst = (ledetekster, arbeidsoppgave) => {
    if (arbeidsoppgave.gjennomfoering) {
        if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN) {
            return getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.vis.gjennomfoering.kan', ledetekster);
        } else if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.TILRETTELEGGING) {
            return getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.vis.gjennomfoering.tilrettelegging', ledetekster);
        } else if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN_IKKE) {
            return getLedetekst('oppfolgingsdialog.arbeidstaker.arbeidsoppgave.vis.gjennomfoering.kanikke', ledetekster);
        }
    }
    return getLedetekst('oppfolgingsdialog.godkjennplanoversiktinformasjon.arbeidsoppgaver.ikke-vurdert.tekst', ledetekster);
};

const ArbeidsoppgaveUtvidbarOverskrift = (
    {
        ledetekster,
        erApen,
        arbeidsoppgave,
        rootUrlImg,
    }) => {
    return (<div className="arbeidsoppgaveTabellUtvidbarOverskrift">
        <div className="arbeidsoppgaverListe__kol">
            <img className="arbeidsoppgaveUtvidbarOverskrift__ikon" src={hentArbeidsoppgaveIkon(arbeidsoppgave, rootUrlImg)} alt="" />
            <div className="arbeidsoppgaveUtvidbarOverskrift__tekst">
                <p>{arbeidsoppgave.arbeidsoppgavenavn}</p>
                <p>{hentArbeidsoppgaveUnderTekst(ledetekster, arbeidsoppgave)}</p>
            </div>
            <i className={`nav-frontend-chevron ${erApen ? 'chevron--opp' : 'chevron--ned'} chevron--stor`} />
        </div>
    </div>);
};

ArbeidsoppgaveUtvidbarOverskrift.propTypes = {
    ledetekster: keyValue,
    erApen: PropTypes.bool,
    arbeidsoppgave: opProptypes.arbeidsoppgavePt,
    rootUrlImg: PropTypes.string,
};

export default ArbeidsoppgaveUtvidbarOverskrift;