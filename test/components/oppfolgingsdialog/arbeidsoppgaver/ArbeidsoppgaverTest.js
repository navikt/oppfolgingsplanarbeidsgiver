import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { setLedetekster } from 'digisyfo-npm';
import {
    LagreArbeidsoppgaveSkjemaAG,
    ArbeidsoppgaverListe,
} from 'oppfolgingsdialog-npm';
import ledetekster from '../../../mock/ledetekster_mock';
import Arbeidsoppgaver from '../../../../js/components/oppfolgingsdialog/utfylling/arbeidsoppgaver/Arbeidsoppgaver';
import LeggTilElementKnapper from '../../../../js/components/oppfolgingsdialog/utfylling/LeggTilElementKnapper';
import ArbeidsoppgaverInfoboks from '../../../../js/components/oppfolgingsdialog/utfylling/arbeidsoppgaver/ArbeidsoppgaverInfoboks';
import OppfolgingsplanInfoboks from '../../../../js/components/app/OppfolgingsplanInfoboks';
import getOppfolgingsdialog from '../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Arbeidsoppgaver', () => {
    let component;
    let arbeidsgiver;
    let arbeidstaker;
    let lagreArbeidsoppgave;
    let slettArbeidsoppgave;
    let arbeidsforhold;
    let arbeidsoppgaver;
    let oppfolgingsdialogUtenArbeidsoppgaver;
    const oppfolgingsdialog = getOppfolgingsdialog();
    function storageMock() {
        const storage = {};

        return {
            setItem(key, value) {
                storage[key] = value || '';
            },
            getItem(key) {
                return key in storage ? storage[key] : null;
            },
            removeItem(key) {
                delete storage[key];
            },
            get length() {
                return Object.keys(storage).length;
            },
            key(i) {
                const keys = Object.keys(storage);
                return keys[i] || null;
            },
        };
    }
    beforeEach(() => {
        lagreArbeidsoppgave = sinon.spy();
        slettArbeidsoppgave = sinon.spy();
        setLedetekster(ledetekster);
        arbeidsoppgaver = {};
        window.sessionStorage = storageMock();

        arbeidsforhold = {
            yrke: 'Test',
            prosent: '80',
        };
        arbeidsgiver = {
            naermesteLeder: {
                navn: 'Arbeidsgiver',
                fnr: '1000000000000',
                sistInnlogget: '2017-01-01T00:00:00.000',
            },
        };
        arbeidstaker = {
            navn: 'Arbeidstaker',
            fnr: '1234567891234',
            sistInnlogget: '2017-01-01T00:00:00.000',
            stillinger: arbeidsforhold,
        };
        oppfolgingsdialogUtenArbeidsoppgaver = Object.assign({}, oppfolgingsdialog, {
            arbeidstaker,
            arbeidsgiver,
        });
    });

    it('Skal vise feilmelding dersom lagring av ny arbeidsoppgave feilet', () => {
        component = shallow(<Arbeidsoppgaver
            oppfolgingsdialog={oppfolgingsdialogUtenArbeidsoppgaver}
            lagreArbeidsoppgave={lagreArbeidsoppgave}
            slettArbeidsoppgave={slettArbeidsoppgave}
            arbeidsoppgaver={{
                lagringFeilet: false,
            }}
            ledetekster={ledetekster}
        />);
        component.setProps({ arbeidsoppgaver: { lagringFeilet: true } });
        expect(component.state().varselTekst).to.equal('Det oppsto en feil, og du fikk ikke lagret. Prøv igjen.');
    });

    it('Skal ikke vise feilmelding dersom lagring av ny arbeidsoppgave ikke feilet', () => {
        component = shallow(<Arbeidsoppgaver
            oppfolgingsdialog={oppfolgingsdialogUtenArbeidsoppgaver}
            lagreArbeidsoppgave={lagreArbeidsoppgave}
            slettArbeidsoppgave={slettArbeidsoppgave}
            arbeidsoppgaver={{
                lagringFeilet: false,
                feiletOppgaveId: 5,
            }}
            ledetekster={ledetekster}
        />);
        component.setProps({ arbeidsoppgaver: { lagringFeilet: true, feiletOppgaveId: 5 } });
        expect(component.state().varselTekst).to.equal('');
    });

    describe('Oppfolgingsdialog uten Arbeidsoppgaver', () => {
        let componentUtenArbeidsoppgaver;
        beforeEach(() => {
            oppfolgingsdialogUtenArbeidsoppgaver = Object.assign({}, oppfolgingsdialog, {
                arbeidstaker,
                arbeidsgiver,
                arbeidsoppgaveListe: [],
            });
            componentUtenArbeidsoppgaver = shallow(<Arbeidsoppgaver
                oppfolgingsdialog={oppfolgingsdialogUtenArbeidsoppgaver}
                oppfolgingsdialogerHentet
                lagreArbeidsoppgave={lagreArbeidsoppgave}
                slettArbeidsoppgave={slettArbeidsoppgave}
                arbeidsforhold={arbeidsforhold}
                arbeidsoppgaver={arbeidsoppgaver}
            />);
        });

        it('Skal vise ArbeidsoppgaverInfoboks', () => {
            componentUtenArbeidsoppgaver.setState({
                visArbeidsoppgaveSkjema: true,
            });
            expect(componentUtenArbeidsoppgaver.find(ArbeidsoppgaverInfoboks)).to.have.length(1);
        });

        it('Skal vise OppfolgingsplanInfoboks, om det ikke er arbeidsoppgaver', () => {
            expect(componentUtenArbeidsoppgaver.find(OppfolgingsplanInfoboks)).to.have.length(1);
        });

        it('Skal vise LeggTilElementKnapper, om det ikke er tiltak', () => {
            expect(componentUtenArbeidsoppgaver.find(LeggTilElementKnapper)).to.have.length(1);
        });

        it('Skal vise RenderLagreArbeidsoppgaveSkjema, om det ikke er arbeidsoppgaver og visArbeidsoppgaveSkjema er true', () => {
            componentUtenArbeidsoppgaver.setState({
                visArbeidsoppgaveSkjema: true,
            });
            expect(componentUtenArbeidsoppgaver.find(LagreArbeidsoppgaveSkjemaAG)).to.have.length(1);
        });
    });

    describe('Oppfolgingsdialog med Arbeidsoppgaver', () => {
        let componentMedArbeidsoppgaver;
        let oppfolgingsdialogMedArbeidsoppgaver;
        beforeEach(() => {
            oppfolgingsdialogMedArbeidsoppgaver = Object.assign({}, oppfolgingsdialog, {
                arbeidstaker,
                arbeidsgiver,
            });
            componentMedArbeidsoppgaver = shallow(<Arbeidsoppgaver
                oppfolgingsdialog={oppfolgingsdialogMedArbeidsoppgaver}
                lagreArbeidsoppgave={lagreArbeidsoppgave}
                slettArbeidsoppgave={slettArbeidsoppgave}
                arbeidsforhold={arbeidsforhold}
                arbeidsoppgaver={{ lagret: true }}
            />);
        });

        it('Skal vise ArbeidsoppgaverInfoboks', () => {
            expect(componentMedArbeidsoppgaver.find(ArbeidsoppgaverInfoboks)).to.have.length(1);
        });

        it('Skal vise ArbeidsoppgaverListe, om det er arbeidsoppgaver', () => {
            expect(componentMedArbeidsoppgaver.find(ArbeidsoppgaverListe)).to.have.length(1);
        });

        it('Skal vise LagreArbeidsoppgaveSkjemaAG, om det er arbeidsoppgaver og visArbeidsoppgaveSkjema er true', () => {
            componentMedArbeidsoppgaver.setState({
                visArbeidsoppgaveSkjema: true,
            });
            expect(componentMedArbeidsoppgaver.find(LagreArbeidsoppgaveSkjemaAG)).to.have.length(1);
        });
    });
});
