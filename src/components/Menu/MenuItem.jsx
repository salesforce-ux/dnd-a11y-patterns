// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MenuItem.css';

const proptypes = {
  /** @type {string} is the name for the sizing class for horizontal list options*/
  horizontalClass: PropTypes.string,
  /** @type {string} the value for the list element's id*/
  id: PropTypes.string,
  /** @type {bool} specifies if the element is focused*/
  isFocused: PropTypes.bool,
  /** @type {bool} specifies if the element is in a horizontal menu*/
  isHorizontal: PropTypes.bool,
  /** @type {string} the name of the list element*/
  name: PropTypes.string,
  /** @type {function} the function triggered when onKeyDown fires*/
  onKeyDown: PropTypes.func,
  onClick: PropTypes.func
}

/**
 * A list element for a menu
 * @name MenuItem
*/
class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate() {
    if (this.props.isFocused) {
      this.listItem.focus();
    }
  }

  handleKeyDown(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      this.props.onClick(event);
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  render() {
    return(
      <li
        className="slds-dropdown__item"
        id={this.props.id}
        onKeyDown={this.handleKeyDown}
        ref={(li) => { this.listItem = li; }}
        role="menuitem"
        tabIndex={this.props.isHorizontal && this.props.isFocused ? 0 : -1}
        onClick={this.props.onClick ? this.props.onClick : null}
      >
        {this.props.name}
      </li>
    );
  }
}

MenuItem.propTypes = proptypes;

export default MenuItem;
