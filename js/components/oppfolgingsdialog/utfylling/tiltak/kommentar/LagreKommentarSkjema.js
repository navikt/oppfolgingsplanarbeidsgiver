import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Field, reduxForm } from 'redux-form';
import { tekstfeltRegex } from '../../../../../konstanter';
import { kommentarReducerPt } from '../../../../../proptypes/opproptypes';
import TekstOmrade from '../../../../../skjema/TekstOmrade';
import TiltakVarselFeil from '../TiltakVarselFeil';

export const KommentarBeskrivelse = ({ felt, elementId }) => {
    return (
        <div className="skjemaelement lagreKommentarSkjema__inputgruppe">
            <label
                className="skjemaelement__label"
                id={`${elementId}`}
                htmlFor={`${elementId}`}>
                {getLedetekst('oppfolgingsdialog.kommentarBeskrivelse.tittel')}
            </label>
            <Field
                className="tiltak_input--kommenter input--fullbredde"
                name={felt}
                id={`${elementId}`}
                aria-labelledby={felt}
                component={TekstOmrade}
                placeholder="Skriv inn tekst"
                rows="6"
                autoFocus
            />
        </div>
    );
};
KommentarBeskrivelse.propTypes = {
    felt: PropTypes.string,
    elementId: PropTypes.number,
};

const handleKeyPress = (avbryt, e) => {
    e.preventDefault();
    if (e.nativeEvent.keyCode === 13) {
        avbryt();
    }
};

export const LagreKommentarKnapper = ({ avbryt, spinner }) => {
    return (
        <div className="knapperad knapperad--justervenstre">
            <div className="knapperad__element">
                <Hovedknapp
                    disabled={spinner}
                    spinner={spinner}
                    htmlType="submit">
                    {getLedetekst('oppfolgingsdialog.knapp.lagre')}
                </Hovedknapp>
            </div>
            <div className="knapperad__element">
                <button
                    className="lenke lenke--avbryt"
                    type="button"
                    onKeyPress={(e) => { handleKeyPress(avbryt, e); }}
                    onMouseDown={avbryt}>
                    {getLedetekst('oppfolgingsdialog.knapp.avbryt')}
                </button>
            </div>
        </div>);
};
LagreKommentarKnapper.propTypes = {
    avbryt: PropTypes.func,
    spinner: PropTypes.bool,
};


export class LagreKommentarSkjemaComponent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            spinner: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.kommentarReducer.tiltakId === this.props.elementId) {
            this.setState({
                spinner: nextProps.kommentarReducer.lagrer,
            });
        }
    }

    handleSubmit(kommentar) {
        this.props.sendLagre(this.props.elementId, kommentar);
    }

    render() {
        const { elementId, handleSubmit, avbryt, feilMelding, kommentarFeilet } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleSubmit)} className="lagreKommentarSkjema">
                <KommentarBeskrivelse
                    felt="tekst"
                    elementId={elementId}
                />

                { kommentarFeilet &&
                <TiltakVarselFeil
                    tekst={feilMelding}
                />
                }

                <LagreKommentarKnapper
                    avbryt={avbryt}
                    spinner={this.state.spinner}
                />
            </form>
        );
    }
}
LagreKommentarSkjemaComponent.propTypes = {
    elementId: PropTypes.number,
    handleSubmit: PropTypes.func,
    sendLagre: PropTypes.func,
    avbryt: PropTypes.func,
    kommentarReducer: kommentarReducerPt,
    kommentarFeilet: PropTypes.bool,
    feilMelding: PropTypes.string,
};

const validate = (values) => {
    const feilmeldinger = {};
    if (!values.tekst || values.tekst.trim().length === 0) {
        feilmeldinger.tekst = 'Fyll inn tekst';
    } else if (values.tekst.match(tekstfeltRegex)) {
        feilmeldinger.tekst = 'Ugyldig spesialtegn er oppgitt';
    }
    const tekstLengde = values.tekst ? values.tekst.length : 0;
    const tekstMaksLengde = 1000;
    if (tekstLengde > tekstMaksLengde) {
        feilmeldinger.tekst = `Maks ${tekstMaksLengde} tegn tillatt`;
    }
    return feilmeldinger;
};

const ReduxSkjema = reduxForm({
    validate,
})(LagreKommentarSkjemaComponent);

export default ReduxSkjema;
