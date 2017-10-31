// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import Table from '../components/Table/Table';
import TableHeaderRow from '../components/Table/TableHeaderRow';
import TableHeaderCell from '../components/Table/TableHeaderCell';
import TableRow from '../components/Table/TableRow';
import TableCell from '../components/Table/TableCell';

class ResizeOneDimensionView extends Component {
  renderDocumentation() {
    return (
      <div className="slds-p-bottom_medium">
        <h2 className="slds-text-heading_medium slds-p-vertical_medium">Resize in one dimension</h2>
        <p>Resize the Name column by dragging or using arrow keys.</p>
      </div>
    )
  }

  renderExample() {
    return (
      <Table>
        <thead>
          <TableHeaderRow>
            <TableHeaderCell label="Name" resizable />
            <TableHeaderCell label="Role"/>
            <TableHeaderCell label="Founder?" />
          </TableHeaderRow>
        </thead>
        <tbody>
          <TableRow>
            <TableCell>Marc Benioff</TableCell>
            <TableCell>Chairman & CEO</TableCell>
            <TableCell>Yes</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Parker Harris</TableCell>
            <TableCell>Co-Founder</TableCell>
            <TableCell>Yes</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cordelia McGee-Tubb</TableCell>
            <TableCell>Lead Accessibility Engineer</TableCell>
            <TableCell>No</TableCell>
          </TableRow>
        </tbody>
      </Table>
    )
  }

  render() {
    return (
      <article>
        {this.renderDocumentation()}
        {this.renderExample()}
      </article>
    )
  }
}

export default ResizeOneDimensionView;
