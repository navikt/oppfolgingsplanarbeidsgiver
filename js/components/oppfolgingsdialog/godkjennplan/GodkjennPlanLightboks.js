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
import { oppfolgingsplanPt } from '../../../proptypes/opproptypes';
import {
    getEndDateFromTiltakListe,
    getStartDateFromTiltakListe,
} from '../../../utils/tiltakUtils';

const texts = {
    title: 'Jeg er ferdig med planen',
    info: 'Arbeidstakeren kan deretter godkjenne eller gjøre endringer og sende planen tilbake deg.',
    titleDatovelger: 'Hvor lenge skal planen vare?',
    checkboxLabel: 'Jeg er enig i denne oppfølgingsplanen',
    approval: {
        question: 'Velg hva du vil gjøre:',
        sendForApproval: 'Send planen til arbeidstakeren for godkjenning',
        sendWithoutApproval: 'Opprett planen uten godkjenning fra arbeidstakeren',
    },
    infoWithoutApproval: 'Du kan bare velge dette hvis arbeidstakeren ikke kan eller ønsker å delta. Dette vil bli synlig i planen.',
    buttonSend: {
        approval: 'Send til godkjenning',
        noApproval: 'Opprett plan',
    },
    buttonCancel: 'Avbryt',
};

export const textDelMedNav = (arbeidstakerName) => {
    return <span>Jeg vil dele planen med NAV når {arbeidstakerName} har godkjent den</span>;
};

export class GodkjennPlanLightboksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radioSelected: false,
            createWithoutApproval: false,
            visIkkeUtfyltFeilmelding: false,
            opprettplan: '',
        };
        this.godkjennPlan = this.godkjennPlan.bind(this);
        this.handledChange = this.handledChange.bind(this);
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.props.initialize({
            opprettplan: 'true',
        });
        this.handleInitialize(this.props.oppfolgingsdialog);
        window.scrollTo(0, this.formRef.current.offsetTop);
    }

    handleInitialize(oppfolgingsplan) {
        const initData = {};
        initData.startdato = getStartDateFromTiltakListe(oppfolgingsplan.tiltakListe) || window.sessionStorage.getItem('startdato');
        initData.sluttdato = getEndDateFromTiltakListe(oppfolgingsplan.tiltakListe) || window.sessionStorage.getItem('sluttdato');
        initData.evalueringsdato = window.sessionStorage.getItem('evalueringsdato');
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
        const createWithoutApproval = e.target.value !== 'true';
        this.setState({
            radioSelected: true,
            createWithoutApproval,
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

                <h3>{texts.approval.question}</h3>

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

                { this.state.opprettplan === 'true' &&
                <Alertstripe
                    className="alertstripe--notifikasjonboks"
                    type="info"
                    solid>
                    {texts.info}
                </Alertstripe>
                }

                { this.state.radioSelected &&
                <React.Fragment>
                    <hr />

                    <h3>{texts.titleDatovelger}</h3>

                    <GodkjennPlanSkjemaDatovelger
                        oppfolgingsplan={oppfolgingsdialog}
                    />
                </React.Fragment>
                }

                { this.state.radioSelected &&
                <React.Fragment>
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
                </React.Fragment>
                }
                <div className="knapperad">
                    <div className="knapperad__element">
                        { this.state.radioSelected &&
                        <Hovedknapp
                            htmlType="submit">
                            {this.state.createWithoutApproval
                                ? texts.buttonSend.noApproval
                                : texts.buttonSend.approval
                            }
                        </Hovedknapp>
                        }
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
    oppfolgingsdialog: oppfolgingsplanPt,
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
