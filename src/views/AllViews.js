// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import DragOnCanvas from './DragOnCanvas';
import MoveBetweenLists from './MoveBetweenLists';
import ResizeOneDimension from './ResizeOneDimension';
import SortingList from './SortingList';
import SortingListbox from './SortingListbox';

class AllView extends Component {
  render () {
    return (
      <div>
        <DragOnCanvas/>
        <ResizeOneDimension/>
        <MoveBetweenLists/>
        <SortingList/>
        <SortingListbox/>
      </div>
    )
  }
}

export default AllView
