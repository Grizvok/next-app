import React from 'react';

export default (props) =>
  props.comments.map((comment, index) => {
    return (
      <article className="media user-comment" key={comment.id}>
        <div className="media-content">
          <div className="content">
            <p className="commenter-username">{comment.sci_user}</p>
            <p className="comment-text">{comment.comment}</p>
          </div>
        </div>
      </article>
    );
  });
