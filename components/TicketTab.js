import React from 'react';
import Link from 'next/link';

export default (props) => {
  const { user } = props;
  return props.activeTab === '/user/tickets' ? (
    <li className="is-active">
      <Link
        prefetch
        as={`/user/${user}/tickets`}
        href={`/user/tickets?id=${user}`}
      >
        <a>
          <span>Tickets</span>
        </a>
      </Link>
    </li>
  ) : (
    <li>
      <Link
        prefetch
        as={`/user/${user}/tickets`}
        href={`/user/tickets?id=${user}`}
      >
        <a>
          <span>Tickets</span>
        </a>
      </Link>
    </li>
  );
};
