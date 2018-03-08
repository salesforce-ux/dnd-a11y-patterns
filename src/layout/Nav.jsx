// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, {Component} from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';

class NavItem extends Component {
    render() {
        const isActive = this.props.currentPath === '/' + this.props.to;
        const navItemClasses = classNames({
            'slds-nav-vertical__item': true,
            'slds-is-active': isActive
        });
        return (
            <li className={navItemClasses}>
                <Link to={this.props.to}
                    aria-current={isActive ? "page" : null}
                    className="slds-nav-vertical__action">
                    {this.props.label}
                </Link>
            </li>
        );
    }
}

class NavLayout extends Component {
  render() {
    return (
        <nav>
            <ul>
                <NavItem to="canvas" label="Interact with a canvas" currentPath={this.props.currentPath} />
                <NavItem to="resize" label="Resize in one dimension" currentPath={this.props.currentPath} />
                <NavItem to="bucket" label="Move between lists" currentPath={this.props.currentPath} />
                <NavItem to="sortA" label="Sort a list" currentPath={this.props.currentPath} />
                <NavItem to="sortB" label="Sort a listbox" currentPath={this.props.currentPath} />
            </ul>
        </nav>
    )
  }
}

export default NavLayout
