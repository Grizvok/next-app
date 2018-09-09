//npm packages
import React from 'react';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import Error from 'next/error';

//our packages
import Layout from '../components/MyLayout';
import UserNav from '../components/UserNav';

export default class UserPage extends React.Component {
  static async getInitialProps(context) {
    const res = await fetch(
      `http://localhost:3000/api/user/${context.query.id}`
    );
    const statusCode = res.status > 200 ? res.status : false;
    const json = await res.json();

    return { statusCode, user: json.user };
  }

  render() {
    if (this.props.statusCode) {
      return <Error statusCode={this.props.statusCode} />;
    }

    return (
      <Layout>
        <UserNav />
        <div>{this.props.user}</div>
      </Layout>
    );
  }
}

UserPage.propTypes = { user: PropTypes.string };
