// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const proptypes = {
  /** @type {string} is the value for the aria-label*/
  "aria-label": PropTypes.string,
  /** @type {string} is the name for the sizing class for horizontal list options*/
  horizontalClass: PropTypes.string,
  /** @type {bool} specifies if the list is a menu bar*/
  isMenuBar: PropTypes.bool
}

/** 
 * A list of menu options
 * @name Menu
 */
class Menu extends Component {
  constructor() {
    super();
    this.state = {
      focusedItem: 0
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    if (this.props.focusedItem != null) {
      this.setState({ focusedItem: this.props.focusedItem });
    }
  }

  /**
   * Sets the value of the focusedItem state to the correct new value based on the direction the keyboard nav moved.
   * @props {string} direction - specifies the direction of movement
  */
  changeFocused(direction) {
    let newFocus;
    if (direction === 'increased') {
      newFocus = this.state.focusedItem < this.props.children.length - 1 ? this.state.focusedItem + 1 : 0;
    } else {
      newFocus = this.state.focusedItem > 0 ? this.state.focusedItem - 1 : this.props.children.length - 1;
    }
    this.setState({ focusedItem: newFocus });
  }

  handleClick(event) {
    if (this.props.hideMenu) {
      this.props.hideMenu();
    }
  }

  handleKeyDown(event) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (this.props.hideMenu) {
        this.props.hideMenu();
      }
    }

    if (event.key === 'Escape' || (event.key === 'Tab')) {
      if (this.props.hideMenu) {
        this.props.hideMenu();
      }
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.changeFocused('increased');
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      this.changeFocused('decreased');
    }
  }

  /**
   * Clones the children elements and sets their props to the correct values based on the Menu's state.
  */
  renderMenuItems() {
    return React.Children.map(this.props.children, (child, i) => {
      if (child) {
        return React.cloneElement(child, {
          hideMenu: this.props.hideMenu,
          horizontalClass: this.props.horizontalClass,
          id: i.toString(),
          isFocused: (i === this.state.focusedItem ? true : false),
        });
      }
    });
  }

  render() {
    return(
      <div className="slds-dropdown">
        <ul
          aria-label={this.props["aria-label"]}
          className="slds-dropdown__list"
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          role={this.props.isMenuBar ? "menubar" : "menu"}
        >
          {this.renderMenuItems()}
        </ul>
      </div>
    );
  }
}

Menu.propTypes = proptypes;

export default Menu;
