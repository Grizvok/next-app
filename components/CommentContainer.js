import React from 'react';
import CommentSortButton from './CommentSortButton';
import UserComment from './UserComment';

export default class CommentContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <CommentSortButton />
        {this.props.comments.length > 0 ? (
          <UserComment comments={this.props.comments} />
        ) : (
          <div className="no-comment-div has-text-centered">
            <i className="fas fa-comments" />
            <div>No comments yet!</div>
          </div>
        )}
      </>
    );
  }
}
