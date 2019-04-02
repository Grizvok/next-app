import Plain from 'slate-plain-serializer';
import { Editor } from 'slate-react';

import React from 'react';

/**
 * Deserialize the initial editor value.
 *
 * @type {Object}
 */

const initialValue = Plain.deserialize('');

/**
 * The plain text example.
 *
 * @type {Component}
 */

class PlainText extends React.Component {
  /**
   * Render the editor.
   *
   * @return {Component} component
   */

  render() {
    return (
      <Editor placeholder="How can you help?" defaultValue={initialValue} />
    );
  }
}

/**
 * Export.
 */

export default PlainText;
