import referee from '@sinonjs/referee';
import React from 'react';
import chai from 'chai';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import OppfolgingsplanerIngenplan from '../../../../js/components/oppfolgingsdialog/opprett/OppfolgingsplanerIngenplan';
import OppfolgingsplanerIngenplanKnapper from '../../../../js/components/oppfolgingsdialog/opprett/OppfolgingsplanerIngenplanKnapper';
import { hentOppfolgingsplanAktiv, hentOppfolgingsplanTidligere } from '../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;
const assertTrue = referee.assert;

describe('OppfolgingsplanerIngenplan', () => {
  let opprett;
  let visOppfolgingsdialogOpprett;
  const arbeidsgiver = {
    virksomhetsnummer: '12345678',
  };

  beforeEach(() => {
    opprett = sinon.spy();
    visOppfolgingsdialogOpprett = sinon.spy();
  });

  it('Skal vise OppfolgingsplanerIngenplanKnapper', () => {
    const komponent = mount(
      <OppfolgingsplanerIngenplan
        opprett={opprett}
        oppfolgingsdialoger={[]}
        visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
        rootUrl=""
      />
    );
    expect(komponent.find(OppfolgingsplanerIngenplanKnapper)).to.have.length(1);
  });

  describe('OppfolgingsplanerIngenplanKnapper', () => {
    const oppfolgingsdialogTidligere = {
      ...hentOppfolgingsplanTidligere(new Date()),
      arbeidsgiver,
    };
    const oppfolgingsdialogIkkeTidligere = {
      ...hentOppfolgingsplanAktiv(new Date()),
      arbeidsgiver,
      godkjentplan: null,
    };

    it('Skal vise knapp for aa opprett ny dialog', () => {
      const komponent = mount(
        <OppfolgingsplanerIngenplan
          opprett={opprett}
          oppfolgingsdialoger={[]}
          visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
          rootUrl=""
        />
      );
      expect(komponent.find('button')).to.have.length(1);
    });

    it('Skal vise knapp som kaller opprett, om oppfolgingsdialog er opprettbar direkte uten ekstra utfylling', () => {
      const komponent = mount(
        <OppfolgingsplanerIngenplan
          opprett={opprett}
          visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
          oppfolgingsdialoger={[oppfolgingsdialogIkkeTidligere]}
          rootUrl=""
        />
      );
      komponent.find('button').simulate('click');
      assertTrue(opprett.calledOnce);
    });

    it('Skal vise knapp som kaller visOppfolgingsdialogOpprett, om AT har tidligere godkjent oppfolgingsdialog med virksomhet', () => {
      const komponent = mount(
        <OppfolgingsplanerIngenplan
          opprett={opprett}
          visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
          oppfolgingsdialoger={[oppfolgingsdialogTidligere]}
          rootUrl=""
        />
      );
      komponent.find('button').simulate('click');
      assertTrue(visOppfolgingsdialogOpprett.calledOnce);
    });
  });
});
