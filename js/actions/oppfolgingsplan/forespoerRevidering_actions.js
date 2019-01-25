export const FORESPOER_REVIDERING_FORESPURT = 'FORESPOER_REVIDERING_FORESPURT';
export const FORESPOER_REVIDERING_SENDER = 'FORESPOER_REVIDERING_SENDER';
export const FORESPOER_REVIDERING_SUKSESS = 'FORESPOER_REVIDERING_SUKSESS';
export const FORESPOER_REVIDERING_FEILET = 'FORESPOER_REVIDERING_FEILET';

export const forespoerRevidering = (id) => {
    return {
        type: FORESPOER_REVIDERING_FORESPURT,
        id,
    };
};

export const forespoerRevideringSender = (id) => {
    return {
        type: FORESPOER_REVIDERING_SENDER,
        id,
    };
};

export const forespoerRevideringSuksess = (id) => {
    return {
        type: FORESPOER_REVIDERING_SUKSESS,
        id,
    };
};

export const forespoerRevideringFeilet = (id) => {
    return {
        type: FORESPOER_REVIDERING_FEILET,
        id,
    };
};
