import React from 'react';
import moment from 'moment';
import UserCommentSingle from './UserCommentSingle';

export default class UserComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };
  }

  render() {
    const currentDate = moment();

    return this.props.comments.map((comment, index) => {
      return (
        <UserCommentSingle
          key={comment.id}
          comment={comment}
          currentDate={currentDate}
        />
      );
    });
  }
}
