import { parseSykepengesoknad } from 'digisyfo-npm';

const getSoknad = (soknad = {}) => {
    return Object.assign({}, {
        id: '66a8ec20-b813-4b03-916f-7a2f0751b600',
        status: 'NY',
        innsendtDato: new Date('2017-02-22'),
        opprettetDato: new Date('2017-01-18'),
        arbeidsgiver: {
            navn: 'BYGGMESTER BLOM AS',
            orgnummer: '983610218',
            naermesteLeder: null,
        },
        identdato: new Date('2016-07-15'),
        ansvarBekreftet: false,
        bekreftetKorrektInformasjon: false,
        arbeidsgiverUtbetalerLoenn: false,
        egenmeldingsperioder: [],
        gjenopptattArbeidFulltUtDato: null,
        ferie: [],
        permisjon: [],
        utenlandsopphold: {
            perioder: [],
            soektOmSykepengerIPerioden: null,
        },
        aktiviteter: [{
            periode: {
                fom: new Date('2017-01-01'),
                tom: new Date('2017-01-15'),
            },
            grad: 100,
            avvik: null,
        }, {
            periode: {
                fom: new Date('2017-01-01'),
                tom: new Date('2017-01-25'),
            },
            grad: 50,
            avvik: null,
        }],
        andreInntektskilder: [],
        utdanning: null,
        fom: new Date('2017-01-01'),
        tom: new Date('2017-01-25'),
    }, soknad);
};

export const getParsetSoknad = (soknad = {}) => {
    return parseSykepengesoknad(getSoknad(soknad));
};

export default getSoknad;
