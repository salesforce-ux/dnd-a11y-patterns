// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import PropTypes from 'prop-types';

const proptypes = {
  firstCellIsHeader: PropTypes.bool
}

const defaultProps = {
  firstCellIsHeader: true
}

class TableRow extends Component {
  renderCells() {
    return React.Children.map(this.props.children, (child, i) => {
      if (i === 0 && this.props.firstCellIsHeader) {
        return React.cloneElement(child, {scope: 'row'})
      }
      return React.cloneElement(child);
    });
  }

  render() {
    return (<tr className={this.props.className}>{this.renderCells()}</tr>);
  }
}

TableRow.propTypes = proptypes;
TableRow.defaultProps = defaultProps;

export default TableRow;