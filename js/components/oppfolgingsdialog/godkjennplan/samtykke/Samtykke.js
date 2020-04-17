import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { oppfolgingsplanPt } from '../../../../proptypes/opproptypes';
import { getContextRoot } from '../../../../routers/paths';
import { erArbeidstakerEgenLeder } from '../../../../utils/oppfolgingsplanUtils';

const texts = {
    title: 'Vil du gjøre det lettere for andre som skal fylle ut?',
    approve: {
        yes: 'Ja, jeg samtykker til at dere kan bruke det jeg skriver til å lage statistikk og komme med forslag',
        no: 'Nei, ikke bruk det jeg skriver',
    },
    info: {
        paragraph1: `Vi ønsker at oppfølgingsplanen skal bli nyttig for sykmeldte og arbeidsgivere.
        Derfor samler vi inn tiltak fra oppfølgingsplanene og lager statistikk over hva som kan fungere på arbeidsplassen.
        Slik kan vi komme med forslag når noen fyller ut en ny oppfølgingsplan.`,
        paragraph2: 'Når vi samler inn opplysningene, kan verken vi eller andre spore disse tilbake til deg fordi opplysningene er blitt helt anonymisert.',
        paragraph3: 'Det har ingen konsekvenser for deg å si nei til at vi kan bruke det du skriver.',
    },
    buttonSubmit: 'Velg',
};

const InfoText = () => {
    return (
        <React.Fragment>
            {texts.info.paragraph1}
            <br />
            <br />
            {texts.info.paragraph2}
            <br />
            <br />
            {texts.info.paragraph3}
        </React.Fragment>
    );
};

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
        this.props.sendSamtykke(oppfolgingsdialog.id, this.state.samtykke, oppfolgingsdialog.arbeidstaker.fnr, erArbeidstakerEgenLeder(oppfolgingsdialog));
    }

    render() {
        return (<div className="panel blokk">
            <div className="illustrertTittel">
                <img className="illustrertTittel__img" src={`${getContextRoot()}/img/svg/samtykke-illustrasjon.svg`} alt="samtykke" />
                <h2 className="illustrertTittel__tittel">
                    {texts.title}
                </h2>
            </div>
            <p className="samtykke__tekst">
                <InfoText />
            </p>
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
                                {texts.approve.yes}
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
                                {texts.approve.no}
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
                        {texts.buttonSubmit}
                    </Hovedknapp>
                </div>
            </div>
        </div>);
    }
}
Samtykke.propTypes = {
    sendSamtykke: PropTypes.func,
    oppfolgingsdialog: oppfolgingsplanPt,
};

export default Samtykke;
