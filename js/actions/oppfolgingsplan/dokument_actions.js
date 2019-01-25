export const HENT_PDFURLER_FORESPURT = 'HENT_PDFURLER_FORESPURT';
export const HENTER_PDFURLER = 'HENTER_PDFURLER';
export const PDFURLER_HENTET = 'PDFURLER_HENTET';
export const HENT_PDFURLER_FEILET = 'HENT_PDFURLER_FEILET';


export const hentPdfurler = (id) => {
    return {
        type: HENT_PDFURLER_FORESPURT,
        id,
    };
};

export const henterPdfurler = () => {
    return {
        type: HENTER_PDFURLER,
    };
};

export const pdfurlerHentet = (data = [], id) => {
    return {
        type: PDFURLER_HENTET,
        data,
        id,
    };
};

export const hentPdfurlerFeilet = () => {
    return {
        type: HENT_PDFURLER_FEILET,
    };
};
