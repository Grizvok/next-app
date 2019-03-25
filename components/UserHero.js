import React from 'react';
import UserAvatarCard from '../components/UserAvatarCard';
import { Subscribe } from 'unstated';

import UserContainer from '../Containers/UserContainer';

export default class UserHero extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.user);
    return (
      <Subscribe to={[UserContainer]}>
        {(usercontainer) => (
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
