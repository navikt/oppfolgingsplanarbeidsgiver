import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import { EtikettFokus } from 'nav-frontend-etiketter';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import chaiEnzyme from 'chai-enzyme';
import OppfolgingsdialogTeaser, {
    TilGodkjenningStatus,
} from '../../../js/components/oppfolgingsplaner/OppfolgingsdialogTeaser';
import getOppfolgingsdialog from '../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('OppfolgingsdialogTeasere', () => {
    let oppfolgingsdialog;
    let komponent;

    beforeEach(() => {
        oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
            godkjenninger: [{
                godkjent: true,
                godkjentAv: {
                    fnr: '1000000000001',
                },
            }],
        });
        komponent = shallow(<OppfolgingsdialogTeaser
            oppfolgingsdialog={oppfolgingsdialog}
        />);
    });

    oppfolgingsdialog = Object.assign({}, getOppfolgingsdialog(), {
        godkjenninger: [{
            godkjent: true,
            godkjentAv: {
                fnr: '1000000000001',
            },
        }],
    });

    komponent = shallow(<OppfolgingsdialogTeaser
        oppfolgingsdialog={oppfolgingsdialog}
    />);

    const tilGodkjenningStatus = shallow(<TilGodkjenningStatus oppfolgingsplan={oppfolgingsdialog} />);

    it('Viser en Lenkepanel', () => {
        expect(komponent.find(LenkepanelBase)).to.have.length(1);
    });

    it('Skal vise EtikettFokus på plan til godkjenning', () => {
        expect(tilGodkjenningStatus.find(EtikettFokus)).to.have.length(1);
    });
});
