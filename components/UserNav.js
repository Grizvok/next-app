import React from "react";
import Link from "next/link";

class UserNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <div className="tabs has-background-white is-centered is-boxed">
        <ul>
          <li className="is-active">
            <Link prefetch href="">
              <a>
                <span className="icon is-small">
                  <i className="fas fa-book-open" aria-hidden="true" />
                </span>
                <span>Overview</span>
              </a>
            </Link>
          </li>
          <li>
            <Link>
              <a>
                <span className="icon is-small">
                  <i className="fas fa-receipt" aria-hidden="true" />
                </span>
                <span>Tickets</span>
              </a>
            </Link>
          </li>
          <li>
            <Link>
              <a>
                <span className="icon is-small">
                  <i className="fas fa-film" aria-hidden="true" />
                </span>
                <span>Skills</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default UserNav;
