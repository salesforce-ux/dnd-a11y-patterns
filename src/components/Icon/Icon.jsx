// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SvgIcon from './SvgIcon';

const proptypes = {
  assistiveText: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  sprite: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  iconClassName: PropTypes.string
};

class Icon extends Component {
  render() {
    const containerClass = classNames(
      this.props.className,
      {
        'slds-icon_container': true,
        'slds-icon_container--circle': (this.props.sprite === 'action'),
        [`slds-icon-${this.props.sprite}-${this.props.symbol}`]: (this.props.sprite === 'standard' || this.props.sprite === 'action')
      }
    );
    return (
      <span className={containerClass} title={this.props.assistiveText}>
        <SvgIcon className={this.props.iconClassName} color={this.props.color} size={this.props.size} sprite={this.props.sprite} symbol={this.props.symbol}></SvgIcon>
        <span className="slds-assistive-text">{this.props.assistiveText}</span>
      </span>
    );
  }
}

Icon.propTypes = proptypes;

export default Icon;