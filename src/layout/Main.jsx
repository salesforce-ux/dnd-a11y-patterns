// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import NavLayout from './Nav';

class MainLayout extends Component {
  render () {
    return (
      <div className="slds-grid slds-wrap">
        <div className="slds-nav-vertical slds-p-vertical_medium slds-p-right_x-large">
          <h1 className="slds-nav-vertical__title slds-text-title_caps">
              D&D Interaction Patterns
          </h1>
          <NavLayout currentPath={this.props.location.pathname} />
        </div>
        <div>
          <main className="slds-container--medium slds-container--center">
              {React.cloneElement(this.props.children, {})}
          </main>
        </div>
      </div>
    )
  }
}

MainLayout.propTypes = {
  children: PropTypes.node,
}

export default MainLayout
