export const TiltakListe = [
    {
        tiltakId: 1345,
        tiltaknavn: 'Tiltak1',
        knyttetTilArbeidsoppgaveId: 'null',
        fom: null,
        tom: null,
        beskrivelse: 'beskrivelse',
        ansvarlig: null,
        maal: null,
        godkjentAvArbeidsgiver: false,
        godkjentAvArbeidstaker: false,
        opprettetDato: '2017-06-20',
        sistEndretAv: {
            fnr: '1000042179824',
        },
        sistEndretDato: '2017-06-20',
        opprettetAv: {
            navn: 'Test Testesen',
            fnr: '1010101010101',
            samtykke: null,
            godkjent: null,
        },
        status: 'GODKJENT',
        gjennomfoering: 'Det skal skrives en Gjennomfoering til tiltak med id 1345',
    },
    {
        tiltakId: '1372',
        tiltaknavn: 'TestTiltak',
        knyttetTilArbeidsoppgaveId: 'null',
        fom: '2017-06-15',
        tom: '2017-06-25',
        beskrivelse: 'beskrivelse',
        ansvarlig: null,
        maal: null,
        godkjentAvArbeidsgiver: false,
        godkjentAvArbeidstaker: false,
        opprettetDato: '2017-06-20',
        sistEndretAv: {
            fnr: '1010101010101',
        },
        sistEndretDato: '2017-06-20',
        opprettetAv: {
            navn: 'Test Testesen',
            fnr: '1010101010101',
            samtykke: null,
            godkjent: null,
        },
        status: 'FORSLAG',
        gjennomfoering: 'Det skal skrives en Gjennomfoering her igjen',
    },
];

const tiltak = {
    tiltakId: 1345,
    tiltaknavn: 'Tiltak1',
    knyttetTilArbeidsoppgaveId: null,
    fom: null,
    tom: null,
    beskrivelse: 'beskrivelse',
    ansvarlig: null,
    maal: null,
    godkjentAvArbeidsgiver: false,
    godkjentAvArbeidstaker: false,
    sistEndretAv: {
        fnr: '1010101010100',
    },
    opprettetDato: '2017-06-20',
    sistEndretDato: '2017-06-20',
    opprettetAv: {
        navn: 'Test Testesen',
        fnr: '1010101010101',
        samtykke: null,
        godkjent: null,
    },
    status: 'GODKJENT',
    gjennomfoering: 'Det skal skrives en Gjennomfoering her',
};

const getTiltak = (nyttTiltak = {}) => {
    return Object.assign({}, tiltak, nyttTiltak);
};

export default getTiltak;
