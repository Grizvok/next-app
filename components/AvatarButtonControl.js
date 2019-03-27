//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import Link from 'next/link';
import { withRouter } from 'next/router';

//our packages
import { userStore } from '../Containers/UserContainer';

const FollowButton = ({ router }) => (
  <Subscribe to={[userStore]}>
    {(userstore) => {
      return (
        <a
          className="button is-fullwidth is-link"
          onClick={() => console.log('clicked')}
        >
          Follow
        </a>
      );
    }}
  </Subscribe>
);

const FollowButtonWithRouter = withRouter(FollowButton);

const NewVideoButton = () => (
  <Link href="/submit">
    <a className="button is-fullwidth is-link">Add new video</a>
  </Link>
);

const AvatarButtonControl = (props) => (
  <Subscribe to={[userStore]}>
    {(userstore) => {
      if (userstore.state.currentUser === props.user) {
        return <NewVideoButton />;
      }
      return <FollowButtonWithRouter />;
    }}
  </Subscribe>
);

export default AvatarButtonControl;
