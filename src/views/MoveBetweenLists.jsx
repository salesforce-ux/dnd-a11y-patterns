// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import Kanban from '../components/Kanban/Kanban';

export class MoveBetweenListsExample extends Component {
  render() {
    return (
      <Kanban columns={[
        { 
          label: 'Desk',
          cards: ['Phone', 'Phone Charger']
        }, {
          label: 'Backpack',
          cards: ['Notebook', 'Pencil', 'Hand Sanitizer']
        }, {
          label: 'Pocket',
          cards: ['Keys', 'Wallet']
        }, {
          label: 'Recycling Bin',
          cards: []
        }
      ]} />);
  }
}

export class MoveBetweenListsView extends Component {
  renderDocumentation() {
    return (
      <div>
        <h2 className="slds-text-heading_medium slds-p-vertical_medium">
          Move between lists
        </h2>
        <ul className="slds-list_dotted">
          <li>
            Click and drag item to new list
          </li>
          <li>
            Press item's Move button to open a menu of available lists,
            arrow keys to select a list, Enter to drop, or Escape to cancel
          </li>
        </ul>
      </div>
    )
  }

  render() {
    return (
      <article>
        {this.renderDocumentation()}
        <MoveBetweenListsExample/>
      </article>
    ); 
  }
}

// module.exports = { MoveBetweenListsExample, MoveBetweenListsView}
