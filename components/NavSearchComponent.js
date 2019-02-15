import React from 'react';

export default class NavSearchComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      userSearchResults: [],
      ticketSearchResults: [],
      isActive: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const target = e.target;
    const value = e.target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const results = await fetch(
      `http://localhost:3000/api/search?q=${this.state.searchTerm}`
    ).then((r) => r.json());

    this.setState({
      userSearchResults: results.userSearchData,
      ticketSearchResults: results.ticketSearchData,
    });
  };

  render() {
    return (
      <div className="dropdown is-fullwidth is-active">
        <form method="GET" autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="search-field navbar-item field has-addons">
            <div className="control">
              <input
                className="input is-small search-input"
                value={this.state.searchTerm}
                onChange={this.handleChange}
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
        <SearchDropDown
          searchResults={this.state.searchResults}
          isOpen={this.state.isOpen}
        />
      </div>
    );
  }
}
