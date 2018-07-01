import Link from "next/link";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('#'+burger.dataset.target);

    burger.classList.toggle('is-active');
    nav.classList.toggle('is-active');
  }

  render() {
    return (
      <nav class="navbar is-fixed-top is-info">
        <div class="container">
          <div class="navbar-brand">
            <Link prefetch href="/">
            <a class="navbar-item">
              Sci&nbsp;<i class="fas fa-flask" />&nbsp;Sport
            </a>
            </Link>
            <span onClick={this.handleClick} class="navbar-burger burger" data-target="navMenu">
              <span />
              <span />
              <span />
            </span>
          </div>
          <div id="navMenu" class="navbar-menu">
            <div class="navbar-end">
              <Link prefetch href="/register">
              <a class="navbar-item">
                Register
              </a>
              </Link>
              <Link prefetch href="/login">
              <a class="navbar-item">
                Login
              </a>
              </Link>
              <Link prefetch href="/shop">
              <a class="navbar-item">
                Shop
              </a>
              </Link>
              <Link prefetch href="/dashboard">
              <a class="navbar-item">
                Dashboard
              </a>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
