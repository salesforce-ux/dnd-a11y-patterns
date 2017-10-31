// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const proptypes = {
  /** @type {string} is the name for the sizing class for horizontal list options*/
  horizontalClass: PropTypes.string,
  /** @type {string} is value for the option's id*/
  id: PropTypes.string,
  /** @type {bool} specifies if option is draggable*/
  isDraggable: PropTypes.bool,
  /** @type {bool} specifies if option is focused*/
  isFocused: PropTypes.bool,
  /** @type {bool} specifies if option is in a horizontal listbox*/
  isHorizontal: PropTypes.bool,
  /** @type {bool} specifies if option is selected*/
  isSelected: PropTypes.bool,
  /** @type {string} is the name of the list element*/
  name: PropTypes.string,
  /** @type {function} the function triggered when onClick fires*/
  onClick: PropTypes.func,
  /** @type {function} the function triggered when onDrag fires*/
  onDrag: PropTypes.func,
  /** @type {function} the function triggered when onDragOver fires*/
  onDragOver: PropTypes.func,
  /** @type {function} the function triggered when onDrop fires*/
  onDrop: PropTypes.func
}

/** 
 * A list element for a listbox
 * @name ListboxOption
 */
class ListboxOption extends PureComponent {
  componentDidUpdate() {
    if (this.props.isFocused) {
      this.listItem.focus();
    }
  }

  render() {
    return(
      <li
        aria-selected={this.props.isSelected}
        className={classnames("slds-p-around_xx-small", this.props.horizontalClass,
          {
            "slds-text-align_center": !this.props.isDraggable,
            "slds-color__background_gray-4": this.props.isSelected
          }
        )}
        draggable={this.props.isDraggable ? true : false}
        id={this.props.id}
        onClick={this.props.onClick}
        onDrag={this.props.isDraggable ? this.props.onDrag : null}
        onDragOver={this.props.isDraggable ? this.props.onDragOver : null}
        onDrop={this.props.isDraggable ? this.props.onDrop : null}
        ref={(li) => { this.listItem = li; }}
        role="option"
        tabIndex={this.props.isFocused ? 0 : -1}
      >
        {this.props.isDraggable ? 
          <span aria-hidden={true} className="slds-text-heading_medium slds-p-right_xx-small">⋮</span> : null
        }
        {this.props.name}
      </li>
    );
  }
}

ListboxOption.propTypes = proptypes;

export default ListboxOption;
