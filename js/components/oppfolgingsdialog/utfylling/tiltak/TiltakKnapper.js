import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Knapp } from 'nav-frontend-knapper';
import {
    tiltakPt,
    tiltakReducerPt,
} from '../../../../proptypes/opproptypes';

const texts = {
    buttonAbort: 'Avbryt',
    buttonCreate: 'Legg til tiltak',
    buttonUpdate: 'Lagre tiltak',
};

const handleKeyPress = (avbryt, e) => {
    e.preventDefault();
    if (e.nativeEvent.keyCode === 13) {
        avbryt();
    }
};

class TiltakKnapper extends Component {
    constructor() {
        super();
        this.state = {
            spinner: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.tiltakReducer && nextProps.tiltakReducer.lagrer && !nextProps.tiltakReducer.tiltakId && !this.props.tiltak) ||
            (this.props.tiltak && nextProps.tiltakReducer.tiltakId > 0 && nextProps.tiltakReducer.tiltakId === this.props.tiltak.tiltakId)) {
            this.setState({
                spinner: nextProps.tiltakReducer.lagrer,
            });
        } else {
            this.setState({
                spinner: false,
            });
        }
    }

    render() {
        const {
            avbryt,
            tiltak,
        } = this.props;
        const submitButtonText = tiltak
            ? texts.buttonUpdate
            : texts.buttonCreate;
        return (
            <div className="knapperad knapperad--justervenstre">
                <div className="knapperad__element">
                    <Knapp
                        mini
                        disabled={this.state.spinner}
                        spinner={this.state.spinner}
                        htmlType="submit">
                        {submitButtonText}
                    </Knapp>
                </div>
                <div className="knapperad__element">
                    <button
                        type="button"
                        className="lenke"
                        onKeyPress={(e) => {
                            handleKeyPress(avbryt, e);
                        }}
                        onMouseDown={avbryt}>
                        {texts.buttonAbort}
                    </button>
                </div>
            </div>
        );
    }
}
TiltakKnapper.propTypes = {
    avbryt: PropTypes.func,
    tiltak: tiltakPt,
    tiltakReducer: tiltakReducerPt,
};

export default TiltakKnapper;
