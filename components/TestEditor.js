import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { Toolbar } from './components';
import { Bold } from './components';
import { Italic } from './components';
import { List } from './components';
import { Code } from './components';
import { UnderLine } from './components';
import { BoldMark, ItalicMark } from './Marks';

// Create our initial value...
const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'My first paragraph!',
              },
            ],
          },
        ],
      },
    ],
  },
});

export default class TestEditor extends React.Component {
  state = {
    value: initialValue,
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (e, change) => {
    /*
			we want all our commands to start with the user pressing ctrl,
			if they don't--we cancel the action.
		*/

    if (!e.ctrlKey) {
      return;
    }

    e.preventDefault();

    /* Decide what to do based on the key code... */
    switch (e.key) {
      /* When "b" is pressed, add a "bold" mark to the text. */
      case 'b': {
        change.toggleMark('bold');
        return true;
      }
      case 'i': {
        change.toggleMark('italic');
        return true;
      }

      case 'c': {
        change.toggleMark('code');
        return true;
      }

      case 'l': {
        change.toggleMark('list');
        return true;
      }

      case 'u': {
        change.toggleMark('underline');
        return true;
      }
      default: {
        return;
      }
    }
  };

  renderMark = (props) => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />;

      case 'italic':
        return <ItalicMark {...props} />;

      case 'code':
        return <code {...props.attributes}>{props.children}</code>;

      case 'list':
        return (
          <ul {...props.attributes}>
            <li>{props.children}</li>
          </ul>
        );

      case 'underline':
        return <u {...props.attributes}>{props.children}</u>;

      default: {
        return;
      }
    }
  };

  onMarkClick = (e, type) => {
    /* disabling browser default behavior like page refresh, etc */
    e.preventDefault();

    /* grabbing the this.state.value */
    const { value } = this.state;

    /*
			applying the formatting on the selected text
			which the desired formatting
		*/
    const change = value.change().toggleMark(type);

    /* calling the  onChange method we declared */
    this.onChange(change);
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'bold')}
            className="tooltip-icon-button"
          >
            <Bold />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'italic')}
            className="tooltip-icon-button"
          >
            <Italic />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'code')}
            className="tooltip-icon-button"
          >
            <Code />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'list')}
            className="tooltip-icon-button"
          >
            <List />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'underline')}
            className="tooltip-icon-button"
          >
            <UnderLine />
          </button>
        </Toolbar>
        <Editor
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
        />
      </React.Fragment>
    );
  }
}
