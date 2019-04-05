import React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { BoldMark, ItalicMark } from './Marks';
import { Bold, Italic, List, Code, UnderLine } from './components';
import { ToolBar } from './CommentToolBar';
import { isKeyHotkey } from 'is-hotkey';
import { KeyUtils } from 'slate';

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
                text: '',
              },
            ],
          },
        ],
      },
    ],
  },
});

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

class RichCommentBox extends React.Component {
  constructor(props) {
    super(props);

    KeyUtils.resetGenerator();

    this.state = {
      value: initialValue,
    };
  }

  ref = (editor) => {
    this.editor = editor;
  };

  handleSubmit = (e) => {
    console.log(this.state.value);
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (e, editor, next) => {
    let mark;

    if (isBoldHotkey(e)) {
      mark = 'bold';
    } else if (isItalicHotkey(e)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(e)) {
      mark = 'underlined';
    } else if (isCodeHotkey(e)) {
      mark = 'code';
    } else {
      return next();
    }

    e.preventDefault();
    editor.toggleMark(mark);
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
    e.preventDefault();
    const change = this.editor.toggleMark(type);
  };

  render() {
    return (
      <div className="box is-paddingless">
        <Editor
          className="text-editor"
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          placeholder="Hello"
          renderMark={this.renderMark}
          ref={this.ref}
        />
        <ToolBar>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'bold')}
            className="tooltip-icon-button"
          >
            <Bold />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'underline')}
            className="tooltip-icon-button"
          >
            <UnderLine />
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
            onClick={this.handleSubmit}
            className="button is-link submit-comment-button"
          >
            Comment
          </button>
        </ToolBar>
      </div>
    );
  }
}

export default RichCommentBox;
