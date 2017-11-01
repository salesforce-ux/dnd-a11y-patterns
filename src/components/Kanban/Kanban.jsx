// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Column from './Column';

const proptypes = {
  listItems: PropTypes.array
};

class Kanban extends Component {
  constructor(props) {
    super(props);
    this.state = {columns: this.props.columns};

    this.handleDropOnColumn = this.handleDropOnColumn.bind(this);
    this.moveCardBetweenColumns = this.moveCardBetweenColumns.bind(this);
  }

  moveCardBetweenColumns(cardIndex, currentColumnIndex, newColumnIndex) {
    var columns = this.state.columns;
    var cardData = columns[currentColumnIndex].cards.splice(cardIndex, 1)[0];
    columns[newColumnIndex].cards.unshift(cardData);
    this.setState({columns: columns, buttonFocusColumnRef: 'column' + newColumnIndex});
  }

  handleDropOnColumn(event, newColumnIndex) {
    this.moveCardBetweenColumns(
      event.dataTransfer.getData('cardIndex'),
      event.dataTransfer.getData('columnIndex'),
      newColumnIndex);
  }

  componentDidUpdate(event) {
    // this is a bit of a hack to get keyboard focus to
    // return to button after element is moved
    if (this.state.buttonFocusColumnRef) {
      const column = this.refs[this.state.buttonFocusColumnRef];
      if (column) {
        const firstCard = column.refs.card0;
        if (firstCard) {
          ReactDOM.findDOMNode(firstCard).querySelector('button').focus();
          this.setState({buttonFocusColumnRef: null});
        }
      }
    }
  }

  renderColumns() {
    return this.state.columns.map((column, i) => {
      return (
        <Column
          ref={'column' + i}
          key={'column' + i} 
          label={column.label}
          cards={column.cards}
          index={i}
          columns={this.state.columns}
          handleMenuMove={this.moveCardBetweenColumns}
          onDrop={this.handleDropOnColumn}
        />);
    })
  }

  render() {
    return (
      <div className="dnd-kanban slds-grid slds-p-vertical_large" >
        {this.renderColumns()}
      </div>
    );
  }
}

Kanban.propTypes = proptypes;

export default Kanban;
