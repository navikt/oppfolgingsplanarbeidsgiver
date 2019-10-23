import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Knapp from 'nav-frontend-knapper';
import Sidetopp from '../Sidetopp';
import Infomelding from '../Infomelding';

const SykmeldtIngenKontaktinformasjon = ({ meldingSett }) => {
    return (<div>
        <Sidetopp tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
        <div className="panel">
            <Infomelding
                ikon="/oppfolgingsplanarbeidsgiver/img/svg/feilmelding_ingen_kontaktinformasjon.svg"
                ikonAlt="feilmelding ingen kontaktinformasjon"
                tittel={getLedetekst('sykefravaerarbeidsgiver.sykmeldt-ingen-kontaktinformasjon.tittel')}
                tekst={getLedetekst('sykefravaerarbeidsgiver.sykmeldt-ingen-kontaktinformasjon.tekst')}
            />
            <div className="knapperad">
                <Knapp type="standard" onClick={meldingSett}>Jeg forstår</Knapp>
            </div>
        </div>
    </div>);
};

SykmeldtIngenKontaktinformasjon.propTypes = {
    meldingSett: PropTypes.func,
};

export default SykmeldtIngenKontaktinformasjon;
