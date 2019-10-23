import React from 'react';
import { getLedetekst, langtDatoFormat, sykeforloep as sykeforloepPt } from '@navikt/digisyfo-npm';

const NyesteSykeforloepHosVirksomhet = ({ sykeforloep }) => {
    return (<div className="blokk">
        <label>{getLedetekst('oppfolgingsplan.sykeforloep.arbeidsgiver.sykeforloep__start', {
            '%GRAD%': sykeforloep.tidligsteFom.grad,
            '%DATO%': langtDatoFormat(sykeforloep.tidligsteFom.identdato),
        })}</label>
        {
            sykeforloep.senesteTom.dato.getTime() > new Date().getTime() ?
                <label>{getLedetekst('oppfolgingsplan.sykeforloep.arbeidsgiver.sykeforloep__slutt', {
                    '%GRAD%': sykeforloep.senesteTom.grad,
                })}</label> :
                <label>{getLedetekst('oppfolgingsplan.sykeforloep.arbeidsgiver.sykeforloep__slutt--passert', {
                    '%GRAD%': sykeforloep.senesteTom.grad,
                    '%DATO%': langtDatoFormat(sykeforloep.senesteTom.dato),
                })}</label>
        }
    </div>);
};

NyesteSykeforloepHosVirksomhet.propTypes = {
    sykeforloep: sykeforloepPt,
};

export default NyesteSykeforloepHosVirksomhet;
