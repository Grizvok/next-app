import React from 'react';
import Link from 'next/link';

class UserSearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.userSearchResults) {
      return null;
    } else {
      return this.props.userSearchResults.map((ticket, index) => {
        return (
          <Link as={`/user/${ticket}`} href={`/user?id=${ticket}`} key={index}>
            <a onClick={this.props.handleClick} className="dropdown-item">
              {ticket}
            </a>
          </Link>
        );
      });
    }
  }
}

export default UserSearchResults;
