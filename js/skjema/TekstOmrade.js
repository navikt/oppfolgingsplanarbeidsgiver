import React from 'react';
import PropTypes from 'prop-types';
import Feilmelding from './Feilmelding';
import { fieldPropTypes } from '../proptypes/fieldproptypes';

const Tekstomrade = (props) => {
    const { meta, className, input, id } = props;
    return (<div className="skjemaelement">
        <textarea
            className={`skjemaelement__input ${className}${meta.touched && meta.error
                ? ' skjemaelement__input--harFeil'
                : ''
            }`}
            {...input}
            value={input.value}
            autoComplete="off"
            placeholder={props.placeholder}
            id={id}
            rows={props.rows}
        />
        <Feilmelding {...meta} />
    </div>);
};

Tekstomrade.propTypes = {
    meta: fieldPropTypes.meta,
    id: PropTypes.string,
    rows: PropTypes.string,
    input: fieldPropTypes.input,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
};

export default Tekstomrade;
