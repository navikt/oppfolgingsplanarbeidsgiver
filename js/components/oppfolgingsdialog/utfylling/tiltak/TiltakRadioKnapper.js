import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { STATUS_TILTAK } from '../../../../konstanter';
import Radioknapper from '../../../../skjema/Radioknapper';
import { tiltakPt } from '../../../../proptypes/opproptypes';

const texts = {
  options: {
    forslag: 'Marker som forslag',
    avtalt: 'Marker som avtalt',
    ikkeAktuelt: 'Marker som ikke aktuelt',
  },
};

export const getTiltakId = (tiltak) => {
  return tiltak ? tiltak.tiltakId : '';
};

class TiltakRadioKnapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
    };
    this.handledChange = this.handledChange.bind(this);
  }

  componentWillMount() {
    const initData = {};
    initData.tiltakStatus = this.props.tiltak ? this.props.tiltak.status : STATUS_TILTAK.FORSLAG;
  }

  handledChange(e) {
    this.setState({
      status: e,
    });
    this.props.setStatus(e);
  }

  render() {
    const { tiltak } = this.props;
    return (
      <div className="lagretiltakskjema__inputgruppe">
        <Field
          name="status"
          tabIndex="-1"
          id={`${getTiltakId(tiltak)}-input`}
          aria-labelledby={`${getTiltakId(tiltak)}-input`}
          component={Radioknapper}
          onChange={(e) => {
            this.handledChange(e.target.value);
          }}
        >
          <input value={STATUS_TILTAK.FORSLAG} label={texts.options.forslag} id={`${getTiltakId(tiltak)}-forslag`} />
          <input value={STATUS_TILTAK.AVTALT} label={texts.options.avtalt} id={`${getTiltakId(tiltak)}-godkjent`} />
          <input
            value={STATUS_TILTAK.IKKE_AKTUELT}
            label={texts.options.ikkeAktuelt}
            id={`${getTiltakId(tiltak)}-ikke-aktuelt`}
          />
        </Field>
      </div>
    );
  }
}
TiltakRadioKnapper.propTypes = {
  tiltak: tiltakPt,
  setStatus: PropTypes.func,
};

export default TiltakRadioKnapper;
