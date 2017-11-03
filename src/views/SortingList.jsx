// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SortableList from '../components/SortableList/SortableList';

class SortingListView extends Component {
  constructor (props) {
    super(props);

    this.listItems = [{
      id: 1,
      title: 'Sales Cloud',
      initials: 'SC',
      description: 'The primary internal Salesforce org. Used to run our...'
    }, {
      id: 2,
      title: 'Marketing Cloud',
      initials: 'MC',
      description: 'Salesforce Marketing Cloud lets businesses of any size...'
    }, {
      id: 3,
      title: 'HR Concierge',
      initials: 'HR',
      description: 'Community for managing employee benefits and time off.'
    }, {
      id: 4,
      title: 'My Money',
      initials: 'MM',
      description: 'Manage your finances across multiple financial platforms...'
    }, {
      id: 5,
      title: 'Call Center',
      initials: 'CC',
      description: 'The key to call center and contact center management is more...'
    }, {
      id: 6,
      title: 'Customer Support Community',
      initials: 'CS',
      description: 'Areas of Focus are used to track customer support for your...'
    }, {
      id: 7,
      title: 'Salesforce Chatter',
      initials: 'CH',
      description: 'The Salesforce Chatter social network, including profiles and feeds'
    }];
  }

  renderDocumentation() {
    return (
      <div>
        <h2 className="slds-text-heading_medium slds-p-vertical_medium">
          Sort a list
        </h2>
      </div>
    )
  }

  renderExample () {
    return (
      <div>
        <SortableList listItems={this.listItems} />
      </div>
    )
  }

  render () {
    return (
      <article>
        {this.renderDocumentation()}
        {this.renderExample()}
      </article>
    ); 
  }
}

SortingListView.propTypes = {
  children: PropTypes.node,
}

export default SortingListView
