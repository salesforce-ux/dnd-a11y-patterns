// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import MainLayout from './layout/Main';

import AllViews from './views/AllViews';
import DemoView from './views/Demo';
import {DragOnCanvasView} from './views/DragOnCanvas';
import {MoveBetweenListsView} from './views/MoveBetweenLists';
import {ResizeOneDimensionView} from './views/ResizeOneDimension';
import {SortingListView} from './views/SortingList';
import {SortingListboxView} from './views/SortingListbox';

import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={AllViews} />
    </Route>
    <Route path="/demo" component={DemoView} />
    <Route path="/resize" component={MainLayout}>
      <IndexRoute component={ResizeOneDimensionView} />
    </Route>
    <Route path="/canvas" component={MainLayout}>
      <IndexRoute component={DragOnCanvasView} />
    </Route>
    <Route path="/bucket" component={MainLayout}>
      <IndexRoute component={MoveBetweenListsView} />
    </Route>
    <Route path="/sortA" component={MainLayout}>
      <IndexRoute component={SortingListView} />
    </Route>
    <Route path="/sortB" component={MainLayout}>
      <IndexRoute component={SortingListboxView} />
    </Route>
  </Router>,
  document.getElementById('root')
);
