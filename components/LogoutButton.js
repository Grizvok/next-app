import React from 'react';
import { Subscribe } from 'unstated';
import Link from 'next/link';

import { userStore } from '../Containers/UserContainer';

class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => (
          <Link href="javascript:void(0)">
            <a onClick={userstore.removeCurrentUser} className="dropdown-item">
              Logout
            </a>
          </Link>
        )}
      </Subscribe>
    );
  }
}

export default LogoutButton;
