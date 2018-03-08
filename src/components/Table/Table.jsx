// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';

class Table extends Component {
  render() {
    return (
      <table className="slds-table slds-table_bordered slds-table_cell-buffer slds-table_fixed-layout">
        {this.props.children}
      </table>
    );
  }
}

export default Table;