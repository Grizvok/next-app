import React from 'react';
import Layout from '../../components/MyLayout';
import UserNav from '../../components/UserNav';
import UserComments from '../../components/UserComments';

export default class CommentPage extends React.Component {
  static async getInitialProps(context) {
    const comments = await fetch(
      `http://localhost:3000/api/comment/user/${context.query.id}`
    ).then((r) => r.json());
    return { comments, user: context.query.id };
  }

  render() {
    return (
      <Layout>
        <UserNav user={this.props.user} />
        <UserComments comments={this.props.comments.comments} />
      </Layout>
    );
  }
}
