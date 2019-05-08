import React from 'react';
import CommentedOnPost from './CommentedOnPost';

export default class UserComments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupings: [],
    };

    const { comments } = this.props;

    const posts = Object.entries(comments);

    for (const [post, comment] of posts) {
      const grouping = {};
      grouping.comments = [];
      const postTitle = comment[0].ticket_title;
      const postCreator = comment[0].ticket_creator;
      grouping.post = { title: postTitle, postCreator: postCreator };

      comment.map((val) => {
        grouping.comments.push(val);
      });

      this.state.groupings.push(grouping);
    }
  }

  render() {
    return this.state.groupings.map((grouping, index) => {
      return (
        <CommentedOnPost
          user={this.props.user}
          key={index}
          grouping={grouping}
        />
      );
    });
  }
}
