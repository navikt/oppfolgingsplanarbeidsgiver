import Logger from 'nav-logger';
import { getCookie } from 'digisyfo-npm';

export default new Logger({
    url: `${process.env.REACT_APP_OPPFOELGINGSDIALOGREST_ROOT}/logging`,
    fetchConfig: (config) => {
        config.headers.set('NAV_CSRF_PROTECTION', getCookie('NAV_CSRF_PROTECTION'));
        return Object.assign({}, config, {
            credentials: 'include',
        });
    },
});
