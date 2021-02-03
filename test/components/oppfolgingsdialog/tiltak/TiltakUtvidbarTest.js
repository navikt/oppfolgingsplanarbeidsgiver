import React from 'react';
import chai from 'chai';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import getOppfolgingsplan from '../../../mock/mockOppfolgingsdialog';
import ButtonComment from '../../../../js/components/app/buttons/ButtonComment';
import ButtonDeleteIcon from '../../../../js/components/app/buttons/ButtonDeleteIcon';
import ButtonEditIcon from '../../../../js/components/app/buttons/ButtonEditIcon';
import ButtonVurdering from '../../../../js/components/app/buttons/ButtonVurdering';
import TiltakContainer from '../../../../js/components/oppfolgingsdialog/utfylling/tiltak/liste/Tiltak';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('TiltakUtvidbar', () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const mockStore = configureMockStore(middlewares);
    let store;
    let komponent;
    let oppfolgingsdialog;

    const getState = {
        visLagreSkjema: true,
        kommentar: {},
        tiltak: {}
    };

    beforeEach(() => {
        store = mockStore(getState);
        oppfolgingsdialog = getOppfolgingsplan();
        komponent = mount(<Provider store={store}>
            <TiltakContainer
                element={oppfolgingsdialog.tiltakListe[0]}
                fnr={'1000000000000'}
                feilMelding={false}
            />
        </Provider>);
    });

    it('Skal vise ButtonComment', () => {
        expect(komponent.find(ButtonComment)).to.have.length(1);
    });

    it('Skal vise ButtonDeleteIcon', () => {
        expect(komponent.find(ButtonDeleteIcon)).to.have.length(1);
    });

    it('Skal vise ButtonEditIcon', () => {
        expect(komponent.find(ButtonEditIcon)).to.have.length(1);
    });

    it('Skal vise ButtonVurdering', () => {
        const tiltakElement = {
            opprettetAv: {
                navn: 'Test Testesen',
                fnr: '1000028253764',
            },
            sistEndretAv: {
                fnr: '1000028253764',
            },
            kommentarer: [],
        };
        komponent = mount(<Provider store={store}>
            <TiltakContainer
                element={tiltakElement}
                fnr={'1000000000001'}
                feilMelding={false}
            />
        </Provider>);

        expect(komponent.find(ButtonVurdering)).to.have.length(1);
    });
});
