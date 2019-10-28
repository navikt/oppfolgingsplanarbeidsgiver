import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import rewire from 'rewire';
import Alertstripe from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import {
    setLedetekster,
} from '@navikt/digisyfo-npm';
import { GodkjennPlanLightboksComponent } from '../../../../js/components/oppfolgingsdialog/godkjennplan/GodkjennPlanLightboks';
import GodkjennPlanSkjemaDatovelger from '../../../../js/components/oppfolgingsdialog/godkjennplan/GodkjennPlanSkjemaDatovelger';
import getOppfolgingsdialog from '../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjennPlanLightboks', () => {
    const ledetekster = {
        data: {
            'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.navn': 'Dette er en test',
            'oppfolgingsdialog.arbeidsgiver.arbeidsoppgave.info': 'Dette er en test',
        },
    };
    setLedetekster(ledetekster);
    let komponent;
    let handleSubmit;
    let initialize;

    beforeEach(() => {
        handleSubmit = sinon.spy();
        initialize = sinon.spy(); // Veden: Lager en spy og sender den inn til GodkjennPlanSkjemaAG
        komponent = shallow(<GodkjennPlanLightboksComponent
            oppfolgingsdialog={getOppfolgingsdialog()}
            GodkjennPlanSkjemaDatovelger={GodkjennPlanSkjemaDatovelger}
            handleSubmit={handleSubmit}
            initialize={initialize}
        />);
    });

    it('Skal vise panel', () => {
        expect(komponent.find('div.panel')).to.have.length(1);
    });

    it('Skal vise et godkjennPlanSkjema', () => {
        expect(komponent.find('form.godkjennPlanSkjema')).to.have.length(1);
    });

    it('Skal vise overskrifter og tekster', () => {
        expect(komponent.find('h2')).to.have.length(1);
        expect(komponent.find('h3')).to.have.length(1);
        expect(komponent.find('p')).to.have.length(1);
    });

    it('Skal vise GodkjennPlanSkjemaDatovelger', () => {
        expect(komponent.find(GodkjennPlanSkjemaDatovelger)).to.have.length(1);
    });

    it('Skal vise Alertstripe, dersom tvungenGodkjenning er valgt', () => {
        komponent.setState({
            opprettplan: 'tvungenGodkjenning',
        });
        expect(komponent.find(Alertstripe)).to.have.length(1);
    });

    it('Skal ikke vise Alertstripe, dersom tvungenGodkjenning ikke er valgt', () => {
        komponent.setState({
            opprettplan: '',
        });
        expect(komponent.find(Alertstripe)).to.have.length(0);
    });

    it('Skal vise en submit knapp', () => {
        expect(komponent.find(Hovedknapp)).to.have.length(1);
    });

    it('Skal sjekke validate', () => {
        komponent = shallow(<GodkjennPlanLightboksComponent
            oppfolgingsdialog={getOppfolgingsdialog()}
            handleSubmit={handleSubmit}
            initialize={initialize}
        />);
        const validering = {
            startdato: '01.01.2018',
            sluttdato: '01.02.2018',
            godkjennInput: true,
        };
        const validerMedFeilsluttDato = {
            startdato: '01.02.2018',
            sluttdato: '01.01.2018',
            godkjennInput: true,
        };
        const vvalideringMedFeilEvalueringsdato = {
            startdato: '01.01.2018',
            sluttdato: '01.02.2018',
            evalueringsdato: '01.01.2018',
            godkjennInput: true,
        };
        const vvalideringIkkeGodk = {
            godkjennInput: false,
        };
        const re = rewire('../../../../js/components/oppfolgingsdialog/godkjennplan/GodkjennPlanLightboks');
        const test = re.__get__('validate');
        expect(test(validering)).to.deep.equal({});
        expect(test(validerMedFeilsluttDato).sluttdato).to.deep.equal('Sluttdato må være etter startdato');
        expect(test(vvalideringMedFeilEvalueringsdato).evalueringsdato).to.deep.equal('Evalueringsdato må være etter startdato');
        expect(test(vvalideringIkkeGodk).godkjennInput).to.deep.equal('Du må godkjenne planen for å komme videre');
    });
});
