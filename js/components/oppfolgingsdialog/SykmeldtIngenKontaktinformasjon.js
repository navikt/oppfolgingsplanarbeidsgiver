import React from 'react';
import PropTypes from 'prop-types';
import Knapp from 'nav-frontend-knapper';
import { getContextRoot } from '../../routers/paths';
import Sidetopp from '../Sidetopp';
import Infomelding from '../Infomelding';

const texts = {
    title: 'Oppfølgingsplaner',
    infomelding: {
        title: 'Din sykmeldte arbeidstaker ønsker ikke digitale varsler',
        info: 'Det betyr at de ikke vil motta varsler som tjenesten sender ut og derfor må kontaktes direkte av deg. Dere kan fortsatt bruke tjenesten.',
    },
};

const SykmeldtIngenKontaktinformasjon = ({ meldingSett }) => {
    return (<div>
        <Sidetopp tittel={texts.title} />
        <div className="panel">
            <Infomelding
                ikon={`${getContextRoot()}/img/svg/feilmelding_ingen_kontaktinformasjon.svg`}
                ikonAlt="feilmelding ingen kontaktinformasjon"
                tittel={texts.infomelding.title}
                tekst={texts.infomelding.info}
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
