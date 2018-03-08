// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const proptypes = {
  /** @type {string} is value for the aria-label*/
  ariaLabel: PropTypes.string,
  /** @type {bool} specifies if the list allows drag and drop*/
  hasDragDrop: PropTypes.bool,
  /** @type {bool} specifies if the list allows multi select*/
  hasMulti: PropTypes.bool,
  /** @type {string} is the name for the sizing class for horizontal list options*/
  horizontalClass: PropTypes.string,
  /** @type {bool} specifies if the list is displayed horizontally*/
  isHorizontal: PropTypes.bool
}

/** 
 * A list of listbox options
 * @name Listbox
 */
class Listbox extends Component {
  constructor() {
    super();
    this.state = {
      ariaLiveText: '',
      focusedOption: 0,
      inDragDropMode: false,
      listOptions: null,
      selectedOptions: [0]
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.setState({ listOptions: this.props.children });
  }

  /**
   * Returns the new option based on the direction of movement and the current option
   * @props {integer} option - the current option
   * @props {boolean} moveNext - specifies the direction the option moved
  */
  findNewOption(option, moveNext) {
    var newOption = option;
    if (option < (this.props.children.length - 1) && moveNext) { newOption += 1; } 
    else if (option === this.props.children.length - 1 && moveNext) { newOption = 0; } 
    else if (option > 0 && !moveNext) { newOption -= 1; }
    else if (option === 0 && !moveNext) { newOption = this.props.children.length - 1; }
    return newOption;
  }

  handleClick(event) {
    let option = parseInt(event.target.id, 10);
    event.preventDefault();
    if (this.props.hasMulti && event.shiftKey) {
      var updatedSelected = [];
      var rangeSelected = [];
      var i = 0;
      var start = this.state.selectedOptions[this.state.selectedOptions.length - 1];
      if (option > start) {
        for (i = start; i <= option; i++) { rangeSelected.push(i); }
      } else {
        for (i = option; i <= start; i++) { rangeSelected.push(i); }
      }
      for (i = 0; i < rangeSelected.length; i++) {
        updatedSelected = this.updateArray(rangeSelected[i], updatedSelected);
      }
    } else if (this.props.hasMulti && (event.ctrlKey || event.metaKey)) {
      updatedSelected = this.updateArray(option, this.state.selectedOptions);
    } else {
      updatedSelected = [option];
    }
    this.setState({
      focusedOption: option,
      selectedOptions: updatedSelected
    });
  }

  handleDragStart(event) {
    event.dataTransfer.dropEffect = "move";
  }

  handleDrag(event) {
    event.preventDefault();
    var index = parseInt(event.target.id, 10);
    this.setState({
      focusedOption: index,
      selectedOptions: [index]
    });
  }

  /**
   * Handles keyboard events for drag and drop listboxes
   * @props {event} event - the keydown event
  */
  handleDragDropKeyDown(event) {
    var currentOption = parseInt(event.target.id, 10);
    var ariaLiveText, startIndex, grabbedOptionName;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (this.state.inDragDropMode) {
        event.preventDefault();
        let moveNext;
        if (event.key === 'ArrowDown') { moveNext = true; } 
        else { moveNext = false; }
        startIndex = this.state.selectedOptions[0];
        var newOption = this.findNewOption(currentOption, moveNext);
        this.handleDragStateChange(startIndex, newOption);
        ariaLiveText = '';
        this.setState({ariaLiveText});
      } else {
        this.handleSingleSelectKeyDown(event);
      }
    } else if (event.key === ' ') {
      event.preventDefault();
      grabbedOptionName = this.state.listOptions[currentOption].props.name;
      if (this.state.inDragDropMode) {
        startIndex = this.state.selectedOptions[0];
        var endIndex = this.state.focusedOption;
        this.handleDragStateChange(startIndex, endIndex);
        grabbedOptionName = this.state.listOptions[startIndex].props.name;
      }
      ariaLiveText = this.updateAssistiveText(grabbedOptionName, this.state.focusedOption, this.state.inDragDropMode, false);
      this.setState( prevState => ({
        ariaLiveText,
        inDragDropMode: !prevState.inDragDropMode
      }));
    }
  }

  /** Handles the drag over event, necessary because it makes the event target a valid drop area */
  handleDragOver(event) {
    event.preventDefault();
  }

  /**
   * Changes the elements and selected states of the list when drop an element
   * @props {integer} startIndex - the original location of the element
   * @props {integer} endIndex - the new location of the element
  */
  handleDragStateChange(startIndex, endIndex) {
    var options = this.state.listOptions.slice();
    var option = this.state.listOptions[startIndex];
    options.splice(startIndex, 1);
    options.splice(endIndex, 0, option);
    var selected = [endIndex];
    this.setState({
      focusedOption: endIndex,
      listOptions: options,
      selectedOptions: selected
    });
  }

  handleDrop(event) {
    event.preventDefault();
    var startIndex = this.state.selectedOptions[0];
    var endIndex = parseInt(event.target.id, 10);
    this.handleDragStateChange(startIndex, endIndex);
  }

  handleKeyDown(event) {
    if (this.props.hasMulti) {
      this.handleMultiSelectKeyDown(event);
    } else if (this.props.hasDragDrop) {
      this.handleDragDropKeyDown(event);
    } else {
      this.handleSingleSelectKeyDown(event);
    }
  }

  /**
   * Handles keyboard events for multi select listboxes
   * @props {event} event - the keydown event
  */
  handleMultiSelectKeyDown(event) {
    var currentOption = parseInt(event.target.id, 10);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      let moveNext;
      if (event.key === 'ArrowDown') { moveNext = true; } 
      else { moveNext = false; }
      var newOption = this.findNewOption(currentOption, moveNext);

      if (event.shiftKey) {
        var selectedOptions = this.updateArray(newOption, this.state.selectedOptions);
        this.setState({
          focusedOption: newOption,
          selectedOptions: selectedOptions
        });
      } else if (event.ctrlKey || event.metaKey) {
        this.setState({ focusedOption: newOption });
      } else {
        this.handleSingleSelectKeyDown(event);
      }
    } else if (event.key === ' ' && event.ctrlKey) {
      event.preventDefault();
      var updatedSelected = this.updateArray(currentOption, this.state.selectedOptions);
      this.setState({ selectedOptions: updatedSelected });
    } else if (event.key === 'a' && event.ctrlKey) {
      this.handleSelectAll();
    }
  }

  /**
   * Selects/Deselects all the options based on what is currently selected
  */
  handleSelectAll() {
    var selectedOptions = [0, 1, 2, 3];
    var ariaLiveText = 'Selected all elements';
    if (this.state.selectedOptions.length === 4) {
      selectedOptions = [this.state.focusedOption];
      ariaLiveText = 'Deselected all elements';
    }
    this.setState({
      selectedOptions,
      ariaLiveText
    });
  }

  /**
   * Handles keyboard events for single select listboxes
   * @props {event} event - the keydown event
  */
  handleSingleSelectKeyDown(event) {
    let currentOption = parseInt(event.target.id, 10);
    if (event.key === 'ArrowDown' || (event.key === 'ArrowRight' && this.props.isHorizontal)) {
      event.preventDefault();
      let newOption = this.findNewOption(currentOption, true);
      this.setState({
        focusedOption: newOption,
        selectedOptions: [newOption],
        ariaLiveText: null
      });
    } else if (event.key === 'ArrowUp' || (event.key === 'ArrowLeft' && this.props.isHorizontal)) {
      event.preventDefault();
      let newOption = this.findNewOption(currentOption, false);
      this.setState({
        focusedOption: newOption,
        selectedOptions: [newOption],
        ariaLiveText: null
      });
    }
  }

  /**
   * Clones the children elements and sets their props to the correct values based on the Listbox's state.
   * The order they are displayed is based on the state 'listOptions'
  */
  renderListboxOptions() {
    return React.Children.map(this.state.listOptions, (child, i) => {
      return React.cloneElement(child, {
        horizontalClass: this.props.horizontalClass,
        id: i.toString(),
        isDraggable: this.props.hasDragDrop,
        isFocused: (this.state.focusedOption === i ? true : false),
        isHorizontal: this.props.isHorizontal,
        isMultiSelectable: this.props.hasMulti,
        isSelected: (this.state.selectedOptions.indexOf(i) > -1 ? true : false),
        onClick: this.handleClick,
        onDragStart: this.handleDragStart,
        onDrag: this.handleDrag,
        onDragOver: this.handleDragOver,
        onDrop: this.handleDrop
      });
    });
  }

  /**
   * Returns a new array that either removes or adds an element
   * @props {integer} element - element changed in the array
   * @props {array} arr - original array
  */
  updateArray(element, arr) {
    var newArr = arr.slice();
    if (arr.indexOf(element) === -1) {
      newArr.push(element);
    } else {
      newArr.splice(arr.indexOf(element), 1);
    }
    return newArr;
  }

  /**
   * Returns a new string for the aria-live div for drag and drop listboxes
   * @props {array} element - the name of the selected element
   * @props {integer} index - index of where the elements are
   * @props {boolean} drop - specifies if the element is being dropped into its new location
   * @props {boolean} move - specifies if the element is being moved
  */
  updateAssistiveText(element, index, drop, move) {
    var updatedString = element;
    if (!drop && !move) { updatedString += ' grabbed, current '; } 
    if (!drop && move) { updatedString += ' moved, new '; } 
    if (drop) { updatedString += ' dropped, final '; }
    updatedString += 'position ' + (index + 1) + ' of ' + this.props.children.length;
    return updatedString;
  }

  render() {
    let AssistiveText = () =>
      <div>
        {this.props.hasDragDrop ? 
          <div id="instructions" className="slds-p-vertical_small">
                Press space bar to toggle drag drop mode, use arrow keys to move selected elements.
          </div> : null
        }
        {this.props.hasDragDrop || this.props.hasMulti ? 
          <div aria-live="assertive" className="slds-assistive-text assistiveText">
              {this.state.ariaLiveText}
          </div> : null
        }
      </div>;

    return (
      <div>
        {this.props.hasDragDrop || this.props.hasMulti ? 
          <AssistiveText /> : null
        }
        <ul
          aria-label={this.props.ariaLabel}
          aria-multiselectable={this.props.hasMulti ? true : null}
          aria-describedby="instructions"
          className={classnames("slds-border_top", "slds-border_right", "slds-border_bottom", "slds-border_left",
            {
              "slds-list_horizontal": this.props.isHorizontal,
              "dnd-listbox": this.props.hasDragDrop,
              "dnd-listbox--dragging": this.state.inDragDropMode
            }
          )}
          onKeyDown={this.handleKeyDown}
          role="listbox"
        >
          {this.renderListboxOptions()}
        </ul>
      </div>
    );
  }
}

Listbox.propTypes = proptypes;

export default Listbox;
