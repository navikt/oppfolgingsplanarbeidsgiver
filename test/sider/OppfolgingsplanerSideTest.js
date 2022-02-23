import chai from 'chai';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { mapStateToProps, OppfolgingsplanerSide } from '../../js/sider/OppfolgingsplanerSide';
import Oppfolgingsdialoger from '../../js/components/oppfolgingsdialog/Oppfolgingsdialoger';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import OppfolgingsplanInfoboks from '../../js/components/app/OppfolgingsplanInfoboks';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsplanerSide', () => {
  describe('mapStateToProps', () => {
    let clock;
    const dagensDato = new Date('2017-01-01');
    beforeEach(() => {
      clock = sinon.useFakeTimers(dagensDato.getTime());
    });

    afterEach(() => {
      clock.restore();
    });

    const sykmeldt = {
      fnr: '81549300',
      navn: 'test testersen',
      orgnummer: '81549300',
      narmestelederId: '123',
    };

    const ownProps = {
      params: {
        narmestelederId: sykmeldt.narmestelederId,
        oppfolgingsplanId: '1',
      },
    };
    const state = {
      sykmeldt: {
        hentet: true,
        data: sykmeldt,
      },
      oppfolgingsdialoger: {
        henter: false,
        hentet: true,
        hentingFeilet: false,
        hentingForsokt: true,
        [sykmeldt.fnr]: {
          data: [
            {
              opprettetDato: '05-05-2017',
              arbeidstaker: {
                fnr: '81549300',
              },
              virksomhet: {
                virksomhetsnummer: sykmeldt.orgnummer,
              },
              arbeidsgiver: {
                naermesteLeder: {},
                forrigeNaermesteLeder: null,
              },
              sistEndretAv: {
                fnr: '81549300',
              },
              arbeidsoppgaveListe: [],
              tiltakListe: [],
              godkjenninger: [],
            },
          ],
        },
      },
      tilgang: {
        [sykmeldt.fnr]: {
          henter: false,
          hentet: true,
          hentingFeilet: false,
          hentingForsokt: true,
          data: {
            harTilgang: true,
            ikkeTilgangGrunn: null,
          },
        },
      },
      kontaktinfo: {
        data: [{ fnr: sykmeldt.fnr, kontaktinfo: { skalHaVarsel: true, epost: 'test@nav.no', tlf: '22229999' } }],
      },
      kopierDialogReducer: {},
      person: {
        data: [{ fnr: sykmeldt.fnr, navn: 'Test Testesen' }],
      },
      naermesteleder: {
        data: [],
      },
      arbeidsforhold: {
        data: [],
      },
      virksomhet: {
        data: [{ virksomhetsnummer: '123456789', navn: 'DigiTech Consulting AS' }],
      },
    };

    it('Skal returnere props', () => {
      const res = mapStateToProps(state, ownProps);
      expect(res.oppfolgingsdialoger).to.deep.equal([
        {
          opprettetDato: '05-05-2017',
          arbeidstaker: {
            fnr: '81549300',
            navn: 'Test Testesen',
            stillinger: [],
            epost: 'test@nav.no',
            tlf: '22229999',
            skalHaVarsel: true,
          },
          virksomhet: {
            virksomhetsnummer: sykmeldt.orgnummer,
            navn: '',
          },
          arbeidsgiver: {
            naermesteLeder: {
              navn: null,
              fnr: null,
              epost: null,
              tlf: null,
              virksomhetsnummer: null,
              erAktiv: null,
              aktivFom: null,
              aktivTom: null,
            },
            forrigeNaermesteLeder: null,
          },
          sistEndretAv: {
            fnr: '81549300',
            navn: 'Test Testesen',
          },
          arbeidsoppgaveListe: [],
          tiltakListe: [],
          godkjenninger: [],
        },
      ]);

      expect(res.narmestelederId).to.deep.equal(sykmeldt.narmestelederId);
      expect(res.hentingFeilet).to.deep.not.equal(true);
      expect(res.henter).to.deep.not.equal(true);
      expect(res.tilgang).to.deep.equal({
        henter: false,
        hentet: true,
        hentingFeilet: false,
        hentingForsokt: true,
        data: {
          harTilgang: true,
          ikkeTilgangGrunn: null,
        },
      });
    });
  });

  describe('OppfolgingsplanerSide', () => {
    let clock;
    const dagensDato = new Date('2017-01-01');
    let sjekkTilgang;
    let hentOppfolgingsplaner;
    let hentSykmeldt;
    let alleOppfolgingsdialogerReducer;
    let oppfolgingsdialogerReducer;
    let sykmeldtReducer;
    let tilgang;
    let loggError;
    let hentingFeiletMap;
    const sykmeldt = {
      fnr: '1000000000000',
      navn: 'fornavn etternavn',
      orgnummer: '81549300',
      narmestelederId: '123',
    };
    const params = {
      narmestelederId: '123',
    };
    const harTilgang = {
      harTilgang: true,
    };
    const ikkeTilgang = {
      harTilgang: false,
    };

    beforeEach(() => {
      clock = sinon.useFakeTimers(dagensDato.getTime());
      oppfolgingsdialogerReducer = {};
      sykmeldtReducer = {};
      alleOppfolgingsdialogerReducer = {};
      tilgang = { data: {} };
      sjekkTilgang = sinon.spy();
      hentOppfolgingsplaner = sinon.spy();
      hentSykmeldt = sinon.spy();
      loggError = sinon.spy();
      hentingFeiletMap = {};
    });

    afterEach(() => {
      clock.restore();
    });

    it('Skal vise spinner dersom data hentes', () => {
      const component = shallow(
        <OppfolgingsplanerSide
          tilgang={tilgang}
          alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
          oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
          oppfolgingsdialoger={[]}
          henter
          hentOppfolgingsplaner={hentOppfolgingsplaner}
          sjekkTilgang={sjekkTilgang}
          params={params}
          sykmeldtReducer={sykmeldtReducer}
          hentSykmeldt={hentSykmeldt}
        />
      );
      expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it('Skal vise spinner dersom sender', () => {
      const component = shallow(
        <OppfolgingsplanerSide
          tilgang={tilgang}
          alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
          oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
          oppfolgingsdialoger={[]}
          sender
          hentOppfolgingsplaner={hentOppfolgingsplaner}
          sjekkTilgang={sjekkTilgang}
          params={params}
          sykmeldtReducer={sykmeldtReducer}
          hentSykmeldt={hentSykmeldt}
        />
      );
      expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it('Skal vise feilmelding dersom hentingFeilet', () => {
      const component = shallow(
        <OppfolgingsplanerSide
          tilgang={tilgang}
          alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
          oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
          oppfolgingsdialoger={[]}
          hentingFeilet
          hentOppfolgingsplaner={hentOppfolgingsplaner}
          sjekkTilgang={sjekkTilgang}
          params={params}
          hentSykmeldt={hentSykmeldt}
          loggError={loggError}
          sykmeldtReducer={sykmeldtReducer}
          hentingFeiletMap={hentingFeiletMap}
        />
      );
      expect(component.contains(<Feilmelding />)).to.equal(true);
    });

    it('Skal vise feilmelding dersom sendingFeilet', () => {
      const component = shallow(
        <OppfolgingsplanerSide
          tilgang={tilgang}
          alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
          oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
          sendingFeilet
          oppfolgingsdialoger={[]}
          hentOppfolgingsplaner={hentOppfolgingsplaner}
          sjekkTilgang={sjekkTilgang}
          params={params}
          hentSykmeldt={hentSykmeldt}
          loggError={loggError}
          sykmeldtReducer={sykmeldtReducer}
          hentingFeiletMap={hentingFeiletMap}
        />
      );
      expect(component.contains(<Feilmelding />)).to.equal(true);
    });

    it('Skal vise OppfolgingsplanInfoboks dersom leder ikke har tilgang', () => {
      const component = shallow(
        <OppfolgingsplanerSide
          alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
          oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
          oppfolgingsdialoger={[]}
          tilgang={{ data: ikkeTilgang }}
          hentOppfolgingsplaner={hentOppfolgingsplaner}
          sjekkTilgang={sjekkTilgang}
          params={params}
          hentSykmeldt={hentSykmeldt}
          sykmeldtReducer={sykmeldtReducer}
          sykmeldt={sykmeldt}
        />
      );
      expect(component.find(OppfolgingsplanInfoboks)).to.have.length(1);
    });

    it('Skal vise OppfolgingsplanInfoboks dersom leder ikke har sykmeldt', () => {
      const component = shallow(
        <OppfolgingsplanerSide
          alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
          oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
          oppfolgingsdialoger={[]}
          tilgang={{ data: harTilgang }}
          hentOppfolgingsplaner={hentOppfolgingsplaner}
          sjekkTilgang={sjekkTilgang}
          params={params}
          hentSykmeldt={hentSykmeldt}
          sykmeldt={null}
          sykmeldtReducer={sykmeldtReducer}
        />
      );
      expect(component.find(OppfolgingsplanInfoboks)).to.have.length(1);
    });

    it(
      'Skal vise Oppfolgingsdialoger dersom henting er OK, ' +
        'og det eksisterer minst en sykmelding gyldig for oppfoelging',
      () => {
        const component = shallow(
          <OppfolgingsplanerSide
            alleOppfolgingsdialogerReducer={alleOppfolgingsdialogerReducer}
            oppfolgingsdialogerReducer={oppfolgingsdialogerReducer}
            oppfolgingsdialoger={[]}
            tilgang={{ data: harTilgang }}
            hentOppfolgingsplaner={hentOppfolgingsplaner}
            sjekkTilgang={sjekkTilgang}
            params={params}
            hentSykmeldt={hentSykmeldt}
            sykmeldtReducer={sykmeldtReducer}
            sykmeldt={sykmeldt}
          />
        );
        expect(component.find(Oppfolgingsdialoger)).to.have.length(1);
      }
    );
  });
});
