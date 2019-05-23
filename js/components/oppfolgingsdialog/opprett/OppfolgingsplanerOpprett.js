import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keyValue } from 'digisyfo-npm';
import {
    BaserTidligereSkjema,
    proptypes as oppfolgingProptypes,
} from 'oppfolgingsdialog-npm';
import { finnNyesteTidligereOppfolgingsdialogMedVirksomhet } from '../../../utils/oppfolgingsplanUtils';
import Lightbox from '../../Lightbox';

class OppfolgingsplanerOpprett extends Component {
    constructor(props) {
        super(props);
        this.opprett = this.opprett.bind(this);
    }

    opprett(values) {
        if (values.baserPaaTidligerePlan === 'true') {
            const oppfolgingsdialog = finnNyesteTidligereOppfolgingsdialogMedVirksomhet(this.props.oppfolgingsdialoger);
            if (oppfolgingsdialog) {
                this.props.kopier(oppfolgingsdialog.id);
            }
        } else {
            this.props.opprett();
        }
    }

    render() {
        const {
            ledetekster,
            visOppfolgingsdialogOpprett,
        } = this.props;
        return (<Lightbox lukkLightbox={() => {
            visOppfolgingsdialogOpprett(false);
        }}>
            <BaserTidligereSkjema
                ledetekster={ledetekster}
                onSubmit={this.opprett}
            />
        </Lightbox>);
    }
}
OppfolgingsplanerOpprett.propTypes = {
    ledetekster: keyValue,
    oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingProptypes.oppfolgingsdialogPt),
    visOppfolgingsdialogOpprett: PropTypes.func,
    opprett: PropTypes.func,
    kopier: PropTypes.func,
};

export default OppfolgingsplanerOpprett;
