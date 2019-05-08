import React from 'react';
import Layout from '../../components/MyLayout';
import UserNav from '../../components/UserNav';
import UserComments from '../../components/UserComments';

export default class CommentPage extends React.Component {
  static async getInitialProps(context) {
    const comments = await fetch(
      `http://localhost:3000/api/comment/user/${context.query.id}`
    ).then((r) => r.json());

    const groupedComments = groupBy(comments.comments, 'ticket_id_fkey');

    return { groupedComments, user: context.query.id };
  }

  render() {
    return (
      <Layout>
        <UserNav user={this.props.user} />
        <section className="hero is-bold is-light is-fullheight">
          <div className="hero-head">
            <div className="columns">
              <div className="column is-9">
                <UserComments
                  user={this.props.user}
                  comments={this.props.groupedComments}
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};
