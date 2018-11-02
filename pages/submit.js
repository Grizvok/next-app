//npm packages
import React from 'react';

//our packages
import Layout from '../components/MyLayout.js';
import AddTicketForm from '../components/AddTicketForm';

export default class Submit extends React.Component {
  render() {
    return (
      <Layout>
        <AddTicketForm />
      </Layout>
    );
  }
}