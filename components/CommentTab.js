import React from 'react';
import Link from 'next/link';

export default (props) => {
  const { user } = props;
  return props.activeTab === '/user/comments' ? (
    <li className="is-active">
      <Link
        prefetch
        as={`/user/${user}/comments`}
        href={`/user/comments?id=${user}`}
      >
        <a>
          <span>Comments</span>
        </a>
      </Link>
    </li>
  ) : (
    <li>
      <Link
        prefetch
        as={`/user/${user}/comments`}
        href={`/user/comments?id=${user}`}
      >
        <a>
          <span>Comments</span>
        </a>
      </Link>
    </li>
  );
};
