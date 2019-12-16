const defaultOppfolgingsplaner = require('./defaultOppfolgingsplaner');
const dateUtil = require('../util/dateUtil');

const TYPE_DEFAULT = 'default';
const TYPE_GODKJENT = 'godkjent';

function getOppfolgingsplaner(type) {
    const today = new Date();
    const oppfolgingsplaner = defaultOppfolgingsplaner.getDefaultOppfolgingsplaner() || [];
    if (oppfolgingsplaner.length === 0) {
        return [];
    }
    const oppfolgingsplan = oppfolgingsplaner[0];
    if (type === TYPE_GODKJENT) {
        return [
            {
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
            },
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
