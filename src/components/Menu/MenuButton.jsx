// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const proptypes = {
  /** @type {content} is the content of the button */
  buttonContent: PropTypes.element
}

/**
 * Wrapper for menu buttons
 * @name MenuButton
*/
class MenuButton extends Component {
  constructor() {
    super();
    this.state = {
      menuIsHidden: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
  }

  /**
   * Clones the children elements and sets their props to the correct values based on the MenuButton's state.
  */
  renderMenu() {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        isHidden: this.state.menuIsHidden,
        hideMenu: this.hideMenu
      });
    });
  }

  handleClick() {
    this.setState(prevState => ({
      menuIsHidden: !prevState.menuIsHidden
    }));
  }

  handleKeyDown(event) {
    if (event.key === 'Escape' || event.key === 'Tab') {
      this.setState({ menuIsHidden: true });
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault(); 
      this.setState({ menuIsHidden: false });
    }
  }

  /**
   * Sets the state menuIsHidden to true and focuses back on the button because the menu is not visible.
  */
  hideMenu() {
    this.setState({ menuIsHidden: true });
    this.button.focus();
  }

  render() {
    return(
      <div className={
        classnames(
          "slds-dropdown-trigger slds-dropdown-trigger_click",
          {"slds-is-open": !this.state.menuIsHidden})
        }>
        <button
          aria-haspopup={true}
          className="slds-button slds-button_icon slds-button_icon-border-filled"
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          ref={(button) => {this.button = button}}
        >
          {this.props.buttonLabel}
          {this.props.buttonContent}
        </button>
        {this.renderMenu()}
      </div>
    );
  }
}

MenuButton.propTypes = proptypes;

export default MenuButton;
