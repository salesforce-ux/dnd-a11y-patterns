/*!
 * Copyright (c) 2015, salesforce.com, inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

const proptypes =  {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  initials: PropTypes.string.isRequired,
  ariaDescribedby: PropTypes.string,
  isDragging: PropTypes.bool.isRequired,
  isGrabbed: PropTypes.bool,
  handleKeyDown: PropTypes.func.isRequired,
};

class Item extends Component {
  render() {
    const { title, description, initials, isDragging, isGrabbed, ariaDescribedby, handleKeyDown } = this.props;
    const itemClasses = classNames(
      'slds-app-launcher__tile slds-text-link--reset slds-is-draggable',
      {'slds-is-grabbed': (isGrabbed || isDragging)}
    );

    return(
      <a
        aria-describedby={ariaDescribedby}
        href="javascript:void(0)"
        onKeyDown={handleKeyDown}
        className={itemClasses}
      >
        <div className="slds-app-launcher__tile-figure">
          <span className="slds-avatar slds-avatar--large slds-align--absolute-center slds-icon-custom-27">{initials}</span>
          <Icon
            assistiveText="Drag item to a new location"
            sprite="utility"
            symbol="rows"
            size="x-small"
          />
        </div>
        <div className="slds-app-launcher__tile-body">
          <span className="slds-text-link">{title}</span>
          <p>{description}</p>
        </div>
      </a>
    );
  }
}

Item.propTypes = proptypes;

export default Item;
