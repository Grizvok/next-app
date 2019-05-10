import React from 'react';
import Comment from './Comment';
import Link from 'next/link';

export default (props) => {
  return (
    <article className="media">
      <div className="media-content">
        <Link
          as={`/ticket/${props.grouping.comments[0].ticket_id_fkey}`}
          href={`/ticket?id=${props.grouping.comments[0].ticket_id_fkey}`}
        >
          <article className="box commented-on-box">
            <div className="content">
              <p className="comment-text">
                <Link
                  as={`/user/${props.user}`}
                  href={`/user?id=${props.user}`}
                >
                  <a className="user-commenter-link">{props.user}</a>
                </Link>{' '}
                commented on {props.grouping.post.title} posted by{' '}
                <Link
                  as={`/user/${props.grouping.post.postCreator}`}
                  href={`/user?id=${props.grouping.post.postCreator}`}
                >
                  <a className="comment-creator">
                    {props.grouping.post.postCreator}
                  </a>
                </Link>
              </p>
            </div>
          </article>
        </Link>
        {props.grouping.comments.map((comment) => {
          return (
            <Comment user={props.user} key={comment.id} comment={comment} />
          );
        })}
      </div>
    </article>
  );
};
