import React from 'react';

export default class BurgerIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isOpen) {
      return (
        <span
          onClick={this.props.handleClick}
          className="is-active navbar-burger burger"
          data-target="navbarBasicExample"
        >
          <span />
          <span />
          <span />
        </span>
      );
    } else {
      return (
        <span
          onClick={this.props.handleClick}
          className="navbar-burger burger"
          data-target="navbarBasicExample"
        >
          <span />
          <span />
          <span />
        </span>
      );
    }
  }
}
