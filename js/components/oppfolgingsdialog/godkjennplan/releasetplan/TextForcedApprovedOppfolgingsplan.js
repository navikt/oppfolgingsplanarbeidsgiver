import React from 'react';
import PropTypes from 'prop-types';
import BildeTekstLinje from '../../../app/BildeTekstLinje';

const TextForcedApprovedOppfolgingsplan = ({ rootUrl, text }) => {
  return <BildeTekstLinje imgUrl={`${rootUrl}/img/svg/report-problem-circle.svg`} imgAlt="" tekst={text} />;
};

TextForcedApprovedOppfolgingsplan.propTypes = {
  rootUrl: PropTypes.string,
  text: PropTypes.string,
};

export default TextForcedApprovedOppfolgingsplan;
