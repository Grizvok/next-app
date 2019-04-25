import React from 'react';
import Layout from '../../components/MyLayout';
import UserNav from '../../components/UserNav';

export default class SkillPage extends React.Component {
  static async getInitialProps(context) {
    return { user: context.query.id };
  }

  render() {
    return (
      <Layout>
        <UserNav user={this.props.user} />
      </Layout>
    );
  }
}
