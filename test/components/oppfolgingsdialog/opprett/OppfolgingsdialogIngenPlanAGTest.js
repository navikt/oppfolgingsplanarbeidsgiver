import React from 'react';
import chai from 'chai';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { OppfolgingsdialogerIngenplan } from 'oppfolgingsdialog-npm';
import OppfolgingsdialogerIngenplanAG from '../../../../js/components/oppfolgingsdialog/opprett/OppfolgingsdialogerIngenplanAG';
import OppfolgingsdialogerIngenplanKnapper from '../../../../js/components/oppfolgingsdialog/opprett/OppfolgingsdialogerIngenplanKnapper';
import getOppfolgingsdialog, {
    hentOppfolgingsdialogTidligere,
} from '../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;
const assert = chai.assert;

describe('OppfolgingsdialogerIngenplanAG', () => {
    let klokke;
    const dagensDato = new Date('2017-01-01');

    let komponent;
    let ledetekster;
    let opprett;
    let visOppfolgingsdialogOpprett;
    let arbeidsgiver;

    beforeEach(() => {
        klokke = sinon.useFakeTimers(dagensDato.getTime());
        ledetekster = {};
        opprett = sinon.spy();
        visOppfolgingsdialogOpprett = sinon.spy();
        arbeidsgiver = {
            virksomhetsnummer: '12345678',
        };
        komponent = mount(<OppfolgingsdialogerIngenplanAG
            ledetekster={ledetekster}
            opprett={opprett}
            oppfolgingsdialoger={[]}
            visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
            rootUrl=""
        />);
    });

    afterEach(() => {
        klokke.restore();
    });

    it('Skal vise OppfolgingsdialogerIngenplanKnapper', () => {
        expect(komponent.find(OppfolgingsdialogerIngenplan)).to.have.length(1);
    });

    it('Skal vise OppfolgingsdialogerIngenplanKnapper', () => {
        expect(komponent.find(OppfolgingsdialogerIngenplanKnapper)).to.have.length(1);
    });

    describe('OppfolgingsdialogerIngenplanKnapper', () => {
        let oppfolgingsdialogTidligere;
        let oppfolgingsdialogIkkeTidligere;
        let virksomhet;

        beforeEach(() => {
            virksomhet = { virksomhetsnummer: arbeidsgiver.virksomhetsnummer };
            oppfolgingsdialogTidligere = {
                ...hentOppfolgingsdialogTidligere(dagensDato),
                virksomhet,
            };
            oppfolgingsdialogIkkeTidligere = {
                ...getOppfolgingsdialog(),
                virksomhet,
                godkjentplan: null,
            };
        });

        it('Skal vise knapp for aa opprett ny dialog', () => {
            expect(komponent.find('button')).to.have.length(1);
        });

        it('Skal vise knapp som kaller opprett, om oppfolgingsdialog er opprettbar direkte uten ekstra utfylling', () => {
            komponent = mount(<OppfolgingsdialogerIngenplanAG
                ledetekster={ledetekster}
                opprett={opprett}
                visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
                oppfolgingsdialoger={[oppfolgingsdialogIkkeTidligere]}
                rootUrl=""
            />);
            komponent.find('button').simulate('click');
            assert(opprett.calledOnce, true);
        });

        it('Skal vise knapp som kaller visOppfolgingsdialogOpprett, om AT har tidligere godkjent oppfolgingsdialog med virksomhet', () => {
            komponent = mount(<OppfolgingsdialogerIngenplanAG
                ledetekster={ledetekster}
                opprett={opprett}
                visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
                oppfolgingsdialoger={[oppfolgingsdialogTidligere]}
                rootUrl=""
            />);
            komponent.find('button').simulate('click');
            assert(visOppfolgingsdialogOpprett.calledOnce, true);
        });
    });
});
