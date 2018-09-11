//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import Router from 'next/router';

//our packages
import UserContainer from '../Containers/UserContainer';

class DashHero extends React.Component {
  render() {
    if (!UserContainer.state.currentUser) {
      Router.push('/register');
    }
    return (
      <Subscribe to={[UserContainer]}>
        {(usercontainer) => (
          <section className="hero is-dark is-fullheight has-background-grey-light homehero">
            <div className="hero-head" />
            <div className="container has-text-centered is-fluid">
              <h1 className="title has-text-danger is-size-1">
                Welcome to your dashboard {usercontainer.state.currentUser}
              </h1>
              <p>
                <i className="fas fa-angle-double-down has-text-info fa-2x" />
              </p>
              <h2 className="is-size-4 has-text-danger subtitle">
                <br />A platform for systematic sport improvement
              </h2>
            </div>
            <div className="hero-body" />
          </section>
        )}
      </Subscribe>
    );
  }
}
export default DashHero;
