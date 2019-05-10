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
          <div className="column is-9 user-video-column">
            <article className="media">
              <div className="media-content">
                <TicketItem
                  tickets={this.props.tickets}
                  user={this.props.user}
                />
              </div>
            </article>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default UserVideos;

//TODO(thunka) Fix link coloring in light hero reference: https://github.com/jgthms/bulma/issues/1646
