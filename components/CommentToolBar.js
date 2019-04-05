import React from 'react';
import { Subscribe } from 'unstated';
import { userStore } from '../Containers/UserContainer';

export const ToolBar = (props) => (
  <Subscribe to={[userStore]}>
    {(userstore) => {
      return (
        <>
          <div className="comment-toolbar has-background-grey-lighter">
            {props.children}
          </div>
        </>
      );
    }}
  </Subscribe>
);
