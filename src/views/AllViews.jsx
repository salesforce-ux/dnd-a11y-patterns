// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import {DragOnCanvasView} from './DragOnCanvas';
import {MoveBetweenListsView} from './MoveBetweenLists';
import {ResizeOneDimensionView} from './ResizeOneDimension';
import {SortingListView} from './SortingList';
import {SortingListboxView} from './SortingListbox';

class AllView extends Component {
  render() {
    return (
      <div>
        <DragOnCanvasView/>
        <ResizeOneDimensionView/>
        <MoveBetweenListsView/>
        <SortingListView/>
        <SortingListboxView/>
      </div>
    )
  }
}

export default AllView
