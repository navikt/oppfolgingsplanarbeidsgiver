import ponyfill from 'fetch-ponyfill';
import store from '../store';
import { forlengInnloggetSesjon } from '@/timeout/timeout_actions';

const ponyfills = ponyfill();

export const MANGLER_OIDC_TOKEN = 'MANGLER_OIDC_TOKEN';
export const REDIRECT_ETTER_LOGIN = 'REDIRECT_ETTER_LOGIN';

export const SYFOOPPFOLGINGSPLANSERVICE_PROXY_HOST = '/syk/oppfolgingsplanarbeidsgiver/api/oppfolgingsplanservice';

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
  if (window.location.href.indexOf('www.nav') > -1) {
    // Prod
    return 'https://loginservice.nav.no/login';
  }
  // Preprod
  return 'https://loginservice.dev.nav.no/login';
};

const log = (...data) => {
  if (window.location.search.indexOf('log=true') > -1 || process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(data);
  }
};

export function get(url, headers = null) {
  const customFetch = getFetch();
  const CustomHeaders = getHeaders();
  store.dispatch(forlengInnloggetSesjon());

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
  store.dispatch(forlengInnloggetSesjon());

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
      } else if (res.status === 409) {
        log(res);
        throw new Error('409');
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
