import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Arbeidsoppgaver, {
  ArbeidsoppgaverInfoboksStilling,
} from '../../../../js/components/oppfolgingsdialog/utfylling/arbeidsoppgaver/Arbeidsoppgaver';
import ArbeidsoppgaverListe from '../../../../js/components/oppfolgingsdialog/utfylling/arbeidsoppgaver/ArbeidsoppgaverListe';
import LagreArbeidsoppgaveSkjema from '../../../../js/components/oppfolgingsdialog/utfylling/arbeidsoppgaver/LagreArbeidsoppgaveSkjema';
import LeggTilElementKnapper from '../../../../js/components/oppfolgingsdialog/utfylling/LeggTilElementKnapper';
import OppfolgingsplanInfoboks from '../../../../js/components/app/OppfolgingsplanInfoboks';
import getOppfolgingsplan from '../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Arbeidsoppgaver', () => {
  let component;
  let arbeidsgiver;
  let arbeidstaker;
  let lagreArbeidsoppgave;
  let slettArbeidsoppgave;
  let arbeidsforhold;
  let arbeidsoppgaver;
  let oppfolgingsdialogUtenArbeidsoppgaver;
  const oppfolgingsdialog = getOppfolgingsplan();

  beforeEach(() => {
    lagreArbeidsoppgave = sinon.spy();
    slettArbeidsoppgave = sinon.spy();
    arbeidsoppgaver = {};

    arbeidsforhold = {
      yrke: 'Test',
      prosent: '80',
    };
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
      stillinger: arbeidsforhold,
    };
    oppfolgingsdialogUtenArbeidsoppgaver = Object.assign({}, oppfolgingsdialog, {
      arbeidstaker,
      arbeidsgiver,
    });
  });

  describe('Oppfolgingsdialog uten Arbeidsoppgaver', () => {
    let componentUtenArbeidsoppgaver;
    beforeEach(() => {
      oppfolgingsdialogUtenArbeidsoppgaver = Object.assign({}, oppfolgingsdialog, {
        arbeidstaker,
        arbeidsgiver,
        arbeidsoppgaveListe: [],
      });
      componentUtenArbeidsoppgaver = shallow(
        <Arbeidsoppgaver
          oppfolgingsdialog={oppfolgingsdialogUtenArbeidsoppgaver}
          oppfolgingsdialogerHentet
          lagreArbeidsoppgave={lagreArbeidsoppgave}
          slettArbeidsoppgave={slettArbeidsoppgave}
          arbeidsforhold={arbeidsforhold}
          arbeidsoppgaver={arbeidsoppgaver}
        />,
        { disableLifecycleMethods: true }
      );
    });

    it('Skal vise ArbeidsoppgaverInfoboksStilling', () => {
      componentUtenArbeidsoppgaver.setState({
        visArbeidsoppgaveSkjema: true,
      });
      expect(componentUtenArbeidsoppgaver.find(ArbeidsoppgaverInfoboksStilling)).to.have.length(1);
    });

    it('Skal vise OppfolgingsplanInfoboks, om det ikke er arbeidsoppgaver', () => {
      expect(componentUtenArbeidsoppgaver.find(OppfolgingsplanInfoboks)).to.have.length(1);
    });

    it('Skal vise LeggTilElementKnapper, om det ikke er tiltak', () => {
      expect(componentUtenArbeidsoppgaver.find(LeggTilElementKnapper)).to.have.length(1);
    });

    it('Skal vise RenderLagreArbeidsoppgaveSkjema, om det ikke er arbeidsoppgaver og visArbeidsoppgaveSkjema er true', () => {
      componentUtenArbeidsoppgaver.setState({
        visArbeidsoppgaveSkjema: true,
      });
      expect(componentUtenArbeidsoppgaver.find(LagreArbeidsoppgaveSkjema)).to.have.length(1);
    });
  });

  describe('Oppfolgingsdialog med Arbeidsoppgaver', () => {
    let componentMedArbeidsoppgaver;
    let oppfolgingsdialogMedArbeidsoppgaver;
    beforeEach(() => {
      oppfolgingsdialogMedArbeidsoppgaver = Object.assign({}, oppfolgingsdialog, {
        arbeidstaker,
        arbeidsgiver,
      });
      componentMedArbeidsoppgaver = shallow(
        <Arbeidsoppgaver
          oppfolgingsdialog={oppfolgingsdialogMedArbeidsoppgaver}
          lagreArbeidsoppgave={lagreArbeidsoppgave}
          slettArbeidsoppgave={slettArbeidsoppgave}
          arbeidsforhold={arbeidsforhold}
          arbeidsoppgaver={{ lagret: true }}
        />,
        { disableLifecycleMethods: true }
      );
    });

    it('Skal vise ArbeidsoppgaverInfoboksStilling', () => {
      expect(componentMedArbeidsoppgaver.find(ArbeidsoppgaverInfoboksStilling)).to.have.length(1);
    });

    it('Skal vise ArbeidsoppgaverListe, om det er arbeidsoppgaver', () => {
      expect(componentMedArbeidsoppgaver.find(ArbeidsoppgaverListe)).to.have.length(1);
    });

    it('Skal vise LagreArbeidsoppgaveSkjema, om det er arbeidsoppgaver og visArbeidsoppgaveSkjema er true', () => {
      componentMedArbeidsoppgaver.setState({
        visArbeidsoppgaveSkjema: true,
      });
      expect(componentMedArbeidsoppgaver.find(LagreArbeidsoppgaveSkjema)).to.have.length(1);
    });
  });
});
