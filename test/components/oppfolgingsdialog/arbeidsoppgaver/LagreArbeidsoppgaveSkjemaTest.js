import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import { Field } from 'redux-form';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { setLedetekster } from 'digisyfo-npm';
import LagreArbeidsoppgaveSkjema from '../../../../js/components/oppfolgingsdialog/utfylling/arbeidsoppgaver/LagreArbeidsoppgaveSkjema';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('LagreArbeidsoppgaveSkjemaTest', () => {
    describe('Ska vise rett komponent', () => {
        const ledetekster = {
            data: {
                'oppfolgingsdialog.arbeidstaker.arbeidsoppgave.opprett.skjema.navn': 'Dette er en test',
                'oppfolgingsdialog.arbeidsgiver.arbeidsoppgave.info': 'Dette er en test',
            },
        };
        setLedetekster(ledetekster);

        const sagaMiddleware = createSagaMiddleware();
        const middlewares = [sagaMiddleware];
        const mockStore = configureMockStore(middlewares);
        let komponent;
        let store;
        let handleSubmit;

        const getState = {
            ledetekster: {
                data: ledetekster,
            },
            arbeidsgivere: {
                data: [],
            },
            brukerinfo: {
                bruker: {
                    data: {},
                },
            },
        };

        beforeEach(() => {
            store = mockStore(getState);
            handleSubmit = sinon.spy();
            komponent = mount(<Provider store={store}><LagreArbeidsoppgaveSkjema handleSubmit={handleSubmit} /></Provider>);
        });

        it('Skal vise form element', () => {
            expect(komponent.find('form.panel')).to.have.length(1);
        });

        it('Skal vise Field element validate ', () => {
            expect(komponent.find(Field)).to.have.length(1);
        });

        it('Skal vise ikke feildmelding', () => {
            komponent = shallow(<LagreArbeidsoppgaveSkjema handleSubmit={handleSubmit} />);
            const values = {
                arbeidsoppgavenavn: 'navn',
            };
            const res = {};
            const feilmeldinger = komponent.getElement().props.validate(values);
            expect(feilmeldinger).to.deep.equal(res);
        });

        it('Skal vise feildmelding når validate går feil', () => {
            komponent = shallow(<LagreArbeidsoppgaveSkjema handleSubmit={handleSubmit} />);
            const values = {
                arbeidsoppgavenavn: '',
            };
            const feilmeldinger = komponent.getElement().props.validate(values);
            expect(feilmeldinger.arbeidsoppgavenavn).to.equal('Fyll inn arbeidsoppgave');
        });
    });
});
