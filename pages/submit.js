//npm packages
import React from 'react';

//our packages
import Layout from '../components/MyLayout.js';
import AddVideoForm from '../components/AddVideoForm';

export default class Submit extends React.Component {
  render() {
    return (
      <Layout>
        <AddVideoForm />
      </Layout>
    );
  }
}