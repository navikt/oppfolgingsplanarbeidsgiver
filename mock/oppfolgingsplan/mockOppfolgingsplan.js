const defaultOppfolgingsplaner = require('./defaultOppfolgingsplaner');
const dateUtil = require('../util/dateUtil');

const TYPE_DEFAULT = 'default';
const TYPE_GODKJENT = 'godkjent';

function getOppfolgingsplanGodkjent(oppfolgingsplan) {
    const today = new Date();
    return {
        ...oppfolgingsplan,
        godkjentPlan: {
            opprettetTidspunkt: dateUtil.leggTilDagerPaDato(today, -7).toJSON(),
            gyldighetstidspunkt: {
                fom: dateUtil.leggTilDagerPaDato(today, -7).toJSON(),
                tom: dateUtil.leggTilDagerPaDato(today, 7).toJSON(),
                evalueres: dateUtil.leggTilDagerPaDato(today, 14).toJSON(),
            },
            tvungenGodkjenning: true,
            deltMedNAVTidspunkt: null,
            deltMedNAV: false,
            deltMedFastlegeTidspunkt: null,
            deltMedFastlege: false,
            dokumentUuid: '12345678-1234-1234-1234-123456789abc',
            avbruttPlan: null,
        },
        avbruttPlanListe: [
            {
                av: {
                    navn: ' ',
                    fnr: '23106822999',
                    epost: null,
                    tlf: null,
                    sistInnlogget: null,
                    samtykke: null,
                    evaluering: null,
                    stillinger: [],
                },
                tidspunkt: '2019-12-13T15:30:01.679',
                id: 3203,
            },
        ],
    };
}

function getOppfolgingsplaner(type) {
    const oppfolgingsplaner = defaultOppfolgingsplaner.getDefaultOppfolgingsplaner() || [];
    if (oppfolgingsplaner.length === 0) {
        return [];
    }
    const oppfolgingsplan = oppfolgingsplaner[0];
    if (type === TYPE_GODKJENT) {
        return [
            getOppfolgingsplanGodkjent(oppfolgingsplan),
        ];
    }
    return [
        {
            ...oppfolgingsplan,
        },
    ];
}

module.exports = {
    getOppfolgingsplaner,
    TYPE_DEFAULT,
    TYPE_GODKJENT,
};
