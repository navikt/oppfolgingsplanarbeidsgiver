export const erHerokuApp = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    return url.indexOf('herokuapp') > -1;
};

export const getSykefravaerarbeidsgiverUrl = (sti) => {
    return erHerokuApp()
        ? `https://sykefravaerarbeidsgiver.herokuapp.com${sti}`
        : sti;
};

export const isLocal = () => {
    return window.location.host.indexOf('localhost') > -1;
};

export const isPreProd = () => {
    return window.location.href.indexOf('-q') > -1;
};

export const getNaisInfix = () => {
    return isPreProd()
        ? '-q'
        : '';
};

export const fullNaisUrl = (host, path) => {
    if (isLocal()) {
        return path;
    }
    return `https://${host}${getNaisInfix()}.nav.no${path}`;
};
