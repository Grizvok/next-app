//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
//our packages
import AvatarButtonControl from './AvatarButtonControl';
import UserVideos from './UserVideos';

const AvatarCard = (props) => (
  <div className="column avatar-box is-2">
    <div className="box ">
      <div className="content">
        <AvatarButtonControl user={props.user} />
      </div>
    </div>
  </div>
);

export default AvatarCard;
