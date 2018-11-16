import PropTypes from 'prop-types';
import { sykmelding as sykmeldingPt } from 'digisyfo-npm';

export const sykmeldt = PropTypes.shape({
    fnr: PropTypes.string.isRequired,
    koblingId: PropTypes.number.isRequired,
    navn: PropTypes.string,
    orgnr: PropTypes.string,
});

export const brodsmule = PropTypes.shape({
    sti: PropTypes.string,
    tittel: PropTypes.string,
    sisteSmule: PropTypes.bool,
    erKlikkbar: PropTypes.bool,
});

export const sykmeldteReducerPt = PropTypes.shape({
    henter: PropTypes.bool,
    hentet: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    sletter: PropTypes.bool,
    slettet: PropTypes.bool,
    slettingFeilet: PropTypes.bool,
    sykmeldte: PropTypes.arrayOf(sykmeldt),
});

export const sykmeldingerReducerPt = PropTypes.shape({
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    hentet: PropTypes.bool,
    data: PropTypes.arrayOf(sykmeldingPt),
});
