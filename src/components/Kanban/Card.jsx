// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import Menu from '../Menu/Menu';
import MenuButton from '../Menu/MenuButton';
import MenuItem from '../Menu/MenuItem';
import './Card.css';

const proptypes = {
  columnIndex: PropTypes.number,
  columns: PropTypes.array,
  handleMenuMove: PropTypes.func,
  index: PropTypes.number,
  label: PropTypes.string,
}

class Card extends Component {
  constructor(props) {
    super(props);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
  }

  handleDragStart(event) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('cardIndex', this.props.index);
    event.dataTransfer.setData('columnIndex', this.props.columnIndex);
  }

  handleDrag(event) {
    event.preventDefault();
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  renderMenuItems() {
    var menuItems = [];
    var clickFunc = (newColumnIndex) => {
      return () => {
        this.props.handleMenuMove(this.props.index, this.props.columnIndex, newColumnIndex);
      }
    };
    for (var i = 0; i < this.props.columns.length; i++) {
      if (i !== this.props.columnIndex) {
        menuItems.push(
          <MenuItem
            key={'menuItem' + i}
            name={this.props.columns[i].label}
            onClick={clickFunc(i)}
          />
        );
      }
    }
    return menuItems;
  }

  renderButtonContent() {
    return (
      <Icon
        assistiveText={"Move " + this.props.label}
        sprite="utility"
        symbol="move"
        iconClassName='slds-button__icon'
      />
    );
  }

  render() {
    return (
      <li
        className="slds-item slds-p-around_medium"
        draggable="true"
        onDragStart={this.handleDragStart}
        onDrag={this.handleDrag}
        onDragOver={this.handleDragOver}
        data-index={this.props.index}
      >
        <article>
          <div className="slds-grid">
            <div className="slds-col">
              <a href="#" className="slds-text-link">{this.props.label}</a>
            </div>
            <div className="slds-col slds-text-align_right">
              <MenuButton buttonContent={this.renderButtonContent()}>
                <Menu>
                  {this.renderMenuItems()}
                </Menu>
              </MenuButton>
            </div>
          </div>
          <p className="slds-p-vertical_small">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </article>
      </li>
    );
  }
}

Card.propTypes = proptypes;

export default Card;
