//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
//our packages
import AvatarButtonControl from './AvatarButtonControl';
import UserContainer from '../Containers/UserContainer';
import UserVideos from "../components/UserVideos";

const AvatarCard = (props) => {
  return (
    <Subscribe to={[UserContainer]}>
      {(usercontainer) => (
        <div className="columns">
        <UserVideos user={props.user} tickets={props.tickets} />
          <div className="column avatarcard is-one-quarter">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title is-centered">{props.user}</p>
                <a
                  href="#"
                  className="card-header-icon"
                  aria-label="more options"
                />
              </header>
              <div className="card-content">
                <div className="content">
                  <AvatarButtonControl user={props.user}/>
                </div>
              </div>
              <footer className="card-footer" />
            </div>
          </div>
        </div>
      )}
    </Subscribe>
  );
};

export default AvatarCard;
