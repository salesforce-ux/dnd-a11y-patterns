// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AriaLiveRegion from '../AriaLiveRegion/AriaLiveRegion';
import FancyAriaLiveRegion from '../AriaLiveRegion/FancyAriaLiveRegion';
import './Canvas.css';

const proptypes = {
  /** @type {number} width/height of each grid cell */
  gridInterval: PropTypes.number,
  /** @type {number} width/height of total grid */
  gridSize: PropTypes.number,
  /** @type {number} minimum height of resizable box */
  minHeight: PropTypes.number,
  /** @type {number} minimum width of resizable box */
  minWidth: PropTypes.number,
  /** @type {boolean} whether or not to show fancy live region*/
  hideFancyLiveRegion: PropTypes.bool
};

const defaultProps = {
  gridInterval: 20,
  gridSize: 20,
  minWidth: 1,
  minHeight: 1,
  hideFancyLiveRegion: false
};

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {liveText: ''};
    this.updateLiveText = this.updateLiveText.bind(this);
  }

  updateLiveText(text) {
    this.setState({liveText: text});
  }

  renderCanvasItems() {
    const canvasSize = this.props.gridSize * this.props.gridInterval;

    return React.Children.map(this.props.children, (child, i) => {
      return React.cloneElement(child, {
        updateLiveText: this.updateLiveText,
        gridInterval: this.props.gridInterval,
        canvasSize: canvasSize,
        moveAriaDescribedby: 'dnd-canvas__operation--move',
        resizeAriaDescribedby: 'dnd-canvas__operation--resize'
      });
    });
  }

  renderLiveRegion() {
    if (this.props.hideFancyLiveRegion) {
      return (
        <AriaLiveRegion id="dnd_canvas__live">
          {this.state.liveText}
        </AriaLiveRegion>
      );
    } else {
      return (
        <FancyAriaLiveRegion
          id="dnd-canvas__live"
          hasVisibilityToggle={true}
          isVisible={!this.props.hideFancyLiveRegion}
        >
          {this.state.liveText}
        </FancyAriaLiveRegion>
      );
    }
  }

  render() {
    var size = this.props.gridInterval * this.props.gridSize;
    var backgroundSize = this.props.gridInterval*2+ 'px ' + this.props.gridInterval*2 + 'px';
    var style = {
      backgroundSize: backgroundSize,
      backgroundPosition: '10px 10px', // TODO: remove hardcoding
      width: size + 'px',
      height: size + 'px',
    };
    
    return (
      <div>
        {this.renderLiveRegion()}

        <span id="dnd-canvas__operation--move" className="slds-assistive-text">
          Press Spacebar to toggle grab
        </span>

        <span id="dnd-canvas__operation--resize" className="slds-assistive-text">
          Press Spacebar to toggle resize
        </span>

        <div
          className="slds-box dnd-canvas__container"
          aria-label={`Canvas: ${this.props.gridSize} by ${this.props.gridSize}`}
          style={style}
        >
          {this.renderCanvasItems()}
        </div>
      </div>
    )
  }
}

Canvas.propTypes = proptypes;
Canvas.defaultProps = defaultProps;

export default Canvas;
