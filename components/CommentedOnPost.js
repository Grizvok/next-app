import React from 'react';
import Comment from './Comment';
import UserCommentSingle from './UserCommentSingle';

export default (props) => {
  return (
    <article className="media box commented-on-box">
      <div className="media-content">
        <div className="content">
          <p>{props.grouping.post.title}</p>
        </div>
        {props.grouping.comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        })}
      </div>
    </article>
  );
};
