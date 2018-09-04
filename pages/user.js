import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Layout from '../components/MyLayout';

export default class UserPage extends React.Component {
  static async getInitialProps(context) {
    try {
    const { data }  = await axios.get(
      `http://localhost:3000/api/user/${context.query.id}`
    );
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
    const statusCode = data.statusCode > 200 ? data.statusCode : false;
    return { data, Error };
  }

  render() {
    return (
      <Layout>
        <div>{this.props.data}</div>
      </Layout>
    );
  }
}

UserPage.propTypes = { user: PropTypes.string };
