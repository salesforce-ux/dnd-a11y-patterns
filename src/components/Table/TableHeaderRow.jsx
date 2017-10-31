// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import TableRow from './TableRow';

class TableHeaderRow extends Component {
  render () {
    return (<TableRow className="slds-text-title_caps">{this.props.children}</TableRow>)
  }
}

export default TableHeaderRow;