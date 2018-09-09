import React from 'react';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import Layout from '../components/MyLayout';
import Error from 'next/error';

export default class UserPage extends React.Component {
  static async getInitialProps(context) {
    const res = await fetch(`http://localhost:3000/api/user/${context.query.id}`);
    const statusCode = res.status > 200 ? res.status: false;
    const json = await res.json();
    console.log(json);
    
    return {statusCode, user: json.user};
    
    //return {statusCode, user: json}
  }

  render() {
    if (this.props.statusCode) {
      return <Error statusCode={this.props.statusCode} />
    }

    return (
      <Layout>
        <div>{this.props.user}</div>
      </Layout>
    );
  }
}

UserPage.propTypes = { user: PropTypes.string };
