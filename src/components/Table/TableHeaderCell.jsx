// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import './TableHeaderCell.css';

const proptypes = {
  label: PropTypes.string.isRequired,
  resizable: PropTypes.bool,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  stepSize: PropTypes.number,
  width: PropTypes.number
}

const defaultProps = {
  minWidth: 60,
  maxWidth: 600,
  stepSize: 10,
  width: 100
}

class TableHeaderCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width
    };

    this.renderResizer = this.renderResizer.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleResize(event) {
    this.setState({width: event.target.value});
  }

  handleDrop(event, data) {
    this.setState({width: this.state.width + data.x});
  }

  renderResizer() {
    if (this.props.resizable) {
      return ((
        <div className="slds-resizable">
          <input
            aria-label={"Width of " + this.props.label + " Column"}
            type="range"
            min={this.props.minWidth}
            max={this.props.maxWidth}
            step={this.props.stepSize}
            value={this.state.width}
            onChange={this.handleResize}
            className="slds-resizable__input slds-assistive-text" />

          <Draggable
            axis="x"
            onStop={this.handleDrop}
            position={{x: 0, y: 0}}
            bounds={{
              left: this.props.minWidth-this.state.width,
              right: this.props.maxWidth - this.state.width
            }}
          >
            <span className="slds-resizable__handle">
              <span className="slds-resizable__divider"></span>
            </span>
          </Draggable>

        </div>
      ));
    }
  }

  render() {
    var classes = this.props.resizable ? 'slds-is-resizable': '';
    var style = this.props.resizable ? { width: this.state.width + 'px'} : {};
    return (
      <th scope="col" aria-label={this.props.label} className={classes} style={style}>
        <span className="slds-truncate">{this.props.label}</span>
        {this.renderResizer()}
      </th>
    );
  }
}

TableHeaderCell.propTypes = proptypes;
TableHeaderCell.defaultProps = defaultProps;

export default TableHeaderCell;