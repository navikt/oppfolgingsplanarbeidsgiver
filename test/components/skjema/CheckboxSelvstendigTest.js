import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Checkbox from '../../../js/skjema/Checkbox';
import CheckboxSelvstendig from '../../../js/skjema/CheckboxSelvstendig';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('CheckboxSelvstendig', () => {
    const label = 'label';
    const input = {
        value: 'input value',
    };

    const komponent = shallow(<CheckboxSelvstendig
        label={label}
        input={input}
    />);

    it('Viser Checkbox', () => {
        expect(komponent.find(Checkbox)).to.have.length(1);
    });
});
