import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { Utvidbar } from 'digisyfo-npm';
import GodkjentPlan, {
    GodkjentPlanUtvidbar,
} from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlan';
import GodkjentPlanKnapper from '../../../../../js/components/oppfolgingsdialog/godkjennplan/releasetplan/GodkjentPlanKnapper';
import OppfolgingsplanInnholdboks from '../../../../../js/components/app/OppfolgingsplanInnholdboks';
import getOppfolgingsdialog from '../../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('GodkjentPlan', () => {
    const oppfolgingsdialog = getOppfolgingsdialog({
        arbeidsgiver: {
            navn: 'Test Testesen',
        },
        arbeidstaker: {
            navn: 'Test Testesen',
        },
    });
    const hentPdfurler = sinon.spy();
    const dokument = {
        hentet: true,
        henter: false,
        hentingFeilet: false,
        data: ['enUrl', 'toUrl'],
    };
    const delmednav = {
        sendingFeilet: false,
    };

    const komponentDefault = shallow(<GodkjentPlan
        delmednav={delmednav}
        hentPdfurler={hentPdfurler}
        dokument={dokument}
        oppfolgingsdialog={oppfolgingsdialog}
    />);

    it('Skal vise en GodkjentPlan', () => {
        expect(komponentDefault.find(OppfolgingsplanInnholdboks)).to.have.length(1);
    });

    it('Skal vise en innholdstekst', () => {
        expect(komponentDefault.find('p')).to.have.length(1);
    });

    it('Skal vise en GodkjentPlanUtvidbar', () => {
        expect(komponentDefault.find(GodkjentPlanUtvidbar)).to.have.length(1);
    });

    it('Skal vise en GodkjentPlanKnapper', () => {
        expect(komponentDefault.find(GodkjentPlanKnapper)).to.have.length(1);
    });

    describe('Tvungen Godkjenning', () => {
        const tvungenGodkjentDialog = getOppfolgingsdialog({
            arbeidsgiver: {
                navn: 'Test Testesen',
            },
            arbeidstaker: {
                navn: 'Test Testesen',
            },
            godkjentPlan: [{
                tvungenGodkjenning: true,
                gyldighetstidspunkt: {
                    fom: '', tom: '', evalueres: '',
                },
            },
            ],
        });
        const k2 = shallow(<GodkjentPlanUtvidbar hentPdfurler={hentPdfurler} dokument={dokument} oppfolgingsdialog={tvungenGodkjentDialog} />);

        it('Skal ikke vise infotekst', () => {
            expect(k2.find('p')).to.have.length(0);
        });
    });

    describe('Tvungen Godkjenning', () => {
        const tvungenGodkjentDialog = getOppfolgingsdialog({
            arbeidsgiver: {
                navn: 'Test Testesen',
            },
            arbeidstaker: {
                navn: 'Test Testesen',
            },
            godkjentPlan: [{
                tvungenGodkjenning: true,
                gyldighetstidspunkt: {
                    fom: '', tom: '', evalueres: '',
                },
            },
            ],
        });
        const k2 = shallow(<GodkjentPlanUtvidbar hentPdfurler={hentPdfurler} dokument={dokument} oppfolgingsdialog={tvungenGodkjentDialog} />);

        it('Skal ikke vise infotekst', () => {
            expect(k2.find('p')).to.have.length(0);
        });
    });

    describe('GodkjentPlanUtvidbar', () => {
        const komponent = shallow(<GodkjentPlanUtvidbar dokument={dokument} />);

        it('Skal vise en Utvidbar', () => {
            expect(komponent.find(Utvidbar)).to.have.length(1);
        });

        it('Skal vise plan som bestaar av 2 pdf sider', () => {
            expect(komponent.find('img.godkjentPlanPdf__side')).to.have.length(2);
        });
    });
});
