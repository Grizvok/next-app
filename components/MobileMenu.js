import React from 'react';

import NavBarDropDown from './NavBarDropDown';
import NavBarEnd from './NavBarEnd';

export default class MobileMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isOpen) {
      return (
        <div id="navbarBasicExample" className="is-active navbar-menu">
          <NavBarDropDown />
          <NavBarEnd />
        </div>
      );
    } else {
      return (
        <div id="navbarBasicExample" className="navbar-menu">
          <NavBarDropDown />
          <NavBarEnd />
        </div>
      );
    }
  }
}
