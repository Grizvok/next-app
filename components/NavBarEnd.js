import React from 'react';
import Link from 'next/link';

import LoginButtonControl from './LoginButton';
import RegisterButtonControl from './RegisterButton';
import NavBarUserIcon from './NavBarUserIcon';

export default class NavBarEnd extends React.Component {
  render() {
    return (
      <div id="navMenu" className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <LoginButtonControl />
              <RegisterButtonControl />
              <NavBarUserIcon />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
