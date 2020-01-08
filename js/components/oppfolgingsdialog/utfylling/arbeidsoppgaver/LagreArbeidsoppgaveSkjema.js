import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Field,
    reduxForm,
} from 'redux-form';
import {
    OPPRETT_SKJEMANAVN,
    tekstfeltRegex,
} from '../../../../konstanter';
import { getContextRoot } from '../../../../routers/paths';
import * as opProptypes from '../../../../proptypes/opproptypes';
import Inputfelt from '../../../../skjema/Inputfelt';

const texts = {
    felter: {
        arbeidsoppgavenavn: {
            label: 'Navn på arbeidsoppgave',
        },
    },
};

export class LagreArbeidsoppgaveSkjemaKomponent extends Component {
    constructor() {
        super();
        this.state = {
            spinner: false,
        };
        this.avbryt = this.avbryt.bind(this);
    }

    componentDidMount() {
        this.handleInitialize();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            spinner: nextProps.arbeidsoppgaverReducer.lagrer,
        });
    }

    handleInitialize() {
        const initData = {};
        if (this.props.arbeidsoppgaverReducer) {
            initData.arbeidsoppgavenavn = this.props.arbeidsoppgaverReducer.arbeidsoppgave ? this.props.arbeidsoppgaverReducer.arbeidsoppgave.arbeidsoppgavenavn : '';
        }
        this.props.initialize(initData);
    }

    avbryt() {
        this.props.arbeidsoppgaverReducer.arbeidsoppgave = null;
        this.props.avbryt();
    }

    render() {
        const {
            handleSubmit,
            varselTekst,
            oppdateringFeilet,
        } = this.props;
        return (<form className="panel" onSubmit={handleSubmit}>
            <div className="skjemaelement">
                <label className="skjemaelement__label" id="arbeidsoppgavenavn" htmlFor="arbeidsoppgavenavn-input">
                    {texts.felter.arbeidsoppgavenavn.label}
                </label>
                <Field
                    className="skjemaelement__input input--fullbredde"
                    name="arbeidsoppgavenavn"
                    id="arbeidsoppgavenavn-input"
                    aria-labelledby="arbeidsoppgavenavn"
                    component={Inputfelt}
                    placeholder="Skriv inn tekst"
                    avbryt={this.avbryt}
                    oppdateringFeilet={oppdateringFeilet}
                    varselTekst={varselTekst}
                    spinner={this.state.spinner}
                    autoFocus
                    rootUrlImg={getContextRoot()}
                />
            </div>
        </form>
        );
    }
}

LagreArbeidsoppgaveSkjemaKomponent.propTypes = {
    arbeidsoppgaverReducer: opProptypes.arbeidsoppgaverReducerPt,
    handleSubmit: PropTypes.func,
    avbryt: PropTypes.func,
    oppdateringFeilet: PropTypes.bool,
    varselTekst: PropTypes.string,
    initialize: PropTypes.func,
};

const validate = (values) => {
    const feilmeldinger = {};
    if (!values.arbeidsoppgavenavn || (values.arbeidsoppgavenavn && values.arbeidsoppgavenavn.trim() === '')) {
        feilmeldinger.arbeidsoppgavenavn = 'Fyll inn arbeidsoppgave';
    } else if (values.arbeidsoppgavenavn.match(tekstfeltRegex)) {
        feilmeldinger.arbeidsoppgavenavn = 'Ugyldig spesialtegn er oppgitt';
    }
    const navnLengde = values.arbeidsoppgavenavn ? values.arbeidsoppgavenavn.length : 0;
    const navnMaksLengde = 100;
    if (navnLengde > navnMaksLengde) {
        feilmeldinger.arbeidsoppgavenavn = `Maks ${navnMaksLengde} tegn tillatt`;
    }
    return feilmeldinger;
};

const ReduxSkjema = reduxForm({
    form: OPPRETT_SKJEMANAVN,
    validate,
})(LagreArbeidsoppgaveSkjemaKomponent);

export default ReduxSkjema;

