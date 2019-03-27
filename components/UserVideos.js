//npm packages
import React from 'react';
import Link from 'next/link';
import { Subscribe } from 'unstated';
import fetch from 'isomorphic-unfetch';

//our packages
import { userStore } from '../Containers/UserContainer';
import TicketItem from '../components/TicketItem';

class UserVideos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      tickets: [],
    };
  }

  render() {
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => (
          <div className="column videocontainer is-three-fifths">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title is-centered">Overview</p>
                <a
                  href="#"
                  className="card-header-icon"
                  aria-label="more options"
                />
              </header>
              <TicketItem tickets={this.props.tickets} user={this.props.user} />
              <footer className="card-footer" />
            </div>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default UserVideos;

//TODO(thunka) Fix link coloring in light hero reference: https://github.com/jgthms/bulma/issues/1646
