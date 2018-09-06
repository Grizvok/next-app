import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Layout from '../components/MyLayout';
import Error from 'next/error';

export default class UserPage extends React.Component {
  static async getInitialProps(context) {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/user/${context.query.id}`
      );
      return { data };
    } catch (error) {
      console.log(error.res);
      return error.res;
    }
  }

  render() {
    console.log(this.props.status);
    return (
      <Layout>
        <div>{this.props.error}</div>
      </Layout>
    );
  }
}

UserPage.propTypes = { user: PropTypes.string };
