import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as opProptypes from '../../../../proptypes/opproptypes';
import ArbeidsoppgaveInformasjon from './ArbeidsoppgaveInformasjon';
import ArbeidsoppgaveOverskrift from './ArbeidsoppgaveOverskrift';
import ArbeidsoppgaveVarselFeil from './ArbeidsoppgaveVarselFeil';

const texts = {
  updateError: 'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.',
};

const ArbeidsoppgaveVarselFeilStyled = styled.div`
  padding: 0 1em;
`;

class Arbeidsoppgave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visSlettingFeilet: false,
    };
    this.visElementInformasjon = this.visElementInformasjon.bind(this);
    this.visFeil = this.visFeil.bind(this);
    this.sendSlett = this.sendSlett.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.element.arbeidsoppgaveId === nextProps.arbeidsoppgaverReducer.feiletOppgaveId) {
      if (
        nextProps.arbeidsoppgaverReducer.slettingFeilet &&
        nextProps.arbeidsoppgaverReducer.slettingFeilet !== this.props.arbeidsoppgaverReducer.slettingFeilet &&
        nextProps.arbeidsoppgaverReducer.feiletOppgaveId > 0
      ) {
        if (nextProps.arbeidsoppgaverReducer.slettingFeilet) {
          this.props.visFeilMelding(true);
          this.visFeil(true);
        } else if (!nextProps.arbeidsoppgaverReducer.slettingFeilet) {
          this.visFeil(false);
        }
      } else if (!nextProps.arbeidsoppgaverReducer.slettingFeilet) {
        this.visFeil(false);
      }
    } else if (!nextProps.arbeidsoppgaverReducer.slettingFeilet) {
      this.visFeil(false);
    }
  }

  visFeil(slettingFeilet) {
    this.setState({
      visSlettingFeilet: slettingFeilet,
    });
  }

  visElementInformasjon() {
    this.setState({
      visInnhold: true,
    });
    this.props.visFeilMelding(false);
  }

  sendSlett(event, id) {
    event.stopPropagation();
    this.props.sendSlett(id);
  }

  render() {
    const { element, fnr, feilMelding } = this.props;
    return (() => {
      return (
        <article
          className="arbeidsoppgaverListe__rad arbeidsoppgaverListe__rad--element"
          aria-label={element.arbeidsoppgavenavn}
        >
          <div>
            <div className="arbeidsoppgaverListe__radoverskrift">
              <ArbeidsoppgaveOverskrift
                erApen={this.state.erApen}
                fnr={fnr}
                sendSlett={this.sendSlett}
                arbeidsoppgave={element}
              />
            </div>
          </div>
          <ArbeidsoppgaveInformasjon
            arbeidsoppgave={element}
            oppdateringFeilet={this.state.visSlettingFeilet && feilMelding}
            varselTekst={texts.updateError}
          />
          {this.state.visSlettingFeilet && feilMelding && (
            <ArbeidsoppgaveVarselFeilStyled>
              <ArbeidsoppgaveVarselFeil tekst={texts.updateError} />
            </ArbeidsoppgaveVarselFeilStyled>
          )}
        </article>
      );
    })();
  }
}

Arbeidsoppgave.propTypes = {
  element: opProptypes.arbeidsoppgavePt,
  fnr: PropTypes.string,
  sendSlett: PropTypes.func,
  visFeilMelding: PropTypes.func,
  feilMelding: PropTypes.bool,
  arbeidsoppgaverReducer: opProptypes.arbeidsoppgaverReducerPt,
};

Arbeidsoppgave.defaultProps = {
  Overskrift: 'H3',
};

export const mapStateToProps = (state) => {
  return {
    arbeidsoppgaverReducer: state.arbeidsoppgaver,
  };
};

const ArbeidsoppgaveContainer = connect(mapStateToProps, null, null, { pure: false })(Arbeidsoppgave);

export default ArbeidsoppgaveContainer;
