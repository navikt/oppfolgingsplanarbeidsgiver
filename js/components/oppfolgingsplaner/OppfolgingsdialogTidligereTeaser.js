import React from 'react';
import PropTypes from 'prop-types';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import * as opProptypes from '../../proptypes/opproptypes';
import { finnOppfolgingsdialogMotpartNavn } from '../../utils/oppfolgingsplanUtils';
import { hentPlanStatus } from '../../utils/teaserUtils';

const OppfolgingsdialogTidligereTeaser = ({ oppfolgingsdialog, rootUrlPlaner }) => {
  const planStatus = hentPlanStatus(oppfolgingsdialog);
  return (
    <LenkepanelBase href={`${rootUrlPlaner}/oppfolgingsplaner/${oppfolgingsdialog.id}`} border>
      <div className="inngangspanel">
        <span className="oppfolgingsplanInnhold__ikon">
          <img alt="" src={planStatus.img} />
        </span>
        <div className="inngangspanel__innhold">
          <header className="inngangspanel__header">
            <h3 className="js-title" id={`oppfolgingsdialog-header-${oppfolgingsdialog.id}`}>
              <span className="inngangspanel__tittel">{finnOppfolgingsdialogMotpartNavn(oppfolgingsdialog)}</span>
            </h3>
          </header>
          <p className="mute inngangspanel__avsnitt">{planStatus.tekst}</p>
        </div>
      </div>
    </LenkepanelBase>
  );
};
OppfolgingsdialogTidligereTeaser.propTypes = {
  oppfolgingsdialog: opProptypes.oppfolgingsplanPt,
  rootUrlPlaner: PropTypes.string,
};

export default OppfolgingsdialogTidligereTeaser;
