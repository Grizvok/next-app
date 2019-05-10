import React from 'react';
import AvatarCard from '../../components/AvatarCard';
import Layout from '../../components/MyLayout';
import UserNav from '../../components/UserNav';
import groupBy from '../../helpers/groupBy';
import UserActivity from '../../components/UserActivity';

export default class UserPage extends React.Component {
  static async getInitialProps(context) {
    const userTickets = await fetch(
      `http://localhost:3000/api/ticket/${context.query.id}`
    ).then((r) => r.json());

    const comments = await fetch(
      `http://localhost:3000/api/comment/user/${context.query.id}`
    ).then((r) => r.json());

    const groupedComments = groupBy(comments.comments, 'ticket_id_fkey');

    return { user: context.query.id, userTickets, groupedComments };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <UserNav user={this.props.user} />
        <section className="hero is-bold is-light is-fullheight">
          <div className="hero-head">
            <div className="columns user-overview-columns">
              <div className="column is-9">
                <UserActivity />
              </div>
              <AvatarCard user={this.props.user} />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
