import { log } from '@navikt/digisyfo-npm';
import ponyfill from 'fetch-ponyfill';

const ponyfills = ponyfill();

export const MANGLER_OIDC_TOKEN = 'MANGLER_OIDC_TOKEN';
export const REDIRECT_ETTER_LOGIN = 'REDIRECT_ETTER_LOGIN';

const isEdge = () => {
    return window.navigator.userAgent.indexOf('Edge') > -1;
};

const getFetch = () => {
    // Gjør dette slik fordi enhetstester vil feile dersom fetch overskrives
    if (isEdge()) {
        return ponyfills.fetch;
    }
    return window.fetch;
};


export const getHeaders = () => {
    // Gjør dette slik fordi enhetstester vil feile dersom Headers overskrives
    if (isEdge()) {
        return ponyfills.Headers;
    }
    return window.Headers;
};

export const hentLoginUrl = () => {
    window.localStorage.setItem(REDIRECT_ETTER_LOGIN, window.location.href);
    if (window.location.href.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://loginservice.nav.no/login';
    } else if (window.location.href.indexOf('localhost') > -1) {
        // Lokalt
        return 'http://localhost:8080/syfoapi/local/cookie';
    }
    // Preprod
    return 'https://loginservice-q.nav.no/login';
};

export function get(url, headers = null) {
    const customFetch = getFetch();
    const CustomHeaders = getHeaders();
    return customFetch(url, {
        credentials: 'include',
        headers: headers || new CustomHeaders(),
    })
        .then((res) => {
            if (res.status === 401) {
                log(res, 'Redirect til login');
                window.location.href = `${hentLoginUrl()}?redirect=${window.location.origin}/sykefravaerarbeidsgiver`;
                throw new Error(MANGLER_OIDC_TOKEN);
            } else if (res.status === 404) {
                log(res);
                throw new Error('404');
            } else if (res.status === 403) {
                log(res);
                throw new Error('403');
            } else if (res.status > 400) {
                log(res);
                throw new Error('Forespørsel feilet');
            }
            return res.json();
        })
        .catch((err) => {
            log(err);
            throw err;
        });
}

export const post = (url, body) => {
    const customFetch = getFetch();
    const CustomHeaders = getHeaders();
    return customFetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
        headers: new CustomHeaders({
            'Content-Type': 'application/json',
        }),
    })
        .then((res) => {
            if (res.status === 401) {
                log(res, 'Redirect til login');
                window.location.href = `${hentLoginUrl()}?redirect=${window.location.href}`;
                return null;
            } else if (res.status > 400) {
                log(res);
                throw new Error('Forespørsel feilet');
            } else {
                const contentType = res.headers.get('Content-Type') || '';
                if (contentType.includes('json')) {
                    return res.json();
                }
                return res;
            }
        })
        .catch((err) => {
            log(err);
            throw err;
        });
};

export const hentSyfoapiUrl = (appNavn) => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';
    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return `https://syfoapi.nav.no/${appNavn}/api`;
    } else if (url.indexOf('localhost') > -1 || url.indexOf('herokuapp') > -1) {
        // Lokalt
        return `/${appNavn}/api`;
    }
    // Preprod
    return `https://syfoapi-q.nav.no/${appNavn}/api`;
};

export const API_NAVN = {
    SYFOOPPFOLGINGSPLANSERVICE: 'syfooppfolgingsplanservice',
};
