import React from 'react';
import PropTypes from 'prop-types';
import {
    Knapp,
    Hovedknapp,
} from 'nav-frontend-knapper';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Feilmelding from './Feilmelding';
import { ArbeidsoppgaveVarselFeil } from '../components/oppfolgingsdialog/utfylling/arbeidsoppgaver/ArbeidsoppgaveVarselFeil';
import { fieldPropTypes } from '../proptypes/fieldproptypes';

const handleKeyPress = (avbryt, e) => {
    e.preventDefault();
    if (e.nativeEvent.keyCode === 13) {
        avbryt();
    }
};

const Inputfelt = (props) => {
    const {
        meta,
        className,
        input,
        id,
        avbryt,
        oppdateringFeilet,
        varselTekst,
        spinner,
        rootUrlImg,
    } = props;
    return (
        <div className="arbeidsgiveroppgave__rad">
            <input
                className={`${className}${meta.touched && meta.error ? ' skjemaelement__input--harFeil' : ''}`}
                {...input}
                autoComplete="off"
                placeholder={props.placeholder}
                type={props.type || 'text'}
                id={id}
            />
            <div className="arbeidsgiveroppgave__rad--feilmelding">
                <Feilmelding {...meta} />
            </div>

            { oppdateringFeilet &&
            <ArbeidsoppgaveVarselFeil
                tekst={varselTekst}
                rootUrlImg={rootUrlImg}
            />
            }
            <div className="knapperad knapperad--justervenstre" >
                <div className="knapperad__element">
                    <Hovedknapp
                        disabled={spinner}
                        spinner={spinner}
                        htmlType="submit"
                        mini
                        id="leggtillKnapp"
                        name="leggtillKnapp">
                        {getLedetekst('oppfolgingsdialog.knapp.ny-arbeidsoppgave')}
                    </Hovedknapp>
                </div>

                <div className="knapperad__element">
                    <Knapp
                        mini
                        onKeyPress={(e) => { handleKeyPress(avbryt, e); }}
                        onMouseDown={avbryt}>
                        {getLedetekst('oppfolgingsdialog.knapp.avbryt')}
                    </Knapp>
                </div>
            </div>
        </div>);
};

Inputfelt.propTypes = {
    meta: fieldPropTypes.meta,
    id: PropTypes.string,
    input: fieldPropTypes.input,
    type: PropTypes.string,
    className: PropTypes.string,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
    avbryt: PropTypes.func,
    oppdateringFeilet: PropTypes.bool,
    spinner: PropTypes.bool,
    varselTekst: PropTypes.string,
    rootUrlImg: PropTypes.string,
};

export default Inputfelt;
