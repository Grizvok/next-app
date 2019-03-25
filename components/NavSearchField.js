import React from 'react';

export default (props) => (
  <form
    method="GET"
    autoComplete="off"
    //onBlur={props.handleBlur}
    onFocus={props.handleFocus}
    onSubmit={props.handleSubmit}
  >
    <div className="search-field navbar-item field has-addons">
      <div className="control">
        <input
          className="input is-small search-input"
          value={props.searchTerm}
          onChange={props.handleChange}
          name="searchTerm"
          type="text"
          placeholder="Search"
          required
        />
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-small is-grey">
            <i className="fas fa-search" />
          </button>
        </div>
      </div>
    </div>
  </form>
);
