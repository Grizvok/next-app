import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class UserPage extends React.Component {
  static async getInitialProps({ query }) {
    return { user: query.id };
  }
  render() {
    return <div>{this.props.user}</div>;
  }
}

UserPage.propTypes = { user: PropTypes.string };
