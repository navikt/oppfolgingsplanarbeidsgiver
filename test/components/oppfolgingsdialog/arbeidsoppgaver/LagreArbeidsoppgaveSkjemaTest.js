import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import { Field } from 'redux-form';
import LagreArbeidsoppgaveSkjema from '../../../../js/components/oppfolgingsdialog/utfylling/arbeidsoppgaver/LagreArbeidsoppgaveSkjema';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('LagreArbeidsoppgaveSkjemaTest', () => {
  describe('Ska vise rett komponent', () => {
    let komponent;
    let arbeidsoppgaverReducer = {};
    let handleSubmit;

    beforeEach(() => {
      handleSubmit = sinon.spy();
      komponent = mount(
        <LagreArbeidsoppgaveSkjema handleSubmit={handleSubmit} arbeidsoppgaverReducer={arbeidsoppgaverReducer} />
      );
    });

    it('Skal vise ikke feildmelding', () => {
      komponent = shallow(<LagreArbeidsoppgaveSkjema handleSubmit={handleSubmit} arbeidsoppgaverReducer={arbeidsoppgaverReducer} />);
      const values = {
        arbeidsoppgavenavn: 'navn',
      };
      const res = {};
      const feilmeldinger = komponent.getElement().props.validate(values);
      expect(feilmeldinger).to.deep.equal(res);
    });

    it('Skal vise feildmelding når validate går feil', () => {
      komponent = shallow(<LagreArbeidsoppgaveSkjema handleSubmit={handleSubmit} arbeidsoppgaverReducer={arbeidsoppgaverReducer}/>);
      const values = {
        arbeidsoppgavenavn: '',
      };
      const feilmeldinger = komponent.getElement().props.validate(values);
      expect(feilmeldinger.arbeidsoppgavenavn).to.equal('Fyll inn arbeidsoppgave');
    });
  });
});
