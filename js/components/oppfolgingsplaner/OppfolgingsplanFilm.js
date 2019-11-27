import React from 'react';
import Video from '../app/Video';
import { OPPFOLGINGSPLAN } from '../../enums/filmer';

const texts = {
    title: 'Om oppfølgingsplanen',
};

const TextLink = () => {
    return (
        <React.Fragment>
            Har du noen spørsmål? <a className="lenke" target="_blank" rel="noopener noreferrer" href="https://nav.no/oppfølgingsplan">Les gjerne mer om oppfølgingsplanen her</a>.
        </React.Fragment>
    );
};

const OppfolgingsplanFilm = () => {
    return (<div className="panel">
        <h2 className="panel__tittel">
            {texts.title}
        </h2>
        <Video film={OPPFOLGINGSPLAN} />
        <p>
            <TextLink />
        </p>
    </div>);
};

export default OppfolgingsplanFilm;
