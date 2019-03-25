import React from 'react';

export default (props) => {
  if (props.editDate && props.editDate !== 'Invalid date') {
    return (
      <span
        className="is-primary tooltip"
        data-tooltip={`last edited ${props.editDate} ago`}
      >
        {' '}
        *
      </span>
    );
  } else {
    return null;
  }
};
