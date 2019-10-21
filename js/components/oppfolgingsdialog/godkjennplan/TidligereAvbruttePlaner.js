import React from 'react';
import PropTypes from 'prop-types';
import { getLedetekst } from 'digisyfo-npm';
import { restdatoTildato } from '../../../utils/datoUtils';
import { oppfolgingsdialogPt } from '../../../proptypes/opproptypes';

const TidligereAvbruttePlaner = ({ oppfolgingsdialog, rootUrlPlaner }) => {
    if (oppfolgingsdialog.avbruttPlanListe && oppfolgingsdialog.avbruttPlanListe.length > 0) {
        return (
            <div className="tidligereAvbruttePlaner">
                <p>{getLedetekst('oppfolgingsdialog.tidligereAvbruttePlaner.tittel')}</p>
                <ul>
                    {
                        oppfolgingsdialog.avbruttPlanListe.map((avbruttPlan, idx) => {
                            return (<li key={idx}>
                                <a
                                    className="lenke"
                                    href={`${rootUrlPlaner}/oppfolgingsplaner/${avbruttPlan.id}/`}
                                >
                                    {getLedetekst('oppfolgingsdialog.tidligereAvbruttePlaner.lenke.tekst', {
                                        '%TIDSPUNKT%': restdatoTildato(avbruttPlan.tidspunkt),
                                    })}
                                </a>
                            </li>);
                        })
                    }
                </ul>
            </div>
        );
    }
    return null;
};

TidligereAvbruttePlaner.propTypes = {
    oppfolgingsdialog: oppfolgingsdialogPt,
    rootUrlPlaner: PropTypes.string,
};

export default TidligereAvbruttePlaner;
