// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import utilityIconSprite from '../../icons/salesforce-lightning-design-system-utility-icons.svg';
import customIconSprite from '../../icons/custom-icons.svg';

const proptypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  sprite: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
};

class SvgIcon extends Component {

  render() {
    let colorCssClass = '';

    if(this.props.sprite === 'utility') {
      colorCssClass = 'slds-icon-text-default';
    }
    if (this.props.color === 'warning') {
      colorCssClass = 'slds-icon-text-warning';
    }
    if (this.props.color === 'error') {
      colorCssClass = 'slds-icon-text-error';
    }

    const svgClass = classNames(
      this.props.className,
      {
        'slds-icon': (!this.props.className),
        [`slds-icon--${this.props.size}`]: (this.props.size !== undefined)
      },
      colorCssClass
    );

    const path = this.props.sprite === 'utility' ? utilityIconSprite : customIconSprite;
    const href = `${path}#${this.props.symbol}`;

    return (
      <svg
        aria-hidden={true}
        className={svgClass}>
        <use xlinkHref={href}></use>
      </svg>
    );
  }
}

class MoveIcon extends SvgIcon {

}

SvgIcon.propTypes = proptypes;

export default SvgIcon;
