import React from 'react';
import UserAvatarCard from '../components/UserAvatarCard';
import { Subscribe } from 'unstated';

import { userStore } from '../Containers/UserContainer';

export default class UserHero extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => (
          <section className="hero is-light is-bold is-fullheight">
            <div className="hero-head">
              <div className="container">
                <UserAvatarCard
                  tickets={this.props.tickets}
                  user={this.props.user}
                />
              </div>
            </div>
          </section>
        )}
      </Subscribe>
    );
  }
}
