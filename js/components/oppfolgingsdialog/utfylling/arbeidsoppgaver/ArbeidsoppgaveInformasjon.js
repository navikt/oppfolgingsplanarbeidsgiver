import React from 'react';
import { KANGJENNOMFOERES } from '../../../../konstanter';
import * as opProptypes from '../../../../proptypes/opproptypes';

const texts = {
  arbeidsoppgaveInformasjonInnhold: {
    ikkeVurdert:
      'Når den sykmeldte har gjort en vurdering på om denne arbeidsoppgaven kan gjennomføres vil dette bli synlig her.',
    tilrettelegging: {
      title: 'Hjelp/Hjelpemidler',
      sted: 'På annet sted',
      tid: 'Med mer tid',
      hjelp: 'Med hjelp',
    },
    beskrivelseLabel: 'Beskrivelse',
    createdByLabel: 'Lagt til av',
  },
};

export const ArbeidsoppgaveInformasjonInnhold = ({ arbeidsoppgave }) => {
  let beskrivelseTekst = '';
  let hentPanelType;
  switch (arbeidsoppgave && arbeidsoppgave.gjennomfoering && arbeidsoppgave.gjennomfoering.kanGjennomfoeres) {
    case KANGJENNOMFOERES.KAN: {
      hentPanelType = 'arbeidsoppgaveInformasjonInnhold--groenn';
      break;
    }
    case KANGJENNOMFOERES.TILRETTELEGGING: {
      beskrivelseTekst = arbeidsoppgave.gjennomfoering.kanBeskrivelse;
      hentPanelType = 'arbeidsoppgaveInformasjonInnhold--gul';
      break;
    }
    case KANGJENNOMFOERES.KAN_IKKE: {
      beskrivelseTekst = arbeidsoppgave.gjennomfoering.kanIkkeBeskrivelse;
      hentPanelType = 'arbeidsoppgaveInformasjonInnhold--roed';
      break;
    }
    default: {
      hentPanelType = 'arbeidsoppgaveInformasjonInnhold--graa';
      break;
    }
  }
  return (
    <div className={`arbeidsoppgaveInformasjonInnhold ${hentPanelType}`}>
      {!arbeidsoppgave.gjennomfoering && <p>{texts.arbeidsoppgaveInformasjonInnhold.ikkeVurdert}</p>}
      {arbeidsoppgave.gjennomfoering && (
        <dl>
          {arbeidsoppgave.gjennomfoering &&
            arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.TILRETTELEGGING && (
              <dt>{texts.arbeidsoppgaveInformasjonInnhold.tilrettelegging.title}</dt>
            )}
          {arbeidsoppgave.gjennomfoering &&
            arbeidsoppgave.gjennomfoering.kanGjennomfoeres === KANGJENNOMFOERES.TILRETTELEGGING && (
              <dd>
                {arbeidsoppgave.gjennomfoering.paaAnnetSted && (
                  <p>{texts.arbeidsoppgaveInformasjonInnhold.tilrettelegging.sted}</p>
                )}
                {arbeidsoppgave.gjennomfoering.medMerTid && (
                  <p>{texts.arbeidsoppgaveInformasjonInnhold.tilrettelegging.tid}</p>
                )}
                {arbeidsoppgave.gjennomfoering.medHjelp && (
                  <p>{texts.arbeidsoppgaveInformasjonInnhold.tilrettelegging.hjelp}</p>
                )}
              </dd>
            )}

          {beskrivelseTekst.length > 0 && arbeidsoppgave.gjennomfoering.kanGjennomfoeres !== KANGJENNOMFOERES.KAN && (
            <dt>{texts.arbeidsoppgaveInformasjonInnhold.beskrivelseLabel}</dt>
          )}
          {beskrivelseTekst.length > 0 && arbeidsoppgave.gjennomfoering.kanGjennomfoeres !== KANGJENNOMFOERES.KAN && (
            <dd className="arbeidsoppgaveInformasjonInnhold__beskrivelse">{beskrivelseTekst}</dd>
          )}
          <dt>{texts.arbeidsoppgaveInformasjonInnhold.createdByLabel}</dt>
          <dd>{arbeidsoppgave.opprettetAv.navn}</dd>
        </dl>
      )}
    </div>
  );
};
ArbeidsoppgaveInformasjonInnhold.propTypes = {
  arbeidsoppgave: opProptypes.arbeidsoppgavePt,
};

const ArbeidsoppgaveInformasjon = ({ arbeidsoppgave }) => {
  return (
    <div className="arbeidsoppgaveInformasjon">
      <ArbeidsoppgaveInformasjonInnhold arbeidsoppgave={arbeidsoppgave} />
    </div>
  );
};

ArbeidsoppgaveInformasjon.propTypes = {
  arbeidsoppgave: opProptypes.arbeidsoppgavePt,
};

export default ArbeidsoppgaveInformasjon;
