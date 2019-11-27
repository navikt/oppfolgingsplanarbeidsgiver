import React from 'react';
import PropTypes from 'prop-types';
import { KANGJENNOMFOERES } from '../../../../konstanter';
import * as opProptypes from '../../../../proptypes/opproptypes';

const texts = {
    hentArbeidsoppgaveUnderTekst: {
        kan: 'Kan gjennomføres som normalt',
        tilrettelegging: 'Kan gjennomføres med hjelp/hjelpemiddel',
        kanIkke: 'Kan ikke gjennomføres',
        ikkeVurdert: 'Ikke vurdert',
    },
};

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

export const hentArbeidsoppgaveUnderTekst = (arbeidsoppgave) => {
    if (arbeidsoppgave.gjennomfoering) {
        if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN) {
            return texts.hentArbeidsoppgaveUnderTekst.kan;
        } else if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.TILRETTELEGGING) {
            return texts.hentArbeidsoppgaveUnderTekst.tilrettelegging;
        } else if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN_IKKE) {
            return texts.hentArbeidsoppgaveUnderTekst.kanIkke;
        }
    }
    return texts.hentArbeidsoppgaveUnderTekst.ikkeVurdert;
};

const ArbeidsoppgaveUtvidbarOverskrift = (
    {
        erApen,
        arbeidsoppgave,
        rootUrlImg,
    }) => {
    return (<div className="arbeidsoppgaveTabellUtvidbarOverskrift">
        <div className="arbeidsoppgaverListe__kol">
            <img className="arbeidsoppgaveUtvidbarOverskrift__ikon" src={hentArbeidsoppgaveIkon(arbeidsoppgave, rootUrlImg)} alt="" />
            <div className="arbeidsoppgaveUtvidbarOverskrift__tekst">
                <p>{arbeidsoppgave.arbeidsoppgavenavn}</p>
                <p>{hentArbeidsoppgaveUnderTekst(arbeidsoppgave)}</p>
            </div>
            <i className={`nav-frontend-chevron ${erApen ? 'chevron--opp' : 'chevron--ned'} chevron--stor`} />
        </div>
    </div>);
};

ArbeidsoppgaveUtvidbarOverskrift.propTypes = {
    erApen: PropTypes.bool,
    arbeidsoppgave: opProptypes.arbeidsoppgavePt,
    rootUrlImg: PropTypes.string,
};

export default ArbeidsoppgaveUtvidbarOverskrift;
