export const SJEKK_TILGANG_FORESPURT = 'SJEKK_TILGANG_FORESPURT';
export const SJEKKER_TILGANG = 'SJEKKER_TILGANG';
export const SJEKK_TILGANG_FEILET = 'SJEKK_TILGANG_FEILET';
export const SJEKKET_TILGANG = 'SJEKKET_TILGANG';
export const SJEKK_TILGANG_403 = 'SJEKK_TILGANG_403';

export const sjekkTilgang = (fnr) => {
    return {
        type: SJEKK_TILGANG_FORESPURT,
        fnr,
    };
};

export const sjekkerTilgang = (fnr) => {
    return {
        type: SJEKKER_TILGANG,
        fnr,
    };
};

export const sjekketTilgang = (data, fnr) => {
    return {
        type: SJEKKET_TILGANG,
        data,
        fnr,
    };
};

export const sjekkTilgangFeilet = (fnr) => {
    return {
        type: SJEKK_TILGANG_FEILET,
        fnr,
    };
};

export const sjekkTilgang403 = (fnr) => {
    return {
        type: SJEKK_TILGANG_403,
        fnr,
    };
};

