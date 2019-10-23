import chai from 'chai';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Alertstripe from 'nav-frontend-alertstriper';
import {
    Hovedknapp,
    Knapp,
} from 'nav-frontend-knapper';
import { Bjorn } from '@navikt/digisyfo-npm';
import AppSpinner from '../../../../js/components/AppSpinner';
import ReviderEllerGodkjennPlan, {
    ReviderEllerGodkjennPlanKnapperad,
} from '../../../../js/components/oppfolgingsdialog/godkjennplan/ReviderEllerGodkjennPlan';
import IkkeUtfyltPlanFeilmelding from '../../../../js/components/oppfolgingsdialog/godkjennplan/IkkeUtfyltPlanFeilmelding';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('ReviderEllerGodkjennPlan', () => {
    let komponent;
    let forespoerselRevidering;
    let forespoerRevidering;
    let settAktivtSteg;

    beforeEach(() => {
        forespoerselRevidering = {};
        forespoerRevidering = sinon.spy();
        settAktivtSteg = sinon.spy();
        komponent = shallow(<ReviderEllerGodkjennPlan
            forespoerselRevidering={forespoerselRevidering}
            forespoerRevidering={forespoerRevidering}
            settAktivtSteg={settAktivtSteg}
        />);
    });

    it('Skal vise AppSpinner', () => {
        const forespoerselRevideringSender = {
            sender: true,
        };
        const komponentForespoerselSender = shallow(<ReviderEllerGodkjennPlan
            forespoerselRevidering={forespoerselRevideringSender}
            forespoerRevidering={forespoerRevidering}
            settAktivtSteg={settAktivtSteg}
        />);
        expect(komponentForespoerselSender.find(AppSpinner)).to.have.length(1);
    });

    it('Skal vise Alertstripe', () => {
        const forespoerselRevideringSendt = {
            sendt: true,
        };
        const komponentForespoerselSendt = shallow(<ReviderEllerGodkjennPlan
            forespoerselRevidering={forespoerselRevideringSendt}
            forespoerRevidering={forespoerRevidering}
            settAktivtSteg={settAktivtSteg}
        />);
        expect(komponentForespoerselSendt.find(Alertstripe)).to.have.length(1);
    });

    describe('Standard visning', () => {
        it('Skal vise Bjorn', () => {
            expect(komponent.find(Bjorn)).to.have.length(1);
        });

        it('Skal vise ReviderEllerGodkjennPlanKnapperad', () => {
            expect(komponent.find(ReviderEllerGodkjennPlanKnapperad)).to.have.length(1);
        });

        it('Skal ikke vise IkkeUtfyltPlanFeilmelding, om visIkkeUtfyltFeilmelding er false', () => {
            expect(komponent.find(IkkeUtfyltPlanFeilmelding)).to.have.length(0);
        });

        it('Skal vise IkkeUtfyltPlanFeilmelding, om visIkkeUtfyltFeilmelding er true', () => {
            komponent.setState({
                visIkkeUtfyltFeilmelding: true,
            });
            expect(komponent.find(IkkeUtfyltPlanFeilmelding)).to.have.length(1);
        });
    });

    describe('ReviderEllerGodkjennPlanKnapperad', () => {
        const komponentSub = shallow(<ReviderEllerGodkjennPlanKnapperad />);
        it('Skal vise 1 Knapp', () => {
            expect(komponentSub.find(Knapp)).to.have.length(1);
        });

        it('Skal vise 1 Hovedknapp', () => {
            expect(komponentSub.find(Hovedknapp)).to.have.length(1);
        });
    });
});
