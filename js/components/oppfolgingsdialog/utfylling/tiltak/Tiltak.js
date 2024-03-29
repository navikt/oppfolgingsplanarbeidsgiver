import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import * as opProptypes from '../../../../proptypes/opproptypes';
import { capitalizeFirstLetter } from '../../../../utils/tekstUtils';
import { sorterTiltakEtterNyeste } from '../../../../utils/tiltakUtils';
import { getContextRoot } from '../../../../routers/paths';
import { isEmpty } from '../../../../utils/oppfolgingsplanUtils';
import OppfolgingsplanInfoboks from '../../../app/OppfolgingsplanInfoboks';
import LeggTilElementKnapper from '../LeggTilElementKnapper';
import NotifikasjonBoksVurdering from './NotifikasjonBoksVurdering';
import TiltakInfoboks from './TiltakInfoboks';
import TiltakSkjema from './TiltakSkjema';
import TiltakListe from './liste/TiltakListe';
import StegTittel from '../StegTittel';
import ObligatoriskeFelterInfotekst from '../ObligatoriskeFelterInfotekst';
import { TiltakOnboardingImage } from '@/images/imageComponents';
import { scrollTo } from '../../../../utils/browserUtils';

const texts = {
  tittel: 'Tiltak',
  updateError: 'En midlertidig feil gjør at vi ikke kan lagre endringene dine akkurat nå. Prøv igjen senere.',
  infoboks: {
    title: 'Hva kan gjøre det lettere å jobbe?',
    info: `
            Når dere har fått oversikt over arbeidsoppgavene, kan dere se på hva slags tilrettelegging det er mulig å tilby.
        `,
  },
};

const harArbeidsgiverKommentert = (tiltak, fnr) => {
  return tiltak.kommentarer.filter((kommentar) => {
    return kommentar.opprettetAv.fnr !== fnr;
  });
};

class Tiltak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visTiltakSkjema: false,
      nyttTiltak: false,
      oppdatertTiltak: false,
      lagreNyTiltakFeilet: false,
      oppdateringFeilet: false,
      varselTekst: '',
    };
    window.location.hash = 'tiltak';
    window.sessionStorage.setItem('hash', 'tiltak');
    this.sendLagreTiltak = this.sendLagreTiltak.bind(this);
    this.sendSlettTiltak = this.sendSlettTiltak.bind(this);
    this.sendLagreKommentar = this.sendLagreKommentar.bind(this);
    this.sendSlettKommentar = this.sendSlettKommentar.bind(this);
    this.toggleTiltakSkjema = this.toggleTiltakSkjema.bind(this);
    this.visOppdateringFeilet = this.visOppdateringFeilet.bind(this);
    this.skjulSkjema = this.skjulSkjema.bind(this);
    this.formRef = React.createRef();
  }

  componentDidMount() {
    window.scrollTo(0, this.formRef.current.offsetTop);
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      !nextProps.tiltak.feiletTiltakId &&
      nextProps.tiltak.lagringFeilet &&
      this.props.tiltak.lagringFeilet !== nextProps.tiltak.lagringFeilet
    ) {
      this.setState({
        lagreNyTiltakFeilet: true,
        visTiltakSkjema: true,
        varselTekst: texts.updateError,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.visTiltakSkjema && this.state.visTiltakSkjema && this.lagreSkjema) {
      // eslint-disable-next-line react/no-find-dom-node
      const form = findDOMNode(this.lagreSkjema);
      scrollTo(form, 300);
    }
  }

  visOppdateringFeilet(feilet) {
    this.setState({
      oppdateringFeilet: feilet,
      lagreNyTiltakFeilet: false,
    });
  }

  sendLagreTiltak(values) {
    const { oppfolgingsdialog } = this.props;
    if (!values.tiltakId) {
      this.state.nyttTiltak = true;
      this.state.oppdatertTiltak = false;
    } else {
      this.state.nyttTiltak = false;
      this.state.oppdatertTiltak = true;
    }
    const nyeValues = Object.assign({}, values, {
      tiltaknavn: capitalizeFirstLetter(values.tiltaknavn),
    });
    this.props.lagreTiltak(oppfolgingsdialog.id, nyeValues, oppfolgingsdialog.arbeidstaker.fnr);
    this.setState({
      visTiltakSkjema: false,
    });
  }

  sendSlettTiltak(tiltakId) {
    const { oppfolgingsdialog } = this.props;
    this.props.slettTiltak(oppfolgingsdialog.id, tiltakId, oppfolgingsdialog.arbeidstaker.fnr);
  }

  sendLagreKommentar(tiltakId, values) {
    const { oppfolgingsdialog } = this.props;
    this.props.lagreKommentar(oppfolgingsdialog.id, tiltakId, values, oppfolgingsdialog.arbeidstaker.fnr);
  }

  sendSlettKommentar(tiltakId, kommentarId) {
    const { oppfolgingsdialog } = this.props;
    this.props.slettKommentar(oppfolgingsdialog.id, tiltakId, kommentarId, oppfolgingsdialog.arbeidstaker.fnr);
  }

  toggleTiltakSkjema() {
    this.setState({
      visTiltakSkjema: !this.state.visTiltakSkjema,
    });
  }

  skjulSkjema() {
    this.setState({
      visTiltakSkjema: false,
      lagreNyTiltakFeilet: false,
    });
  }

  render() {
    const { oppfolgingsdialog, tiltak } = this.props;
    const antallIkkeVurderteTiltak = oppfolgingsdialog.tiltakListe.filter((element) => {
      return (
        element.opprettetAv.fnr === oppfolgingsdialog.arbeidstaker.fnr &&
        element.sistEndretAv.fnr === oppfolgingsdialog.arbeidstaker.fnr &&
        (isEmpty(element.kommentarer) ||
          harArbeidsgiverKommentert(element, oppfolgingsdialog.arbeidstaker.fnr).length === 0)
      );
    }).length;
    return (() => {
      return (
        <div>
          <StegTittel tittel={texts.tittel} />
          <ObligatoriskeFelterInfotekst />
          {isEmpty(oppfolgingsdialog.tiltakListe) ? (
            <div ref={this.formRef}>
              {!this.state.visTiltakSkjema ? (
                <OppfolgingsplanInfoboks
                  svgUrl={TiltakOnboardingImage}
                  svgAlt=""
                  tittel={texts.infoboks.title}
                  tekst={texts.infoboks.info}
                >
                  <LeggTilElementKnapper
                    visSkjema={this.state.visTiltakSkjema}
                    toggleSkjema={this.toggleTiltakSkjema}
                  />
                </OppfolgingsplanInfoboks>
              ) : (
                <div>
                  <TiltakInfoboks visTiltakSkjema={this.state.visTiltakSkjema} toggleSkjema={this.toggleTiltakSkjema} />

                  <TiltakSkjema
                    sendLagre={this.sendLagreTiltak}
                    avbryt={this.skjulSkjema}
                    fnr={oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr}
                    varselTekst={this.state.varselTekst}
                    oppdateringFeilet={this.state.lagreNyTiltakFeilet}
                    tiltakReducer={tiltak}
                  />
                </div>
              )}
            </div>
          ) : (
            <div ref={this.formRef}>
              {antallIkkeVurderteTiltak > 0 && (
                <NotifikasjonBoksVurdering
                  navn={oppfolgingsdialog.arbeidstaker.navn}
                  antallIkkeVurderte={antallIkkeVurderteTiltak}
                />
              )}
              {<TiltakInfoboks visTiltakSkjema={this.state.visTiltakSkjema} toggleSkjema={this.toggleTiltakSkjema} />}
              {this.state.visTiltakSkjema && (
                <TiltakSkjema
                  sendLagre={this.sendLagreTiltak}
                  avbryt={this.skjulSkjema}
                  fnr={oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr}
                  ref={(lagreSkjema) => {
                    this.lagreSkjema = lagreSkjema;
                  }}
                  varselTekst={this.state.varselTekst}
                  oppdateringFeilet={this.state.lagreNyTiltakFeilet}
                  tiltakReducer={tiltak}
                />
              )}
              <TiltakListe
                liste={sorterTiltakEtterNyeste(oppfolgingsdialog.tiltakListe)}
                sendLagre={this.sendLagreTiltak}
                sendSlett={this.sendSlettTiltak}
                sendLagreKommentar={this.sendLagreKommentar}
                sendSlettKommentar={this.sendSlettKommentar}
                fnr={oppfolgingsdialog.arbeidsgiver.naermesteLeder.fnr}
                visFeilMelding={this.visOppdateringFeilet}
                feilMelding={this.state.oppdateringFeilet}
                rootUrlImg={getContextRoot()}
              />
            </div>
          )}
        </div>
      );
    })();
  }
}

Tiltak.propTypes = {
  tiltak: opProptypes.tiltakReducerPt,
  oppfolgingsdialog: opProptypes.oppfolgingsplanPt,
  lagreTiltak: PropTypes.func,
  slettTiltak: PropTypes.func,
  lagreKommentar: PropTypes.func,
  slettKommentar: PropTypes.func,
};

export default Tiltak;
