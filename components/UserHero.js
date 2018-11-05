import React from 'react';
import UserAvatarCard from '../components/UserAvatarCard';

export default class UserHero extends React.Component {
  render() {
    return (
      <section className="hero is-light is-bold is-fullheight">
        <div className="hero-head">
          <div className="container">
            <UserAvatarCard tickets={this.props.tickets} user={this.props.user}/>
          </div>
        </div>
      </section>
    );
  }
}
