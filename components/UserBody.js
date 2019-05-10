//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
//our packages
import UserVideos from '../components/UserVideos';
import AvatarCard from './AvatarCard';

const UserBody = (props) => {
  return (
    <div className="columns ticket-page-columns">
      <UserVideos user={props.user} tickets={props.tickets} />
      <AvatarCard user={props.user} />
    </div>
  );
};

export default UserBody;
