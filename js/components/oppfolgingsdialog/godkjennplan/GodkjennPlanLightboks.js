import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import {
    fraInputdatoTilJSDato,
    sluttDatoSenereEnnStartDato,
} from '../../../utils/datoUtils';
import { GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN } from '../../../konstanter';
import { erIkkeOppfolgingsdialogUtfylt } from '../../../utils/oppfolgingsplanUtils';
import Radioknapper from '../../../skjema/Radioknapper';
import CheckboxSelvstendig from '../../../skjema/CheckboxSelvstendig';
import GodkjennPlanSkjemaDatovelger from './GodkjennPlanSkjemaDatovelger';
import { oppfolgingsdialogPt } from '../../../proptypes/opproptypes';

const texts = {
    title: 'Du sender nå en oppfølgingsplan til arbeidstakeren for godkjenning',
    info: `
        Arbeidstakeren kan deretter gjøre endringer i oppfølgingsplanen. Da får du den til ny godkjenning.
        Alle godkjente planer mellom deg og arbeidstakeren vil også bli tilgjengelige for de hos dere som har tilganger i Altinn.
    `,
    titleDatovelger: 'Når skal planen vare fra og til?',
    checkboxLabel: 'Jeg er enig i denne oppfølgingsplanen',
    approval: {
        sendForApproval: 'Send planen til arbeidstakeren for godkjenning',
        sendWithoutApproval: 'Opprett en utgave uten godkjenning fra arbeidstakeren',
    },
    infoWithoutApproval: 'En plan uten godkjenning fra den sykmeldte skal kun opprettes dersom den sykmeldte ikke kan eller ønsker å delta. Dette vil bli synlig i planen.',
    buttonSend: 'Send til godkjenning',
    buttonCancel: 'Avbryt',
};

export const textDelMedNav = (arbeidstakerName) => {
    return <span>Jeg ønsker å dele planen med NAV når <b>{arbeidstakerName}</b> har godkjent planen</span>;
};

export class GodkjennPlanLightboksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visIkkeUtfyltFeilmelding: false,
            opprettplan: 'true',
        };
        this.godkjennPlan = this.godkjennPlan.bind(this);
        this.handledChange = this.handledChange.bind(this);
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.props.initialize({
            opprettplan: 'true',
        });
        this.handleInitialize();
        window.scrollTo(0, this.formRef.current.offsetTop);
    }

    handleInitialize() {
        const initData = {};
        initData.startdato = window.sessionStorage.getItem('startdato');
        initData.sluttdato = window.sessionStorage.getItem('sluttdato');
        initData.evalueringsdato = window.sessionStorage.getItem('evalueringsdato');
        initData.opprettplan = true;
        initData.delMedNav = false;
        this.props.initialize(initData);
    }

    godkjennPlan(values) {
        const { oppfolgingsdialog } = this.props;
        if (erIkkeOppfolgingsdialogUtfylt(oppfolgingsdialog)) {
            this.setState({
                visIkkeUtfyltFeilmelding: true,
            });
        } else {
            const gyldighetstidspunkt = {
                fom: new Date(fraInputdatoTilJSDato(values.startdato)),
                tom: new Date(fraInputdatoTilJSDato(values.sluttdato)),
                evalueres: new Date(fraInputdatoTilJSDato(values.evalueringsdato)),
            };
            this.props.godkjennPlan(gyldighetstidspunkt, this.state.opprettplan, values.delMedNav);
        }
    }

    handledChange(e) {
        this.setState({
            opprettplan: e.target.value,
            visIkkeUtfyltFeilmelding: false,
        });
    }

    render() {
        const {
            avbryt,
            handleSubmit,
            oppfolgingsdialog,
        } = this.props;
        return (<div ref={this.formRef} className="panel godkjennPlanLightboks">
            <form onSubmit={handleSubmit(this.godkjennPlan)} className="godkjennPlanSkjema">
                <h2>{texts.title}</h2>

                <div className="inputgruppe">
                    <Field
                        name="opprettplan"
                        id="opprettplan"
                        component={Radioknapper}
                        onChange={(e) => { this.handledChange(e); }}
                    >
                        <input
                            key="opprettplan-1"
                            value={'true'}
                            label={texts.approval.sendForApproval}
                            id="giGodkjenning"
                            disabled={this.state.visIkkeUtfyltFeilmelding}
                        />
                        <input
                            key="opprettplan-2"
                            value={'tvungenGodkjenning'}
                            label={texts.approval.sendWithoutApproval}
                            id="opprettUtenGodkjenning"
                            disabled={this.state.visIkkeUtfyltFeilmelding}
                        />
                    </Field>
                </div>

                { this.state.opprettplan === 'tvungenGodkjenning' &&
                <Alertstripe
                    className="alertstripe--notifikasjonboks"
                    type="info"
                    solid>
                    {texts.infoWithoutApproval}
                </Alertstripe>
                }

                <p>{texts.info}</p>

                <hr />

                <h3>{texts.titleDatovelger}</h3>

                <GodkjennPlanSkjemaDatovelger />

                <hr />

                <div className="inputgruppe">
                    <div className="skjema__input">
                        <Field
                            className="checkboks"
                            id="godkjennInput"
                            name="godkjennInput"
                            component={CheckboxSelvstendig}
                            label={texts.checkboxLabel}
                        />
                        <Field
                            className="checkboks"
                            id="delMedNav"
                            name="delMedNav"
                            component={CheckboxSelvstendig}
                            label={textDelMedNav(oppfolgingsdialog.arbeidstaker.navn)}
                        />
                    </div>
                </div>

                <div className="knapperad">
                    <div className="knapperad__element">
                        <Hovedknapp
                            htmlType="submit">
                            {texts.buttonSend}
                        </Hovedknapp>
                    </div>
                    <div className="knapperad__element">
                        <button
                            type="button"
                            className="lenke"
                            onClick={() => {
                                avbryt();
                            }}>
                            {texts.buttonCancel}
                        </button>
                    </div>
                </div>
            </form>
        </div>);
    }
}

GodkjennPlanLightboksComponent.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    avbryt: PropTypes.func,
    initialize: PropTypes.func,
    handleSubmit: PropTypes.func,
    godkjennPlan: PropTypes.func,
};

const validate = (values) => {
    const feilmeldinger = {};

    if (values.startdato && values.sluttdato && !sluttDatoSenereEnnStartDato(values.startdato, values.sluttdato)) {
        feilmeldinger.sluttdato = 'Sluttdato må være etter startdato';
    }
    if (values.startdato && values.evalueringsdato && !sluttDatoSenereEnnStartDato(values.startdato, values.evalueringsdato)) {
        feilmeldinger.evalueringsdato = 'Evalueringsdato må være etter startdato';
    }
    if (!values.godkjennInput === true) {
        feilmeldinger.godkjennInput = 'Du må godkjenne planen for å komme videre';
    }
    return feilmeldinger;
};

const ReduxSkjema = reduxForm({
    form: GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN,
    validate,
})(GodkjennPlanLightboksComponent);

export default ReduxSkjema;
