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
  render () {
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
