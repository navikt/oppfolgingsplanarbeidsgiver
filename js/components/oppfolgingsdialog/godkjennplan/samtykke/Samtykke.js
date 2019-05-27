import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { getLedetekst, getHtmlLedetekst } from 'digisyfo-npm';
import { oppfolgingsdialogPt } from '../../../../proptypes/proptypes';
import { getContextRoot } from '../../../../routers/paths';

class Samtykke extends Component {
    constructor(props) {
        super(props);
        this.state = {
            samtykke: null,
        };
        this.sendSamtykke = this.sendSamtykke.bind(this);
        this.settSamtykke = this.settSamtykke.bind(this);
    }

    settSamtykke(samtykke) {
        this.setState({
            samtykke,
        });
    }

    sendSamtykke() {
        const { oppfolgingsdialog } = this.props;
        this.props.sendSamtykke(oppfolgingsdialog.id, this.state.samtykke, oppfolgingsdialog.arbeidstaker.fnr);
    }

    render() {
        return (<div className="panel blokk">
            <div className="illustrertTittel">
                <img className="illustrertTittel__img" src={`${getContextRoot()}/img/svg/samtykke-illustrasjon.svg`} alt="samtykke" />
                <h2 className="illustrertTittel__tittel">
                    {getLedetekst('oppfolgingsdialog.samtykke.tittel')}
                </h2>
            </div>
            <p className="samtykke__tekst" dangerouslySetInnerHTML={getHtmlLedetekst('oppfolgingsdialog.samtykke.tekst')} />
            <div className="inputgruppe inputgruppe--samtykke">
                <div tabIndex="-1" id="samtykkeGitt" className="skjema__feilomrade">
                    <div className="inputgruppe">
                        <div className="skjemaelement">
                            <input
                                type="radio"
                                className="skjemaelement__input radioknapp"
                                id="giSamtykke"
                                name="samtykkeGitt"
                                value="true"
                                onChange={() => { this.settSamtykke(true); }}
                            />
                            <label
                                className="skjemaelement__label"
                                htmlFor="giSamtykke">
                                {getLedetekst('oppfolgingsdialog.samtykke.radioknapp.gi-samtykke.tekst')}
                            </label>
                        </div>
                        <div className="skjemaelement">
                            <input
                                type="radio"
                                className="skjemaelement__input radioknapp"
                                id="ikkeGiSamtykke"
                                name="samtykkeGitt"
                                value="false"
                                onChange={() => { this.settSamtykke(false); }}
                            />
                            <label
                                className="skjemaelement__label ikkeGiSamtykke"
                                htmlFor="ikkeGiSamtykke">
                                {getLedetekst('oppfolgingsdialog.samtykke.radioknapp.ikke-gi-samtykke.tekst')}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="knapperad">
                <div className="knapperad__element">
                    <Hovedknapp
                        htmlType="submit"
                        onClick={this.sendSamtykke}
                        disabled={this.state.samtykke === null}>
                        {getLedetekst('oppfolgingsdialog.samtykke.knapp.samtykk')}
                    </Hovedknapp>
                </div>
            </div>
        </div>);
    }
}
Samtykke.propTypes = {
    sendSamtykke: PropTypes.func,
    oppfolgingsdialog: oppfolgingsdialogPt,
};

export default Samtykke;
