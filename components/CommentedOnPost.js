import React from 'react';
import Comment from './Comment';
import Link from 'next/link';

export default ({ user, ticketID, comments, postCreator, postTitle }) => {
  return (
    <article className="media post-comment-block">
      <div className="media-content">
        <Link as={`/ticket/${ticketID}`} href={`/ticket?id=${ticketID}`}>
          <article className="box commented-on-box">
            <div className="content">
              <p className="comment-text">
                <Link as={`/user/${user}`} href={`/user?id=${user}`}>
                  <a className="user-commenter-link">{user}</a>
                </Link>{' '}
                commented on {postTitle} posted by{' '}
                <Link
                  as={`/user/${postCreator}`}
                  href={`/user?id=${postCreator}`}
                >
                  <a className="comment-creator">{postCreator}</a>
                </Link>
              </p>
            </div>
          </article>
        </Link>
        {comments.map((comment) => {
          return <Comment user={user} key={comment.id} comment={comment} />;
        })}
      </div>
    </article>
  );
};
