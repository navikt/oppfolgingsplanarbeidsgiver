import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { oppfolgingsplanPt } from '../../../proptypes/opproptypes';
import { finnNyesteTidligereOppfolgingsdialogMedVirksomhet } from '../../../utils/oppfolgingsplanUtils';
import Lightbox from '../../Lightbox';
import BaserTidligereSkjema from '../../oppfolgingsplaner/opprett/BaserTidligereSkjema';

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
    const { visOppfolgingsdialogOpprett } = this.props;
    return (
      <Lightbox
        lukkLightbox={() => {
          visOppfolgingsdialogOpprett(false);
        }}
      >
        <BaserTidligereSkjema onSubmit={this.opprett} />
      </Lightbox>
    );
  }
}
OppfolgingsplanerOpprett.propTypes = {
  oppfolgingsdialoger: PropTypes.arrayOf(oppfolgingsplanPt),
  visOppfolgingsdialogOpprett: PropTypes.func,
  opprett: PropTypes.func,
  kopier: PropTypes.func,
};

export default OppfolgingsplanerOpprett;
