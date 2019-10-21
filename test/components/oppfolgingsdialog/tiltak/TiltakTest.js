import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import { TiltakTabell } from 'oppfolgingsdialog-npm';
import { setLedetekster } from 'digisyfo-npm';
import ledetekster from '../../../mock/ledetekster_mock';
import NotifikasjonBoksVurdering from '../../../../js/components/oppfolgingsdialog/utfylling/tiltak/NotifikasjonBoksVurdering';
import Tiltak from '../../../../js/components/oppfolgingsdialog/utfylling/tiltak/Tiltak';
import TiltakSkjema from '../../../../js/components/oppfolgingsdialog/utfylling/tiltak/TiltakSkjema';
import LeggTilElementKnapper from '../../../../js/components/oppfolgingsdialog/utfylling/LeggTilElementKnapper';
import OppfolgingsplanInfoboks from '../../../../js/components/app/OppfolgingsplanInfoboks';
import getOppfolgingsdialog from '../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Tiltak', () => {
    let component;
    let arbeidsgiver;
    let arbeidstaker;
    let lagreTiltak;
    let slettTiltak;
    let tiltak;
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
        lagreTiltak = sinon.spy();
        slettTiltak = sinon.spy();
        setLedetekster(ledetekster);
        tiltak = {};
        window.sessionStorage = storageMock();

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
        };
    });

    it('Skal vise feilmelding dersom lagring av ny tiltak feilet', () => {
        component = shallow(<Tiltak
            oppfolgingsdialog={oppfolgingsdialog}
            tiltak={{
                lagringFeilet: false,
            }}
            ledetekster={ledetekster}
        />);
        component.setProps({ tiltak: { lagringFeilet: true } });
        expect(component.state().varselTekst).to.equal('Det oppsto en feil, og du fikk ikke lagret. Prøv igjen.');
    });

    it('Skal ikke vise feilmelding dersom lagring av ny tiltak ikke feilet', () => {
        component = shallow(<Tiltak
            oppfolgingsdialog={oppfolgingsdialog}
            tiltak={{
                lagringFeilet: false,
                feiletTiltakId: 5,
            }}
            ledetekster={ledetekster}
        />);
        component.setProps({ tiltak: { lagringFeilet: true, feiletTiltakId: 5 } });
        expect(component.state().varselTekst).to.equal('');
    });

    describe('Oppfolgingsdialog uten Tiltak', () => {
        let oppfolgingsdialogUtenTiltak;
        let componentUtenTiltak;
        let setItem;
        beforeEach(() => {
            setItem = sinon.stub();
            setItem.onCall('hash', 'tiltak').returns(true);
            oppfolgingsdialogUtenTiltak = Object.assign({}, oppfolgingsdialog, {
                arbeidstaker,
                arbeidsgiver,
                tiltakListe: [],
            });
            componentUtenTiltak = shallow(<Tiltak
                oppfolgingsdialog={oppfolgingsdialogUtenTiltak}
                oppfolgingsdialogerHentet
                lagreTiltak={lagreTiltak}
                slettTiltak={slettTiltak}
                tiltak={tiltak}
            />);
        });
        it('Skal vise OppfolgingsplanInfoboks, om det ikke er tiltak', () => {
            expect(componentUtenTiltak.find(OppfolgingsplanInfoboks)).to.have.length(1);
        });

        it('Skal vise LeggTilElementKnapper, om det ikke er tiltak', () => {
            expect(componentUtenTiltak.find(LeggTilElementKnapper)).to.have.length(1);
        });

        it('Skal vise TiltakSkjema, om det ikke er tiltak og visTiltakSkjema er true', () => {
            componentUtenTiltak.setState({
                visTiltakSkjema: true,
            });
            expect(componentUtenTiltak.find(TiltakSkjema)).to.have.length(1);
        });
    });

    describe('Oppfolgingsdialog med Tiltak', () => {
        let componentMedTiltak;

        beforeEach(() => {
            window.sessionStorage = storageMock();
            componentMedTiltak = shallow(<Tiltak
                oppfolgingsdialog={oppfolgingsdialog}
                oppfolgingsdialogerHentet
                lagreTiltak={lagreTiltak}
                slettTiltak={slettTiltak}
                tiltak={{ lagret: true }}
            />);
        });

        it('Skal vise NotifikasjonBoksVurdering, om nye Tiltak er lagt til av motpart, og oppfolgingsdialogAvbrutt er true', () => {
            const oppfolgingsdialogMedNyeTiltak = Object.assign({}, oppfolgingsdialog, {
                arbeidstaker,
                arbeidsgiver,
                tiltakListe: [{
                    opprettetDato: '2017-01-02T00:00:00.000',
                    opprettetAv: arbeidstaker,
                    sistEndretAv: {
                        fnr: '1234567891234',
                    },
                }],
            });
            const componentAvbrutt = shallow(<Tiltak
                oppfolgingsdialog={oppfolgingsdialogMedNyeTiltak}
                lagreTiltak={lagreTiltak}
                slettTiltak={slettTiltak}
                tiltak={tiltak}
            />);
            expect(componentAvbrutt.find(NotifikasjonBoksVurdering)).to.have.length(1);
        });

        it('Skal vise TiltakTabell, om det er tiltak', () => {
            expect(componentMedTiltak.find(TiltakTabell)).to.have.length(1);
        });

        it('Skal vise TiltakTabell, om det er tiltak og visTiltakSkjema er true', () => {
            componentMedTiltak.setState({
                visTiltakSkjema: true,
            });
            expect(componentMedTiltak.find(TiltakTabell)).to.have.length(1);
        });

        it('Skal vise RenderOppfolgingsdialogTiltakTabell, om det er tiltak og visTiltakSkjema er false', () => {
            expect(componentMedTiltak.find(TiltakTabell)).to.have.length(1);
        });
    });
});
