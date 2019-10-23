import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import InnholdboksPilDelplan from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/InnholdboksPilDelplan';
import GodkjentPlanDelKnapper from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlanDelKnapper';
import getOppfolgingsdialog from '../../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('InnholdboksPilDelplan', () => {
    let komponent;
    let oppfolgingsdialog;
    let delmednav;
    let delMedNavFunc;

    beforeEach(() => {
        oppfolgingsdialog = getOppfolgingsdialog({});
        delmednav = {
            sender: false,
            sendt: false,
            sendingFeilet: false,
        };
        delMedNavFunc = sinon.spy();
        komponent = shallow(<InnholdboksPilDelplan
            oppfolgingsdialog={oppfolgingsdialog}
            delmednav={delmednav}
            delMedNavFunc={delMedNavFunc}
        />);
    });

    it('Skal vise GodkjentPlanDelKnapper', () => {
        expect(komponent.find(GodkjentPlanDelKnapper)).to.have.length(1);
    });
});
