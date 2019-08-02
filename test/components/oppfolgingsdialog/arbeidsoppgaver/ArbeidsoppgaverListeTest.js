import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import ArbeidsoppgaverListe from '../../../../js/components/oppfolgingsdialog/utfylling/arbeidsoppgaver/ArbeidsoppgaverListe';
import ArbeidsoppgaveUtvidbar from '../../../../js/components/oppfolgingsdialog/utfylling/arbeidsoppgaver/ArbeidsoppgaveUtvidbar';
import getArbeidsoppgave from '../../../mock/mockArbeidsoppgave';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('ArbeidsoppgaverListe', () => {
    let komponent;
    let liste;
    let sendLagre;
    let sendSlett;

    beforeEach(() => {
        liste = [getArbeidsoppgave()];
        sendLagre = sinon.spy();
        sendSlett = sinon.spy();
        komponent = shallow(<ArbeidsoppgaverListe
            liste={liste}
            sendLagre={sendLagre}
            sendSlett={sendSlett}
        />);
    });

    it('Skal vise antall TabellRadUtvidbar lik antall arbeidsoppgaver', () => {
        expect(komponent.find(ArbeidsoppgaveUtvidbar)).to.have.length(liste.length);
    });
});
