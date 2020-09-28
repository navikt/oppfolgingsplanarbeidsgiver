import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import kommentar from '../../../../../js/reducers/kommentar';
import TiltakInformasjon, {
    TiltakInformasjonBeskrivelse,
    TiltakInformasjonGjennomfoering,
    TabellTiltakBeskrivelseIkkeAktuelt,
} from '../../../../../js/components/oppfolgingsdialog/utfylling/tiltak/liste/TiltakInformasjon';
import LagreKommentarSkjema from '../../../../../js/components/oppfolgingsdialog/utfylling/tiltak/kommentar/LagreKommentarSkjema';
import KommentarListe from '../../../../../js/components/oppfolgingsdialog/utfylling/tiltak/kommentar/KommentarListe';
import getOppfolgingsplan from '../../../../mock/mockOppfolgingsdialog';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('TiltakInformasjon', () => {
    let komponent;
    let oppfolgingsdialog;

    beforeEach(() => {
        oppfolgingsdialog = getOppfolgingsplan();
        komponent = shallow(<TiltakInformasjon
            element={oppfolgingsdialog.tiltakListe[0]}
            kommentarReducer={kommentar}
            lagreKommentarSkjema
        />);
    });

    it('Skal vise korrekt div', () => {
        expect(komponent.find('div.tiltaktabell__rad__utvidbar')).to.have.length(1);
    });

    it('Skal vise TiltakInformasjonBeskrivelse', () => {
        expect(komponent.find(TiltakInformasjonBeskrivelse)).to.have.length(1);
    });

    it('Skal vise TiltakInformasjonGjennomfoering', () => {
        expect(komponent.find(TiltakInformasjonGjennomfoering)).to.have.length(1);
    });

    it('Skal vise TabellTiltakBeskrivelseIkkeAktuelt', () => {
        const tiltak = {
            tiltakId: '1',
            beskrivelseIkkeAktuelt: 'beskrivelseIkkeAktuelt',
            status: 'IKKE_AKTUELT',
            opprettetAv: {
                fnr: '1000000000000',
            },
            sistEndretAv: {
                fnr: '1000000000000',
            },
            kommentarer: [],
        };

        komponent = shallow(<TiltakInformasjon
            element={tiltak}
            kommentarReducer={kommentar}
        />);
        expect(komponent.find(TabellTiltakBeskrivelseIkkeAktuelt)).to.have.length(1);
    });

    it('Skal vise LagreKommentarSkjema', () => {
        expect(komponent.find(LagreKommentarSkjema)).to.have.length(1);
    });

    it('Skal vise KommentarListe', () => {
        expect(komponent.find(KommentarListe)).to.have.length(1);
    });
});
