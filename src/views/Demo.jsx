// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import {DragOnCanvasExample} from './DragOnCanvas';
import {MoveBetweenListsExample} from './MoveBetweenLists';
import {ResizeOneDimensionExample} from './ResizeOneDimension';
import {SortingListExample} from './SortingList';
import {SortingListboxExample} from './SortingListbox';

class DemoView extends Component {
  constructor() {
    super();
    this.state = {
      pattern: ""
    };

    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection(event) {
    this.setState({pattern: event.target.value});
  }

  renderPicker() {
    return (
      <div className="slds-form-element">
        <label className="slds-form-element__label" htmlFor="pattern-selector">Pattern:</label>
        <div className="slds-form-element__control">
          <div className="slds-select_container">
            <select className="slds-select" id="pattern-selector" value={this.state.pattern} onChange={this.handleSelection}>
              <option value="">--- Select a pattern ---</option>
              <option value="canvas">Interact with a canvas</option>
              <option value="resize">Resize in one dimension</option>
              <option value="lists">Move between lists</option>
              <option value="listbox">Sort a listbox</option>
              <option value="list">Sort a list</option>
            </select>
          </div>
        </div>
      </div>
    )
  }

  renderUI() {
    switch (this.state.pattern) {
      case 'canvas':
        return (<DragOnCanvasExample hideFancyLiveRegion={true} />);
      case 'resize':
        return (<ResizeOneDimensionExample/>);
      case 'list':
        return (<SortingListExample/>);
      case 'listbox':
        return (<SortingListboxExample/>);
      case 'lists':
        return (<MoveBetweenListsExample/>);
    }
  }

  render() {
    return (
      <main className="slds-p-around_medium">
        <div className="demo-page__select-container">
          {this.renderPicker()}
        </div>
        <div className="slds-container--medium demo-page__example-container">
          {this.renderUI()}
        </div>
      </main>
    )
  }
}

export default DemoView
