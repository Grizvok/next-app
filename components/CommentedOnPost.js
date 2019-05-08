import React from 'react';
import Comment from './Comment';
import Link from 'next/link';

export default (props) => {
  return (
    <article className="media">
      <div className="media-content">
        <article className="box commented-on-box">
          <div className="content commented-post-content">
            <p>
              <Link as={`/user/${props.user}`} href={`/user?id=${props.user}`}>
                <a className="user-commenter-link">{props.user}</a>
              </Link>{' '}
              commented on {props.grouping.post.title} posted by{' '}
              {props.grouping.post.postCreator}
            </p>
          </div>
        </article>
        {props.grouping.comments.map((comment) => {
          return (
            <Comment user={props.user} key={comment.id} comment={comment} />
          );
        })}
      </div>
    </article>
  );
};
