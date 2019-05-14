import React from 'react';
import Layout from '../../components/MyLayout';
import UserNav from '../../components/UserNav';
import UserComments from '../../components/UserComments';
import AvatarCard from '../../components/AvatarCard';
import moment from 'moment';
import CommentedOnPost from '../../components/CommentedOnPost';
import _ from 'lodash';

export default class CommentPage extends React.Component {
  static async getInitialProps(context) {
    const comments = await fetch(
      `http://localhost:3000/api/comment/user/${context.query.id}`
    ).then((r) => r.json());

    const groupedComments = groupBy(comments.comments, 'ticket_id_fkey');

    const sortedComments = sortComments(groupedComments);

    const orderedComments = _.orderBy(sortedComments, 'lastActivity', 'desc');

    return { orderedComments, user: context.query.id };
  }

  render() {
    return (
      <Layout>
        <UserNav user={this.props.user} />
        <section className="hero is-bold is-light is-fullheight">
          <div className="hero-head">
            <div className="columns comment-page-columns">
              <div className="column is-9">
                {this.props.orderedComments.map((item) => {
                  return (
                    <CommentedOnPost
                      user={this.props.user}
                      ticketID={item.comments[0].ticket_id_fkey}
                      comments={item.comments}
                      postCreator={item.post.postCreator}
                      postTitle={item.post.title}
                    />
                  );
                })}
              </div>
              <AvatarCard user={this.props.user} />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

const sortComments = (comments) => {
  const state = [];
  const posts = Object.entries(comments);

  for (const [post, comment] of posts) {
    const grouping = {};
    grouping.comments = [];
    const postTitle = comment[0].ticket_title;
    const postCreator = comment[0].ticket_creator;

    grouping.post = { title: postTitle, postCreator: postCreator };

    let lastActivity = moment(comment[0].comment_creation_date).format();

    comment.map((val) => {
      if (moment(val.comment_creation_date).isAfter(lastActivity)) {
        grouping.lastActivity = moment(val.comment_creation_date).format();
      }
      grouping.comments.push(val);
    });
    state.push(grouping);
  }
  return state;
};

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
