import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Oppfolgingsdialoger from '../../../js/components/oppfolgingsdialog/Oppfolgingsdialoger';
import OppfolgingsdialogerInnhold from '../../../js/components/oppfolgingsdialog/OppfolgingsdialogerInnhold';
import SykmeldtIngenKontaktinformasjon from '../../../js/components/oppfolgingsdialog/SykmeldtIngenKontaktinformasjon';
import getOppfolgingsplan from '../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Oppfolgingsdialoger', () => {
    let component;
    const oppfolgingsdialoger = [getOppfolgingsplan()];
    let hentNaermesteLeder;
    let hentVirksomhet;
    let hentPerson;
    let hentKontaktinfo;
    const data = {
        henter: [],
        hentet: [],
        hentingFeilet: [],
        data: [],
    };
    const naermesteleder = data;
    const virksomhet = data;
    const person = data;
    const kontaktinfo = data;
    beforeEach(() => {
        hentNaermesteLeder = sinon.spy();
        hentPerson = sinon.spy();
        hentKontaktinfo = sinon.spy();
        hentVirksomhet = sinon.spy();
        component = shallow(<Oppfolgingsdialoger
            sykmeldt={{ fnr: 'fnr', koblingId: 1 }}
            oppfolgingsdialoger={oppfolgingsdialoger}
            naermesteleder={naermesteleder}
            person={person}
            virksomhet={virksomhet}
            kontaktinfo={kontaktinfo}
            hentNaermesteLeder={hentNaermesteLeder}
            hentPerson={hentPerson}
            hentVirksomhet={hentVirksomhet}
            hentKontaktinfo={hentKontaktinfo}
        />);
    });

    it('Skal vise OppfolgingsdialogerInnhold som standard visning', () => {
        expect(component.find(OppfolgingsdialogerInnhold)).to.have.length(1);
    });

    it('Skal vise Ingenkontaktinformasjon-melding dersom ingen kontaktinformasjon', () => {
        component = shallow(<Oppfolgingsdialoger
            sykmeldt={{ fnr: 'fnr', koblingId: 1 }}
            oppfolgingsdialoger={oppfolgingsdialoger}
            naermesteleder={naermesteleder}
            person={person}
            virksomhet={virksomhet}
            kontaktinfo={{
                henter: [],
                hentet: [],
                data: [{
                    fnr: 'fnr',
                    kontaktinfo: {
                        skalHaVarsel: false,
                    },
                }],
            }}
            hentNaermesteLeder={hentNaermesteLeder}
            hentPerson={hentPerson}
            hentVirksomhet={hentVirksomhet}
            hentKontaktinfo={hentKontaktinfo}
        />);
        expect(component.find(SykmeldtIngenKontaktinformasjon)).to.have.length(1);
    });
});
