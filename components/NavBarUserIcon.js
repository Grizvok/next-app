import React from 'react';
import { Subscribe } from 'unstated';

import UserContainer from '../Containers/UserContainer';
import LogoutButton from './LogoutButton';

export default class NavBarUserIcon extends React.Component {
  render() {
    return (
      <Subscribe to={[UserContainer]}>
        {(usercontainer) => {
          if (usercontainer.state.currentUser) {
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
                    <div className="dropdown-item">
                      <p>
                        You can insert <strong>any type of content</strong>{' '}
                        within the dropdown menu.
                      </p>
                    </div>
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
