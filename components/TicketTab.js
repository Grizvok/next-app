import React from 'react';
import Link from 'next/link';

export default (props) => {
  const { user } = props;
  return props.activeTab === '/user' ? (
    <li className="is-active">
      <Link prefetch as={`/user/${user}`} href={`/user?id=${user}`}>
        <a>
          <span>Tickets</span>
        </a>
      </Link>
    </li>
  ) : (
    <li>
      <Link prefetch as={`/user/${user}`} href={`/user?id=${user}`}>
        <a>
          <span>Tickets</span>
        </a>
      </Link>
    </li>
  );
};
