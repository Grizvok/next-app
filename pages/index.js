import React from 'react';
import Layout from '../components/MyLayout.js';
import HomeHero from '../components/HomeHero';
import UserContainer from '../Containers/UserContainer';

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <HomeHero />
      </Layout>
    );
  }
}
