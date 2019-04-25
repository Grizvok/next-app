import React from 'react';
import Link from 'next/link';

export default (props) => {
  const { user } = props;

  return props.activeTab === '/user/skills' ? (
    <li className="is-active">
      <Link
        prefetch
        as={`/user/${user}/skills`}
        href={`/user/skills?id=${user}`}
      >
        <a>
          <span>Skills</span>
        </a>
      </Link>
    </li>
  ) : (
    <li>
      <Link
        prefetch
        as={`/user/${user}/skills`}
        href={`/user/skills?id=${user}`}
      >
        <a>
          <span>Skills</span>
        </a>
      </Link>
    </li>
  );
};
