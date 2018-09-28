//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
//our packages
import UserContainer from '../Containers/UserContainer';
import ModalContainer from '../Containers/ModalContainer';
const FollowButton = () => (
  <a className="button is-fullwidth is-link">Follow</a>
);

const NewVideoButton = () => (
  <Subscribe to={[ModalContainer]}>
    {(modalcontainer) => (
      <a onClick={modalcontainer.showAddVideoModal} className="button is-fullwidth is-link">Add new video</a>
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