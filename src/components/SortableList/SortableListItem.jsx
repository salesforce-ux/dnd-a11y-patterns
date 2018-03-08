// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import Item from './Item';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import './SortableListItem.css';

const itemSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const itemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveItem(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

const proptypes = {
  ariaDescribedby: PropTypes.string,
  cancelMove: PropTypes.func,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  description: PropTypes.string,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  Initials: PropTypes.string,
  moveItem: PropTypes.func.isRequired,
  dropItem: PropTypes.func,
  grabItem: PropTypes.func,
};

class SortableListItem extends Component {

  constructor (props) {
    super(props)

    this.state = {
      isGrabbed: false,
      ariaDescribedby: this.props.ariaDescribedby
    }

    this.cancelMove = this.cancelMove.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.moveItemDown = this.moveItemDown.bind(this);
    this.moveItemUp = this.moveItemUp.bind(this);
    this.toggleGrabbed = this.toggleGrabbed.bind(this);
  }

  cancelMove() {
    if(this.state.isGrabbed) {
      this.props.cancelMove(this.props.index);
      this.setState({
        'isGrabbed': false
      });
    }
  }

  handleKeyDown(e) {

    switch (e.key) {
      case ' ':
        e.preventDefault();
        this.toggleGrabbed();
        break;

      case 'Escape':
        e.preventDefault();
        this.cancelMove();
        break;

      case 'Tab':
        if(this.state.isGrabbed) {
          e.preventDefault();
        }
        break;

      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        this.moveItemDown();
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        this.moveItemUp();
        break;

      default:
        break;
    }

  }

  moveItemDown() {
    if(!this.state.isGrabbed) return;
    this.props.moveItem(this.props.index, (this.props.index + 1));
  }

  moveItemUp() {
    if(!this.state.isGrabbed) return;
    this.props.moveItem(this.props.index, (this.props.index - 1));
  }

  toggleGrabbed() {
    if(!this.state.isGrabbed) {
      this.props.grabItem(this.props.index);
    } else {
      this.props.dropItem(this.props.index);
    }

    this.setState({
      isGrabbed: !this.state.isGrabbed,
      ariaDescribedby: (this.state.isGrabbed) ? this.props.ariaDescribedby : null
    });
  }

  render() {
    const { title, description, initials, isDragging, connectDragSource, connectDropTarget } = this.props;
    const { ariaDescribedby } = this.state;
    const styles = {
      opacity: isDragging ? 0 : 1
    };

    return connectDragSource(connectDropTarget(
      <li className="slds-p-horizontal--small slds-size--1-of-1 slds-medium-size--1-of-3 slds-sortable-list__list-item" style={styles}>
        <Item
          title={title}
          description={description}
          initials={initials}
          ariaDescribedby={ariaDescribedby}
          isDragging={isDragging}
          isGrabbed={this.state.isGrabbed}
          handleKeyDown={this.handleKeyDown}
        />
      </li>
    ));
  }
}

SortableListItem.propTypes = proptypes;

export default flow([
  DropTarget(ItemTypes.ITEM, itemTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource(ItemTypes.ITEM, itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
])(SortableListItem);
