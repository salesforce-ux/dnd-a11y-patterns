// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Canvas from '../components/Canvas/Canvas';
import CanvasItem from '../components/Canvas/CanvasItem';


const proptypes = {
  /** @type {boolean} whether or not to show fancy live region*/
  hideFancyLiveRegion: PropTypes.bool
};

const defaultProps = {
  hideFancyLiveRegion: false
};

export class DragOnCanvasExample extends Component {
  render() {
    return (
      <div>
        <Canvas hideFancyLiveRegion={this.props.hideFancyLiveRegion}>
          <CanvasItem label="Object A" x={2} y={1} width={7} height={6} minWidth={3} minHeight={3}/>
          <CanvasItem label="Object B" x={6} y={12} width={4} height={4} minWidth={3} minHeight={3} />
        </Canvas>
      </div>
    );
  }
}

DragOnCanvasExample.propTypes = proptypes;
DragOnCanvasExample.defaultProps = defaultProps;

export class DragOnCanvasView extends Component {
  renderDocumentation() {
    return (
      <div>
        <h2 className="slds-text-heading_medium slds-p-vertical_medium">Interact with a canvas</h2>
        
        <h3 className="slds-text-heading_small slds-p-vertical_medium">Move an item</h3>
        <ul className="slds-list_dotted">
          <li>
            Click and drag the item around the canvas
          </li>
          <li>
            Press space bar on its Move button to pick the item up, arrow keys to move, and space bar to drop
          </li>
        </ul>

        <h3 className="slds-text-heading_small slds-p-vertical_medium">Resize an item</h3>
        <ul className="slds-list_dotted">
          <li>Click and drag the bottom right corner of the item</li>
          <li>
            Press space bar on its Resize button, arrow keys to resize, and space bar to confirm
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <article>
        {this.renderDocumentation()}
        <DragOnCanvasExample/>
      </article>
    ); 
  }
}

// module.exports = {DragOnCanvasExample, DragOnCanvasView}
