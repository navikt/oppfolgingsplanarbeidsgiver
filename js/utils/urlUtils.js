export const isHeroku = () => {
  const url = window && window.location && window.location.href ? window.location.href : '';

  return url.indexOf('herokuapp') > -1;
};

export const getSykefravaerarbeidsgiverUrl = (sti) => {
  return isHeroku() ? `https://sykefravaerarbeidsgiver.herokuapp.com${sti}` : sti;
};

export const isLocal = () => {
  return window.location.host.indexOf('localhost') > -1;
};

export const isPreProd = () => {
  return window.location.href.indexOf('www-gcp.dev') > -1;
};

export const isProd = () => {
  const url = window.location.href;
  return url.indexOf('www.nav.no') > -1;
};

export function getMiljo() {
  if (isProd()) {
    return 'prod-gcp';
  }
  if (isPreProd()) {
    return 'dev-gcp';
  }
  if (isHeroku()) {
    return 'heroku';
  }
  return 'local';
}
