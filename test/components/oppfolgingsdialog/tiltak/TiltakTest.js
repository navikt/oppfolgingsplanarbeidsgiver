import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import NotifikasjonBoksVurdering from '../../../../js/components/oppfolgingsdialog/utfylling/tiltak/NotifikasjonBoksVurdering';
import Tiltak from '../../../../js/components/oppfolgingsdialog/utfylling/tiltak/Tiltak';
import TiltakSkjema from '../../../../js/components/oppfolgingsdialog/utfylling/tiltak/TiltakSkjema';
import LeggTilElementKnapper from '../../../../js/components/oppfolgingsdialog/utfylling/LeggTilElementKnapper';
import OppfolgingsplanInfoboks from '../../../../js/components/app/OppfolgingsplanInfoboks';
import getOppfolgingsplan from '../../../mock/mockOppfolgingsdialog';
import TiltakListe from '../../../../js/components/oppfolgingsdialog/utfylling/tiltak/liste/TiltakListe';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Tiltak', () => {
  let component;
  let arbeidsgiver;
  let arbeidstaker;
  let lagreTiltak;
  let slettTiltak;
  let tiltak;
  const oppfolgingsdialog = getOppfolgingsplan();

  beforeEach(() => {
    lagreTiltak = sinon.spy();
    slettTiltak = sinon.spy();
    tiltak = {};

    arbeidsgiver = {
      naermesteLeder: {
        navn: 'Arbeidsgiver',
        fnr: '1000000000000',
        sistInnlogget: '2017-01-01T00:00:00.000',
      },
    };
    arbeidstaker = {
      navn: 'Arbeidstaker',
      fnr: '1234567891234',
      sistInnlogget: '2017-01-01T00:00:00.000',
    };
  });

  it('Skal vise feilmelding dersom lagring av ny tiltak feilet', () => {
    component = shallow(
      <Tiltak
        oppfolgingsdialog={oppfolgingsdialog}
        tiltak={{
          lagringFeilet: false,
        }}
      />,
      { disableLifecycleMethods: true }
    );
    component.setProps({ tiltak: { lagringFeilet: true } });
    expect(component.state().varselTekst).to.equal(
      'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.'
    );
  });

  it('Skal ikke vise feilmelding dersom lagring av ny tiltak ikke feilet', () => {
    component = shallow(
      <Tiltak
        oppfolgingsdialog={oppfolgingsdialog}
        tiltak={{
          lagringFeilet: false,
          feiletTiltakId: 5,
        }}
      />,
      { disableLifecycleMethods: true }
    );
    component.setProps({ tiltak: { lagringFeilet: true, feiletTiltakId: 5 } });
    expect(component.state().varselTekst).to.equal('');
  });

  describe('Oppfolgingsdialog uten Tiltak', () => {
    let oppfolgingsdialogUtenTiltak;
    let componentUtenTiltak;
    let setItem;
    beforeEach(() => {
      setItem = sinon.stub();
      setItem.onCall('hash', 'tiltak').returns(true);
      oppfolgingsdialogUtenTiltak = Object.assign({}, oppfolgingsdialog, {
        arbeidstaker,
        arbeidsgiver,
        tiltakListe: [],
      });
      componentUtenTiltak = shallow(
        <Tiltak
          oppfolgingsdialog={oppfolgingsdialogUtenTiltak}
          oppfolgingsdialogerHentet
          lagreTiltak={lagreTiltak}
          slettTiltak={slettTiltak}
          tiltak={tiltak}
        />,
        { disableLifecycleMethods: true }
      );
    });
    it('Skal vise OppfolgingsplanInfoboks, om det ikke er tiltak', () => {
      expect(componentUtenTiltak.find(OppfolgingsplanInfoboks)).to.have.length(1);
    });

    it('Skal vise LeggTilElementKnapper, om det ikke er tiltak', () => {
      expect(componentUtenTiltak.find(LeggTilElementKnapper)).to.have.length(1);
    });

    it('Skal vise TiltakSkjema, om det ikke er tiltak og visTiltakSkjema er true', () => {
      componentUtenTiltak.setState({
        visTiltakSkjema: true,
      });
      expect(componentUtenTiltak.find(TiltakSkjema)).to.have.length(1);
    });
  });

  describe('Oppfolgingsdialog med Tiltak', () => {
    let componentMedTiltak;

    beforeEach(() => {
      componentMedTiltak = shallow(
        <Tiltak
          oppfolgingsdialog={oppfolgingsdialog}
          oppfolgingsdialogerHentet
          lagreTiltak={lagreTiltak}
          slettTiltak={slettTiltak}
          tiltak={{ lagret: true }}
        />,
        { disableLifecycleMethods: true }
      );
    });

    it('Skal vise NotifikasjonBoksVurdering, om nye Tiltak er lagt til av motpart, og oppfolgingsdialogAvbrutt er true', () => {
      const oppfolgingsdialogMedNyeTiltak = Object.assign({}, oppfolgingsdialog, {
        arbeidstaker,
        arbeidsgiver,
        tiltakListe: [
          {
            opprettetDato: '2017-01-02T00:00:00.000',
            opprettetAv: arbeidstaker,
            sistEndretAv: {
              fnr: '1234567891234',
            },
          },
        ],
      });
      const componentAvbrutt = shallow(
        <Tiltak
          oppfolgingsdialog={oppfolgingsdialogMedNyeTiltak}
          lagreTiltak={lagreTiltak}
          slettTiltak={slettTiltak}
          tiltak={tiltak}
        />,
        { disableLifecycleMethods: true }
      );
      expect(componentAvbrutt.find(NotifikasjonBoksVurdering)).to.have.length(1);
    });

    it('Skal vise TiltakTabell, om det er tiltak', () => {
      expect(componentMedTiltak.find(TiltakListe)).to.have.length(1);
    });

    it('Skal vise TiltakTabell, om det er tiltak og visTiltakSkjema er true', () => {
      componentMedTiltak.setState({
        visTiltakSkjema: true,
      });
      expect(componentMedTiltak.find(TiltakListe)).to.have.length(1);
    });

    it('Skal vise RenderOppfolgingsdialogTiltakTabell, om det er tiltak og visTiltakSkjema er false', () => {
      expect(componentMedTiltak.find(TiltakListe)).to.have.length(1);
    });
  });
});
