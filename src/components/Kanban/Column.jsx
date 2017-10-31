// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from './Card';
import './Column.css';

const proptypes = {
  cards: PropTypes.array,
  columns: PropTypes.array,
  handleMenuMove: PropTypes.func,
  index: PropTypes.number,
  label: PropTypes.string,
  onDrop: PropTypes.func
}

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {cards: this.props.cards};
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  handleDragEnter(event) {
    this.setState({draggedOver: true});
  }

  handleDragLeave(event) {
    this.setState({draggedOver: false});
  }

  handleDrop(event) {
    this.setState({draggedOver: false});
    this.props.onDrop(event, this.props.index);
  }

  renderCards() {
    return this.state.cards.map((card, i) => {
      return (
        <Card
          ref={'card' + i}
          key={'card' + i}
          label={card}
          index={i}
          columnIndex={this.props.index}
          columns={this.props.columns}
          handleMenuMove={this.props.handleMenuMove}
        />);
    })
  }

  render() {
    return (
      <section
        className={classNames(
          "slds-p-around_small slds-border_right slds-border_top slds-border_bottom dnd-kanban__column",
          {"slds-border_left": this.props.index === 0,
           "dnd-kanban__column--dragging-over": this.state.draggedOver}
        )}
        onDragOver={this.handleDragOver}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
        ref="section"
      >
        <h3 className="slds-text-heading_small slds-p-bottom_small">
          {this.props.label}
        </h3>
        <ul
          className="slds-has-dividers_around-space"
          data-index={this.props.index}
        >
          {this.renderCards()}
        </ul>
      </section>
    );
  }

}

Column.propTypes = proptypes;

export default Column;
