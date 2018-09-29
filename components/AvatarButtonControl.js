//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import Link from 'next/link';

//our packages
import UserContainer from '../Containers/UserContainer';
import ModalContainer from '../Containers/ModalContainer';
const FollowButton = () => (
  <a className="button is-fullwidth is-link">Follow</a>
);

const NewVideoButton = () => (
  <Subscribe to={[ModalContainer]}>
    {(modalcontainer) => (
      <Link href="/submit"><a className="button is-fullwidth is-link">Add new video</a></Link>
    )}
  </Subscribe>
);

const AvatarButtonControl = (props) => (
  <Subscribe to={[UserContainer]}>
    {(usercontainer) => {
      if (usercontainer.state.currentUser === props.user) {
        return <NewVideoButton />;
      }
      return <FollowButton />;
    }}
  </Subscribe>
);

export default AvatarButtonControl;
