import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Panel } from 'nav-frontend-paneler';
import * as opProptypes from '../../proptypes/opproptypes';
import {
    finnOppfolgingsdialogMotpartNavn,
} from '../../utils/oppfolgingsplanUtils';
import { hentPlanStatus } from '../../utils/teaserUtils';

const OppfolgingsdialogTidligereTeaser = (
    {
        oppfolgingsdialog,
        rootUrl,
        rootUrlPlaner,
    }) => {
    const planStatus = hentPlanStatus(oppfolgingsdialog);
    return (<article aria-labelledby={`oppfolgingsdialog-header-aktiv-${oppfolgingsdialog.id}`}>
        <Link to={`${rootUrlPlaner}/oppfolgingsplaner/${oppfolgingsdialog.id}`}>
            <Panel border className="inngangspanel oppfolgingsdialog">
                <span className="oppfolgingsplanInnhold__ikon">
                    <img alt="plan" src={`${rootUrl}/img/svg/${planStatus.img}`} />
                </span>
                <div className="inngangspanel__innhold">
                    <header className="inngangspanel__header">
                        <h3 className="js-title" id={`oppfolgingsdialog-header-${oppfolgingsdialog.id}`}>
                            <span className="inngangspanel__tittel">
                                {finnOppfolgingsdialogMotpartNavn(oppfolgingsdialog)}
                            </span>
                        </h3>
                    </header>
                    <p className="mute inngangspanel__avsnitt">
                        {planStatus.tekst}
                    </p>
                </div>
            </Panel>
        </Link>
    </article>);
};
OppfolgingsdialogTidligereTeaser.propTypes = {
    oppfolgingsdialog: opProptypes.oppfolgingsplanPt,
    rootUrl: PropTypes.string,
    rootUrlPlaner: PropTypes.string,
};

export default OppfolgingsdialogTidligereTeaser;
