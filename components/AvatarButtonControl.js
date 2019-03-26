//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import Link from 'next/link';
import { withRouter } from 'next/router';

//our packages
import { userStore } from '../Containers/UserContainer';
import FollowedUsersContainer from '../Containers/FollowedUsersContainer';

const FollowButton = ({ router }) => (
  <Subscribe to={[FollowedUsersContainer, userStore]}>
    {(followcontainer, userstore) => {
      return (
        <a
          className="button is-fullwidth is-link"
          onClick={() =>
            followcontainer.handleAddFollowedUser(
              userstore.state.currentUser,
              router.query.id
            )
          }
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
