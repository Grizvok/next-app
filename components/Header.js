import React from 'react';
import Link from 'next/link';
import LoginButtonControl  from './LoginButton';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('#' + burger.dataset.target);

    burger.classList.toggle('is-active');
    nav.classList.toggle('is-active');
  }

  render() {
    return (
      <nav className="navbar is-light is-info is-fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <Link prefetch href="/">
              <a className="navbar-item">
                Sci&nbsp;
                <i className="fas fa-flask" />
                &nbsp;Sport
              </a>
            </Link>
            <span
              onClick={this.handleClick}
              className="navbar-burger burger"
              data-target="navMenu"
            >
              <span />
              <span />
              <span />
            </span>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-end">
              <Link prefetch href="/shop">
                <a className="navbar-item">Shop</a>
              </Link>
              <Link prefetch href="/dashboard">
                <a className="navbar-item">Dashboard</a>
              </Link>
              <Link prefetch href="/register" as="/register">
                <a className="navbar-item">Register</a>
              </Link>
              <LoginButtonControl />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
