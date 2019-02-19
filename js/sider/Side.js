import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimeoutBox } from 'digisyfo-npm';
import Brodsmuler from '../components/Brodsmuler';
import AppSpinner from '../components/AppSpinner';
import { brodsmule as brodsmulePt } from '../shapes';

const DocumentTitle = require('react-document-title');

export const setAppClass = (laster) => {
    const el = document.getElementById('maincontent');
    if (el) {
        const className = laster ? 'app app--laster' : 'app';
        el.className = className;
    }
};

export const getClassNames = (laster) => {
    return laster
        ? 'side side--laster'
        : 'side side--lastet';
};

class Side extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visSpinnerIDom: props.laster,
        };
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.laster && !nextProps.laster) {
            const timeoutHandle = window.setTimeout(() => {
                this.setState({
                    visSpinnerIDom: false,
                });
            }, 100);
            this.setState({ timeoutHandle });
        } else if (this.props.laster || nextProps.laster) {
            this.setState({
                visSpinnerIDom: true,
            });
            if (this.state.timeoutHandle) {
                window.clearTimeout(this.state.timeoutHandle);
            }
        }
    }

    render() {
        const { children, tittel, brodsmuler = [], laster, begrenset, Spinner } = this.props;
        const classNames = getClassNames(laster, begrenset);
        setAppClass(laster);
        return (<DocumentTitle title={tittel + (tittel.length > 0 ? ' - www.nav.no' : 'www.nav.no')}>
            <div className={classNames} aria-busy={laster}>
                <TimeoutBox />
                { this.state.visSpinnerIDom && <div className="side__spinner">
                    <Spinner />
                </div> }
                <div className={begrenset ? 'side__innhold side__innhold--begrenset js-begrensning' : 'side__innhold'}>
                    { begrenset && <Brodsmuler brodsmuler={brodsmuler} /> }
                    {children}
                </div>
            </div>
        </DocumentTitle>);
    }
}

Side.defaultProps = {
    brodsmuler: [],
    begrenset: true,
    laster: false,
    Spinner: AppSpinner,
};

Side.propTypes = {
    children: PropTypes.element,
    tittel: PropTypes.string,
    brodsmuler: PropTypes.arrayOf(brodsmulePt),
    laster: PropTypes.bool,
    begrenset: PropTypes.bool,
    Spinner: PropTypes.func,
};

export default Side;
