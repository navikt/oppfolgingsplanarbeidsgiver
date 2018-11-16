import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { Hovedknapp } from 'nav-frontend-knapper';
import {
    OppfolgingsdialogInfoboks,
} from 'oppfolgingsdialog-npm';
import Oppfolgingsdialoger, {
    AvkreftetLederInfoboks,
} from '../../../js/components/oppfolgingsdialog/Oppfolgingsdialoger';
import OppfolgingsdialogerInnhold from '../../../js/components/oppfolgingsdialog/OppfolgingsdialogerInnhold';
import SykmeldtIngenKontaktinformasjon from '../../../js/components/oppfolgingsdialog/SykmeldtIngenKontaktinformasjon';
import { getOppfolgingsdialoger } from '../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Oppfolgingsdialoger', () => {
    let component;
    const oppfolgingsdialoger = getOppfolgingsdialoger;
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

    it('Skal vise AvkreftetLederInfoboks, dersom det ikke er oppfolgingsdialoger og naermeste leder er avkreftet', () => {
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
            slettetSykmeldt
        />);

        expect(component.find(AvkreftetLederInfoboks)).to.have.length(1);
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

    describe('AvkreftetLederInfoboks', () => {
        it('Skal vise OppfolgingsdialogInfoboks', () => {
            component = shallow(<AvkreftetLederInfoboks />);
            expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
        });

        it('Skal vise knapp', () => {
            component = shallow(<AvkreftetLederInfoboks />);
            expect(component.find(Hovedknapp)).to.have.length(1);
        });
    });
});
