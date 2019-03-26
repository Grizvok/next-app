import React from 'react';
import { Subscribe } from 'unstated';
import Link from 'next/link';

import { userStore } from '../Containers/UserContainer';
import LogoutButton from './LogoutButton';

export default class NavBarUserIcon extends React.Component {
  render() {
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => {
          if (userstore.state.currentUser) {
            return (
              <div className="dropdown is-right is-hoverable">
                <div className="dropdown-trigger">
                  <button
                    className="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu2"
                  >
                    <span>
                      <i className="navbar-user-icon far fa-user-circle" />
                    </span>
                    <span className="icon is-small">
                      <i className="fas fa-angle-down" aria-hidden="true" />
                    </span>
                  </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu2" role="menu">
                  <div className="dropdown-content">
                    <Link
                      prefetch
                      as={`/user/${userstore.state.currentUser}`}
                      href={`/user?id=${userstore.state.currentUser}`}
                    >
                      <a className="dropdown-item">Dashboard</a>
                    </Link>

                    <hr className="dropdown-divider" />
                    <div className="dropdown-item">
                      <p>
                        You simply need to use a <code>&lt;div&gt;</code>{' '}
                        instead.
                      </p>
                    </div>
                    <hr className="dropdown-divider" />
                    <LogoutButton />
                  </div>
                </div>
              </div>
            );
          }
          return null;
        }}
      </Subscribe>
    );
  }
}
