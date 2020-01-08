import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import getOppfolgingsplan from '../../../mock/mockOppfolgingsdialog';
import GodkjennPlanTidspunkt from '../../../../js/components/oppfolgingsdialog/godkjennplan/GodkjennPlanTidspunkt';
import BildeTekstLinje from '../../../../js/components/app/BildeTekstLinje';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjennPlanTidspunkt', () => {
    const oppfolgingsdialog = getOppfolgingsplan();

    const komponent = shallow(<GodkjennPlanTidspunkt
        gyldighetstidspunkt={oppfolgingsdialog.godkjentPlan.gyldighetstidspunkt}
    />);

    it('Skal vise 2 BildeTekstLinje', () => {
        expect(komponent.find(BildeTekstLinje)).to.have.length(2);
    });
});
