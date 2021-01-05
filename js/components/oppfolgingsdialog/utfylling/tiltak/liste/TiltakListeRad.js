import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_TILTAK } from '../../../../../konstanter';
import { tiltakPt } from '../../../../../proptypes/opproptypes';
import { toDateMedMaanedNavn } from '../../../../../utils/datoUtils';
import { skalVurdereTiltak } from '../../../../../utils/tiltakUtils';
import TiltakInformasjonKnapper from './TiltakInformasjonKnapper';

const texts = {
    status: {
        avtalt: 'Avtalt',
        ikkAktuelt: 'Ikke aktuelt',
        foreslatt: 'Foreslått',
    },
};

const TiltakListeRad = (
    {
        tiltak,
        erApen,
        fnr,
        sendSlett,
        lagreSkjema,
        visLagreSkjema,
        lagreKommentarSkjema,
        visLagreKommentarSkjema,
        rootUrlImg,
    }) => {
    let klasse = '';
    let status = '';

    switch (tiltak.status) {
        case STATUS_TILTAK.AVTALT:
            klasse = 'etikett--suksess';
            status = texts.status.avtalt;
            break;
        case STATUS_TILTAK.IKKE_AKTUELT:
            klasse = 'etikett--advarsel';
            status = texts.status.ikkAktuelt;
            break;
        default:
            klasse = 'etikett--fokus';
            status = texts.status.foreslatt;
            break;
    }
    return (
        <div className="tiltaktabell__rad__celle">
            { tiltak.fom && tiltak.tom && tiltak.status !== STATUS_TILTAK.IKKE_AKTUELT &&
            <p className="tiltaktabell__meta">{toDateMedMaanedNavn(tiltak.fom)} - {toDateMedMaanedNavn(tiltak.tom)}</p>
            }
            <div className="tiltaktabell__rad__navn">
                <span className="tiltak__rad__navn--tittel">
                    { skalVurdereTiltak(tiltak, fnr) &&
                    <img alt="" className="tiltaktabell__rad__img" src={`${rootUrlImg}/img/svg/varseltrekant.svg`} />
                    }
                    {tiltak.tiltaknavn}
                </span>
                <i className={`nav-frontend-chevron ${erApen ? 'chevron--opp' : 'chevron--ned'} chevron--stor`} />
            </div>
            { tiltak.status &&
            <div className={`tiltaktabell__rad__status etikett ${klasse}`} >
                <span className="typo-normal">
                    {status}
                </span>
            </div>
            }
            <TiltakInformasjonKnapper
                element={tiltak}
                fnr={fnr}
                lagreSkjema={lagreSkjema}
                visLagreSkjema={visLagreSkjema}
                sendSlett={sendSlett}
                lagreKommentarSkjema={lagreKommentarSkjema}
                visLagreKommentarSkjema={visLagreKommentarSkjema}
            />
        </div>);
};

TiltakListeRad.propTypes = {
    tiltak: tiltakPt,
    erApen: PropTypes.bool,
    fnr: PropTypes.string,
    sendSlett: PropTypes.func,
    lagreSkjema: PropTypes.bool,
    visLagreSkjema: PropTypes.func,
    lagreKommentarSkjema: PropTypes.bool,
    visLagreKommentarSkjema: PropTypes.func,
    rootUrlImg: PropTypes.string,
};

export default TiltakListeRad;
