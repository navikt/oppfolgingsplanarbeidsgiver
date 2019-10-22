import React from 'react';
import chai from 'chai';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import InnholdboksPilTidligerePlaner from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/InnholdboksPilTidligerePlaner';
import TidligereAvbruttePlaner from '../../../../../js/components/oppfolgingsdialog/godkjennplan/TidligereAvbruttePlaner';
import getOppfolgingsdialog from '../../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('InnholdboksPilTidligerePlaner', () => {
    let komponent;
    let oppfolgingsdialog;

    beforeEach(() => {
        oppfolgingsdialog = getOppfolgingsdialog({});
        komponent = mount(<InnholdboksPilTidligerePlaner
            oppfolgingsdialog={oppfolgingsdialog}
        />);
    });

    it('Skal vise InnholdboksPilTidligerePlaner', () => {
        expect(komponent.find('div.innholdboksPil')).to.have.length(1);
    });

    it('Skal vise TidligereAvbruttePlaner i InnholdboksPil', () => {
        expect(komponent.find(TidligereAvbruttePlaner)).to.have.length(1);
    });
});
