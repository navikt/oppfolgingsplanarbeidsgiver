import PropTypes from 'prop-types';

export const sykmeldt = PropTypes.shape({
  fnr: PropTypes.string.isRequired,
  narmestelederId: PropTypes.string.isRequired,
  orgnr: PropTypes.string,
});

export const dineSykmeldteMedSykmeldinger = PropTypes.shape({
  fnr: PropTypes.string.isRequired,
  narmestelederId: PropTypes.string.isRequired,
  orgnr: PropTypes.string,
  sykmeldinger: PropTypes.array,
});

export const brodsmule = PropTypes.shape({
  sti: PropTypes.string,
  tittel: PropTypes.string,
  sisteSmule: PropTypes.bool,
  erKlikkbar: PropTypes.bool,
});
