// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from './Icon';

const proptypes = {
  ariaDescribedby: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  assistiveText: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  sprite: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
};

class IconButton extends Component {
  render() {
    const buttonClass = classNames(
      this.props.className,
      {
        'slds-button': true,
        'slds-button_icon': true,
        'slds-button_icon-small': true
      }
    );
    return (
      <button
        className={buttonClass}
        onClick={this.props.onClick}
        onKeyDown={this.props.onKeyDown}
        aria-describedby={this.props.ariaDescribedby}>
        <Icon
          assistiveText={this.props.assistiveText}
          color={this.props.color}
          size={this.props.size}
          sprite={this.props.sprite}
          symbol={this.props.symbol}
          iconClassName='slds-button__icon'
        />
      </button>
    );
  }
}

IconButton.propTypes = proptypes;

export default IconButton;