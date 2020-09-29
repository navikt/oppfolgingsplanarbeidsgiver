import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import { Knapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';

export const tekster = {
    tittel: 'Hva kan dere gjøre som arbeidsgiver?',
    knapp: '+ Legg til nytt tiltak',
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const TiltakInfoboks = (
    {
        toggleSkjema,
        visTiltakSkjema,
    }) => {
    const classNames = cn({
        sist: visTiltakSkjema,
        blokk: !visTiltakSkjema,
    });
    return (
        <Panel className="tiltakInfoboks" border>
            <h3 className={classNames}>{tekster.tittel}</h3>
            {!visTiltakSkjema && <Wrapper>
                <Knapp
                    mini
                    htmlType="submit"
                    aria-pressed={visTiltakSkjema}
                    onClick={toggleSkjema}>
                    {tekster.knapp}
                </Knapp>
            </Wrapper>
            }
        </Panel>);
};

TiltakInfoboks.propTypes = {
    visTiltakSkjema: PropTypes.bool,
    toggleSkjema: PropTypes.func,
};

export default TiltakInfoboks;
