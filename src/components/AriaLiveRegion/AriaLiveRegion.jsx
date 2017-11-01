// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const proptypes = {
  id: PropTypes.string.isRequired,
  isVisible: PropTypes.bool
};

class AriaLiveRegion extends Component {
  render() {
    return (
      <div id={this.props.id} aria-live="assertive">
        <span className={classNames({"slds-assistive-text": !this.props.isVisible})}>
          {this.props.children}
        </span>
      </div>
    );
  }
}

AriaLiveRegion.propTypes = proptypes;

export default AriaLiveRegion;