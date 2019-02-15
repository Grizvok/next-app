import React from 'react';
import Link from 'next/link';

import NavSearchField from './NavSearchField';

export default class NavBarDropDown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="navbar-start">
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">More</a>
          <div className="navbar-dropdown">
            <Link prefetch href="/trainers">
              <a className="navbar-item">Trainers</a>
            </Link>
            <Link prefetch href="/dashboard">
              <a className="navbar-item">Dashboard</a>
            </Link>
            <Link prefetch href="/register" as="/register">
              <a className="navbar-item">Register</a>
            </Link>
            <hr className="navbar-divider" />
            <a className="navbar-item">Report an issue</a>
          </div>
        </div>
        <NavSearchField />
      </div>
    );
  }
}
