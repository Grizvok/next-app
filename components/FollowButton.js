import { withRouter } from 'next/router';
import { userStore } from '../Containers/UserContainer';
import React from 'react';
import { Subscribe } from 'unstated';

const FollowButton = ({ router }) => (
  <Subscribe to={[userStore]}>
    {(userstore) => {
      return (
        <a
          className="button is-fullwidth is-link"
          onClick={() =>
            userstore.handleAddFollowedUser(
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

export default FollowButtonWithRouter;
