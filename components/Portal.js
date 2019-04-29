import React from 'react';
import ReactDOM from 'react-dom';

export default class Portal extends React.Component {
  componentDidMount() {
    this.element = document.querySelector(this.props.selector);
    this.forceUpdate();
  }

  render() {
    console.log('rendered in the portal!');
    if (this.element === undefined) {
      return null;
    }

    return ReactDOM.createPortal(this.props.children, this.element);
  }
}
