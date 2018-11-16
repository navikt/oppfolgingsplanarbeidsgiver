import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { UnderUtviklingVarsel } from 'oppfolgingsdialog-npm';
import Knapp from 'nav-frontend-knapper';
import { getContextRoot } from '../../routers/paths';
import Sidetopp from '../Sidetopp';
import Infomelding from '../Infomelding';

const SykmeldtIngenKontaktinformasjon = ({ meldingSett, ledetekster }) => {
    return (<div>
        <UnderUtviklingVarsel
            ledetekster={ledetekster}
            rootUrl={getContextRoot()}
        />
        <Sidetopp tittel={getLedetekst('oppfolgingsdialoger.sidetittel')} />
        <div className="panel">
            <Infomelding
                ikon="/oppfolgingsplanarbeidsgiver/img/svg/feilmelding_ingen_kontaktinformasjon.svg"
                ikonAlt="feilmelding ingen kontaktinformasjon"
                tittel={getLedetekst('sykefravaerarbeidsgiver.sykmeldt-ingen-kontaktinformasjon.tittel')}
                tekst={getLedetekst('sykefravaerarbeidsgiver.sykmeldt-ingen-kontaktinformasjon.tekst')}
            />
            <div className="knapperad">
                <Knapp type="button" onClick={meldingSett}>Jeg forstår</Knapp>
            </div>
        </div>
    </div>);
};

SykmeldtIngenKontaktinformasjon.propTypes = {
    ledetekster: PropTypes.string,
    meldingSett: PropTypes.func,
};

export default SykmeldtIngenKontaktinformasjon;
