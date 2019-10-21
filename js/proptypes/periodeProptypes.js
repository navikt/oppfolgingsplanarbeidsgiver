import PropTypes from 'prop-types';

export const periodePt = PropTypes.shape({
    fom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    tom: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
    ]),
    grad: PropTypes.number,
    behandlingsdager: PropTypes.number,
    reisetilskudd: PropTypes.bool,
    avventende: PropTypes.string,
});
