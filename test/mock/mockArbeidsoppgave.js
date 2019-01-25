import {
    KANGJENNOMFOERES,
    TILRETTELEGGING,
} from '../../js/konstanter';

const arbeidsoppgave = {
    arbeidsoppgaveId: 1458,
    arbeidsoppgavenavn: 'Arbeidsoppgave',
    delAvArbeidsuke: null,
    godkjentAvArbeidsgiver: false,
    godkjentAvArbeidstaker: false,
    erVurdertAvSykmeldt: false,
    gjennomfoering: {
        kanGjennomfoeres: 'KAN',
        paaAnnetSted: null,
        medMerTid: null,
        medHjelp: null,
        kanBeskrivelse: null,
        kanIkkeGjennomfoeresFoer: null,
        tilretteleggingArbeidsgiver: null,
        kanIkkeBeskrivelse: null,
    },
    opprettetDato: '2017-06-21',
    sistEndretAv: {
        fnr: '1010101010101',
    },
    sistEndretDato: '2017-06-21',
    opprettetAv: {
        navn: 'Test Testesen',
        fnr: '1010101010101',
        samtykke: null,
        godkjent: null,
    },
    beskrivelse: 'beskrivelse',
    gjennomfoeringSvar: KANGJENNOMFOERES.KAN_IKKE,
    MED_HJELP: TILRETTELEGGING.MED_HJELP,
    MED_MER_TID: TILRETTELEGGING.MED_MER_TID,
    PAA_ANNET_STED: TILRETTELEGGING.PAA_ANNET_STED,
};

const getArbeidsoppgave = (nyArbeidsoppgave = {}) => {
    return Object.assign({}, arbeidsoppgave, nyArbeidsoppgave);
};

export default getArbeidsoppgave;
