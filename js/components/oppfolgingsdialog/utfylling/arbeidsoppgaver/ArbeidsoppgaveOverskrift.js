import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { KANGJENNOMFOERES } from '../../../../konstanter';
import * as opProptypes from '../../../../proptypes/opproptypes';
import ArbeidsoppgaveInformasjonKnapper from './ArbeidsoppgaveInformasjonKnapper';
import { getContextRoot } from '../../../../routers/paths';

const texts = {
  hentArbeidsoppgaveUnderTekst: {
    kan: 'Kan gjennomføres som normalt',
    tilrettelegging: 'Kan gjennomføres med hjelp/hjelpemiddel',
    kanIkke: 'Kan ikke gjennomføres',
    ikkeVurdert: 'Ikke vurdert',
  },
};

export const hentArbeidsoppgaveIkon = (arbeidsoppgave) => {
  const rootUrlImg = getContextRoot();
  if (arbeidsoppgave.gjennomfoering) {
    if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN) {
      return `${rootUrlImg}/img/svg/hake-groenn.svg`;
    } else if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.TILRETTELEGGING) {
      return `${rootUrlImg}/img/svg/hake-oransje.svg`;
    } else if (arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.KAN_IKKE) {
      return `${rootUrlImg}/img/svg/kryss-roed.svg`;
    }
  }
  return `${rootUrlImg}/img/svg/advarsel.svg`;
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

const ArbeidsoppgaveOverskriftImg = styled.div`
  display: flex;
  align-self: flex-start;
  flex-grow: 0;
`;

const ArbeidsoppgaveOverskrift = ({ fnr, sendSlett, arbeidsoppgave }) => {
  return (
    <div className="arbeidsoppgaveTabellUtvidbarOverskrift">
      <ArbeidsoppgaveOverskriftImg>
        <img className="arbeidsoppgaveOverskrift__ikon" src={hentArbeidsoppgaveIkon(arbeidsoppgave)} alt="" />
      </ArbeidsoppgaveOverskriftImg>
      <div className="arbeidsoppgaverListe__kol">
        <div className="arbeidsoppgaveOverskrift__tekst">
          <p>{arbeidsoppgave.arbeidsoppgavenavn}</p>
          <p>{hentArbeidsoppgaveUnderTekst(arbeidsoppgave)}</p>
          <ArbeidsoppgaveInformasjonKnapper arbeidsoppgave={arbeidsoppgave} fnr={fnr} sendSlett={sendSlett} />
        </div>
      </div>
    </div>
  );
};

ArbeidsoppgaveOverskrift.propTypes = {
  sendSlett: PropTypes.func,
  fnr: PropTypes.string,
  arbeidsoppgave: opProptypes.arbeidsoppgavePt,
};

export default ArbeidsoppgaveOverskrift;
