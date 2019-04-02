//npm packages
import React from 'react';
import Link from 'next/link';

//our packages
import MobileMenu from './MobileMenu';
import BurgerIcon from './BurgerIcon';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <nav className="navbar is-light is-fixed-top">
        <div className="navbar-brand">
          <Link prefetch href="/">
            <a className="navbar-item">LedgeTrade</a>
          </Link>
          <BurgerIcon
            handleClick={this.handleClick}
            isOpen={this.state.isOpen}
          />
        </div>
        <MobileMenu isOpen={this.state.isOpen} />
      </nav>
    );
  }
}

export default Header;
