import React from 'react';
import PropTypes from 'prop-types';
import { keyValue } from 'digisyfo-npm';
import * as opProptypes from '../../proptypes/opproptypes';
import OppfolgingsdialogTeaser from './OppfolgingsdialogTeaser';
import OppfolgingsdialogTidligereTeaser from './OppfolgingsdialogTidligereTeaser';

const OppfolgingsdialogTeasere = (
    {
        ledetekster,
        oppfolgingsdialoger,
        className,
        tittel = '',
        id,
        rootUrl,
        rootUrlPlaner,
        brukerType,
        harTidligerOppfolgingsdialoger,
    }) => {
    return (<div className="blokk--l">
        <header className="oppfolgingsdialogTeasere__header">
            <h2>{tittel}</h2>
        </header>
        <div id={id} className={className || 'js-content'}>
            { !harTidligerOppfolgingsdialoger &&
            oppfolgingsdialoger.map((oppfolgingsdialog, idx) => {
                return (
                    <OppfolgingsdialogTeaser
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        key={idx}
                        brukerType={brukerType}
                        rootUrl={rootUrl}
                        rootUrlPlaner={rootUrlPlaner}
                    />);
            })
            }
            { harTidligerOppfolgingsdialoger &&
            oppfolgingsdialoger.map((oppfolgingsdialog, idx) => {
                return (
                    <OppfolgingsdialogTidligereTeaser
                        ledetekster={ledetekster}
                        oppfolgingsdialog={oppfolgingsdialog}
                        key={idx}
                        brukerType={brukerType}
                        rootUrl={rootUrl}
                        rootUrlPlaner={rootUrlPlaner}
                    />);
            })
            }
        </div>
    </div>);
};

OppfolgingsdialogTeasere.propTypes = {
    ledetekster: keyValue,
    oppfolgingsdialoger: PropTypes.arrayOf(opProptypes.oppfolgingsdialogPt),
    harTidligerOppfolgingsdialoger: PropTypes.bool,
    className: PropTypes.string,
    tittel: PropTypes.string,
    id: PropTypes.string,
    brukerType: PropTypes.string,
    rootUrl: PropTypes.string,
    rootUrlPlaner: PropTypes.string,
};

export default OppfolgingsdialogTeasere;
