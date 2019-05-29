import React from 'react';
import {
    getHtmlLedetekst,
    getLedetekst,
} from 'digisyfo-npm';
import Video from '../app/Video';
import { OPPFOLGINGSPLAN } from '../../enums/filmer';

const OppfolgingsplanFilm = () => {
    return (<div className="panel">
        <h2 className="panel__tittel">
            {getLedetekst('oppfolgingsdialog.filmsnutt.tittel')}
        </h2>
        <Video film={OPPFOLGINGSPLAN} />
        <p dangerouslySetInnerHTML={getHtmlLedetekst('oppfolgingsdialog.filmsnutt.tekst')} />
    </div>);
};

export default OppfolgingsplanFilm;
