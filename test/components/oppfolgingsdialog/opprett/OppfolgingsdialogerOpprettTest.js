import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    BaserTidligereSkjema,
} from 'oppfolgingsdialog-npm';
import Lightbox from '../../../../js/components/Lightbox';
import OppfolgingsdialogerOpprett from '../../../../js/components/oppfolgingsdialog/opprett/OppfolgingsdialogerOpprett';
import getOppfolgingsdialog, {
    hentOppfolgingsdialogTidligere,
} from '../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;
const assert = chai.assert;

describe('OppfolgingsdialogerOpprett', () => {
    const dagensDato = new Date('2017-01-01');
    dagensDato.setHours(0, 0, 0, 0);
    let klokke;
    let komponent;
    let kopier;
    let opprett;
    let visOppfolgingsdialogOpprett;
    let arbeidsgiver;
    let wrapper;
    const oppfolgingsdialog = getOppfolgingsdialog();
    beforeEach(() => {
        klokke = sinon.useFakeTimers(dagensDato.getTime());
        kopier = sinon.spy();
        opprett = sinon.spy();
        visOppfolgingsdialogOpprett = sinon.spy();
        arbeidsgiver = {
            virksomhetsnummer: '1234568',
        };

        komponent = shallow(<OppfolgingsdialogerOpprett
            oppfolgingsdialoger={[oppfolgingsdialog]}
            visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
            kopier={kopier}
            opprett={opprett}
        />);
        wrapper = komponent.instance();
    });

    afterEach(() => {
        klokke.restore();
    });

    it('Skal vise Lightbox', () => {
        expect(komponent.find(Lightbox)).to.have.length(1);
    });

    it('Skal vise BaserTidligereSkjema', () => {
        expect(komponent.find(BaserTidligereSkjema)).to.have.length(1);
    });

    describe('opprett', () => {
        it('Skal kalle opprett dersom BaserTidligereSkjema blir utfylt med baserPaaTidligerePlan=true', () => {
            const oppfolgingsdialogTidligere = {
                ...hentOppfolgingsdialogTidligere(dagensDato),
                virksomhet: {
                    virksomhetsnummer: arbeidsgiver.virksomhetsnummer,
                },
            };
            const komponentMedTidligereDialog = shallow(<OppfolgingsdialogerOpprett
                oppfolgingsdialoger={[oppfolgingsdialogTidligere]}
                visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
                kopier={kopier}
                opprett={opprett}
            />);
            const wrapperTidligereDialog = komponentMedTidligereDialog.instance();
            wrapperTidligereDialog.opprett({
                baserPaaTidligerePlan: 'true',
            });
            assert(kopier.calledOnce, true);
        });

        it('Skal kalle opprett dersom BaserTidligereSkjema blir utfylt med baserPaaTidligerePlan=false', () => {
            wrapper.opprett({
                baserPaaTidligerePlan: 'false',
            });
            assert(opprett.calledOnce, true);
        });
    });
});
