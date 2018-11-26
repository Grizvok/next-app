//npm packages
import React from 'react';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import Error from 'next/error';

//our packages
import Layout from '../components/MyLayout';
import UserNav from '../components/UserNav';
import UserHero from '../components/UserHero';

export default class UserPage extends React.Component {
  static async getInitialProps(context) {
    const res = await fetch(
      `http://localhost:3000/api/user/${context.query.id}`
    );

    const userTickets = await fetch(
      `http://localhost:3000/api/ticket/${context.query.id}`
    );
    const ticketJSON = await userTickets.json();
    const json = await res.json();
    const statusCode = res.status > 200 ? res.status : false

    return { statusCode, user: json.user, tickets: ticketJSON.tickets };
  }

  render() {
    if (this.props.statusCode) {
      return <Error statusCode={this.props.statusCode} />;
    }

    return (
      <Layout>
        <UserNav />
        <UserHero tickets={this.props.tickets} user={this.props.user} />
      </Layout>
    );
  }
}

UserPage.propTypes = { user: PropTypes.string };
