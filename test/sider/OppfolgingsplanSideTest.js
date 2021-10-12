import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { OppfolgingsplanSide as Container } from '../../js/sider/OppfolgingsplanSide';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import OppfolgingsplanInfoboks from '../../js/components/app/OppfolgingsplanInfoboks';
import Oppfolgingsdialog from '../../js/components/oppfolgingsdialog/Oppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsplanSide', () => {
  describe('mapStateToProps', () => {
    let clock;
    const dagensDato = new Date('2017-01-01');
    beforeEach(() => {
      clock = sinon.useFakeTimers(dagensDato.getTime());
    });

    afterEach(() => {
      clock.restore();
    });
  });

  describe('OppfolgingsdialogSideComponent', () => {
    let sjekkTilgang;
    let hentOppfolgingsplaner;
    let settDialog;
    let hentArbeidsforhold;
    let hentSykmeldt;
    let alleOppfolgingsdialogerReducer;
    let oppfolgingsdialogerReducer;
    let sykmeldtReducer;
    let tilgang;
    const sykmeldt = {
      fnr: '1000000000000',
      navn: 'fornavn etternavn',
      orgnummer: '81549300',
      narmestelederId: '123',
    };
    const harTilgang = {
      harTilgang: true,
    };
    const ikkeTilgang = {
      harTilgang: false,
    };
    const navigasjontoggles = {
      steg: 1,
    };

    beforeEach(() => {
      alleOppfolgingsdialogerReducer = {};
      sykmeldtReducer = {};
      oppfolgingsdialogerReducer = {};
      tilgang = { data: {} };
      sjekkTilgang = sinon.spy();
      hentOppfolgingsplaner = sinon.spy();
      settDialog = sinon.spy();
      hentArbeidsforhold = sinon.spy();
      hentSykmeldt = sinon.spy();
    });

    it('Skal vise spinner dersom data hentes', () => {
      const component = shallow(
        <Container
          alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
          oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
          sykmeldtReducer={sykmeldtReducer}
          tilgang={tilgang}
          oppfolgingsdialoger={[]}
          henter
          hentet={false}
          hentOppfolgingsplaner={hentOppfolgingsplaner}
          sjekkTilgang={sjekkTilgang}
          settDialog={settDialog}
          hentArbeidsforhold={hentArbeidsforhold}
          hentSykmeldt={hentSykmeldt}
        />
      );
      expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it('Skal vise spinner dersom sender', () => {
      const component = shallow(
        <Container
          alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
          oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
          sykmeldtReducer={sykmeldtReducer}
          tilgang={tilgang}
          oppfolgingsdialoger={[]}
          sender
          hentet={false}
          hentOppfolgingsplaner={hentOppfolgingsplaner}
          sjekkTilgang={sjekkTilgang}
          settDialog={settDialog}
          hentArbeidsforhold={hentArbeidsforhold}
          hentSykmeldt={hentSykmeldt}
        />
      );
      expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it('Skal vise feilmelding dersom hentingFeilet', () => {
      const component = shallow(
        <Container
          alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
          oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
          sykmeldtReducer={sykmeldtReducer}
          tilgang={tilgang}
          oppfolgingsdialoger={[]}
          hentet={false}
          hentingFeilet
          hentOppfolgingsplaner={hentOppfolgingsplaner}
          sjekkTilgang={sjekkTilgang}
          settDialog={settDialog}
          hentArbeidsforhold={hentArbeidsforhold}
          hentSykmeldt={hentSykmeldt}
        />
      );
      expect(component.contains(<Feilmelding />)).to.equal(true);
    });

    it('Skal vise feilmelding dersom sendingFeilet', () => {
      const component = shallow(
        <Container
          alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
          oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
          sykmeldtReducer={sykmeldtReducer}
          tilgang={tilgang}
          oppfolgingsdialoger={[]}
          hentet={false}
          sendingFeilet
          hentOppfolgingsplaner={hentOppfolgingsplaner}
          sjekkTilgang={sjekkTilgang}
          settDialog={settDialog}
          hentArbeidsforhold={hentArbeidsforhold}
          hentSykmeldt={hentSykmeldt}
        />
      );
      expect(component.contains(<Feilmelding />)).to.equal(true);
    });

    it('Skal vise OppfolgingsplanInfoboks dersom leder ikke har tilgang', () => {
      const component = shallow(
        <Container
          alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
          oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
          sykmeldtReducer={sykmeldtReducer}
          oppfolgingsdialoger={[]}
          tilgang={{ data: ikkeTilgang }}
          hentOppfolgingsplaner={hentOppfolgingsplaner}
          sjekkTilgang={sjekkTilgang}
          settDialog={settDialog}
          hentArbeidsforhold={hentArbeidsforhold}
          hentSykmeldt={hentSykmeldt}
          sykmeldt={sykmeldt}
        />
      );
      expect(component.find(OppfolgingsplanInfoboks)).to.have.length(1);
    });

    it('Skal vise Oppfolgingsdialoger dersom henting er OK', () => {
      const component = shallow(
        <Container
          alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
          oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
          sykmeldtReducer={sykmeldtReducer}
          oppfolgingsdialoger={[]}
          tilgang={{ data: harTilgang }}
          hentOppfolgingsplaner={hentOppfolgingsplaner}
          sjekkTilgang={sjekkTilgang}
          settDialog={settDialog}
          hentArbeidsforhold={hentArbeidsforhold}
          navigasjontoggles={navigasjontoggles}
          hentSykmeldt={hentSykmeldt}
          sykmeldt={sykmeldt}
        />
      );
      expect(component.find(Oppfolgingsdialog)).to.have.length(1);
    });
  });
});
