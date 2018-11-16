export const moter = [{
    moteUuid: 'moteUUID1',
    status: 'OPPRETTET',
    fnr: '01234567891',
    opprettetTidspunkt: '2017-03-10T15:24:01.364',
    bekreftetTidspunkt: null,
    deltakere: [{
        navn: 'Are Arbeidsgiver',
        orgnummer: '981566378',
        type: 'arbeidsgiver',
        svartidspunkt: null,
        svar: [{
            id: 1,
            tid: '2017-03-23T15:24:01.363',
            created: '2017-03-10T15:24:01.363',
            sted: 'Sannergata 2',
            valgt: false,
        }, {
            id: 2,
            tid: '2017-03-25T15:24:01.363',
            created: '2017-03-10T15:24:01.363',
            sted: 'Sannergata 2',
            valgt: false,
        }],
    }, {
        navn: 'Sygve Sykmeldt',
        orgnummer: null,
        type: 'Bruker',
        svartidspunkt: null,
        svar: [{
            id: 1,
            tid: '2017-03-23T15:24:01.363',
            created: '2017-03-10T15:24:01.363',
            sted: 'Sannergata 2',
            valgt: false,
        }, {
            id: 2,
            tid: '2017-03-25T15:24:01.363',
            created: '2017-03-10T15:24:01.363',
            sted: 'Sannergata 2',
            valgt: false,
        }],
    }],
    bekreftetAlternativ: null,
    alternativer: [{
        id: 1,
        tid: '2017-03-23T15:24:01.363',
        created: '2017-03-10T15:24:01.363',
        sted: 'Sannergata 2',
        valgt: false,
    }, {
        id: 2,
        tid: '2017-03-25T15:24:01.363',
        created: '2017-03-10T15:24:01.363',
        sted: 'Sannergata 2',
        valgt: false,
    }],
}];

const getMote = (s = {}) => {
    const mote = moter[0];
    return Object.assign({}, mote, s);
};

export default getMote;
