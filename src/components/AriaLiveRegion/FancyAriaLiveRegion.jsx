// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './FancyAriaLiveRegion.css';

const proptypes = {
  id: PropTypes.string.isRequired,
  isVisible: PropTypes.bool
};

class FancyAriaLiveRegion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: props.isVisible
    }

    this.toggleMessageVisibility = this.toggleMessageVisibility.bind(this);
  }

  toggleMessageVisibility(event) {
    this.setState({isVisible: event.target.checked});
  }

  render() {
    var toggleDesc = this.props.id + '-toggle-desc';

    return (
      <div className="slds-card slds-m-vertical_medium slds-is-relative">
        <div className="slds-card__header">
            <h3 className="slds-text-heading_small">Screenreader Messages</h3>
        </div>
        <div id={this.props.id} className="slds-card__body slds-card__body_inner" aria-live="assertive">
            <span className={classNames({"slds-assistive-text": !this.state.isVisible})}>
              {this.props.children}
            </span>
        </div>

        <div className="slds-form-element slds-is-absolute screenreader-toggle">
            <label className="slds-checkbox_toggle slds-grid">
              <span className="slds-assistive-text slds-form-element__label slds-m-bottom_none">Toggle visibility</span>
              <input
                type="checkbox"
                name="checkbox"
                value="on"
                aria-describedby={toggleDesc}
                checked={this.state.isVisible}
                onChange={this.toggleMessageVisibility} />
              <span id={toggleDesc} className="slds-checkbox_faux_container" aria-live="assertive">
                <span className="slds-checkbox_faux"></span>
                <span className="slds-checkbox_on">Visible</span>
                <span className="slds-checkbox_off">Hidden</span>
              </span>
            </label>
        </div>
      </div>
    );
  }
}

FancyAriaLiveRegion.propTypes = proptypes;

export default FancyAriaLiveRegion;