export const kanSlaaSammenPeriode = (periode, forrigePeriode) => {
    return forrigePeriode.grad === periode.grad &&
        forrigePeriode.behandlingsdager === periode.behandlingsdager &&
        forrigePeriode.reisetilskudd === periode.reisetilskudd &&
        forrigePeriode.avventende === periode.avventende;
};

export const slaaSammenPerioder = (sykeforlopsPerioder) => {
    return sykeforlopsPerioder.reduce((sammenslaattePerioder, periode) => {
        const sistePeriode = sammenslaattePerioder[sammenslaattePerioder.length - 1];
        if (kanSlaaSammenPeriode(periode, sistePeriode)) {
            sistePeriode.tom = periode.tom > sistePeriode.tom ? periode.tom : sistePeriode.tom;
            sistePeriode.fom = periode.fom < sistePeriode.fom ? periode.fom : sistePeriode.fom;
        } else {
            sammenslaattePerioder.push(periode);
        }
        return sammenslaattePerioder;
    }, [sykeforlopsPerioder[0]]);
};
