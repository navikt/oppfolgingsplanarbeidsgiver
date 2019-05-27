import React from 'react';
import chai from 'chai';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import OppfolgingsplanerIngenplan from '../../../../js/components/oppfolgingsdialog/opprett/OppfolgingsplanerIngenplan';
import OppfolgingsplanerIngenplanKnapper from '../../../../js/components/oppfolgingsdialog/opprett/OppfolgingsplanerIngenplanKnapper';
import getOppfolgingsdialog, {
    hentOppfolgingsdialogTidligere,
} from '../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;
const assert = chai.assert;

describe('OppfolgingsplanerIngenplan', () => {
    let klokke;
    const dagensDato = new Date('2017-01-01');

    let komponent;
    let opprett;
    let visOppfolgingsdialogOpprett;
    let arbeidsgiver;

    beforeEach(() => {
        klokke = sinon.useFakeTimers(dagensDato.getTime());
        opprett = sinon.spy();
        visOppfolgingsdialogOpprett = sinon.spy();
        arbeidsgiver = {
            virksomhetsnummer: '12345678',
        };
        komponent = mount(<OppfolgingsplanerIngenplan
            opprett={opprett}
            oppfolgingsdialoger={[]}
            visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
            rootUrl=""
        />);
    });

    afterEach(() => {
        klokke.restore();
    });

    it('Skal vise OppfolgingsplanerIngenplanKnapper', () => {
        expect(komponent.find(OppfolgingsplanerIngenplanKnapper)).to.have.length(1);
    });

    describe('OppfolgingsplanerIngenplanKnapper', () => {
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
            komponent = mount(<OppfolgingsplanerIngenplan
                opprett={opprett}
                visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
                oppfolgingsdialoger={[oppfolgingsdialogIkkeTidligere]}
                rootUrl=""
            />);
            komponent.find('button').simulate('click');
            assert(opprett.calledOnce, true);
        });

        it('Skal vise knapp som kaller visOppfolgingsdialogOpprett, om AT har tidligere godkjent oppfolgingsdialog med virksomhet', () => {
            komponent = mount(<OppfolgingsplanerIngenplan
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
