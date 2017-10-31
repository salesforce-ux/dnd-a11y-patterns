// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';

class TableCell extends Component {
  render() {
    if (this.props.scope) {
      return (
        <th scope={this.props.scope}>
          <div className="slds-truncate">
            {this.props.children}
          </div>
        </th>
      );
    } else {
      return (
        <td>
          <div className="slds-truncate">
            {this.props.children}
          </div>
        </td>
      );
    }
  }
}

export default TableCell;