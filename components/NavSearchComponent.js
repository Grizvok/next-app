import React from 'react';
import fetch from 'isomorphic-unfetch';
import ReactDOM from 'react-dom';

import SearchDropDown from './SearchDropDown';
import NavSearchField from './NavSearchField';

export default class NavSearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.searchComponentRef = React.createRef();

    this.state = {
      searchTerm: '',
      userSearchResults: false,
      ticketSearchResults: false,
      isOpen: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickSearch = (e) => {
    this.setState({
      isOpen: false,
      userSearchResults: false,
      ticketSearchResults: false,
      searchTerm: '',
    });
  };

  handleClickOutside = (e) => {
    const domNode = this.searchComponentRef.current;
    if (!domNode || !domNode.contains(e.target)) {
      this.setState({
        isOpen: false,
      });
    }
  };

  handleFocus = (e) => {
    if (this.state.userSearchResults || this.state.ticketSearchResults) {
      this.setState({
        isOpen: true,
      });
    }
  };

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

    const res = await fetch(
      `http://localhost:3000/api/search?q=${this.state.searchTerm}`
    );

    const result = await res.json();

    if (res.status === 200) {
      this.setState({
        userSearchResults: result.userSearchData,
        ticketSearchResults: result.ticketSearchData,
        isOpen: true,
      });
    }
  };

  render() {
    if (this.state.isOpen) {
      return (
        <div
          ref={this.searchComponentRef}
          //onClick={this.handleClick}
          className="dropdown is-active is-fullwidth"
        >
          <NavSearchField
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            searchTerm={this.state.searchTerm}
            handleBlur={this.handleBlur}
            handleFocus={this.handleFocus}
          />
          <SearchDropDown
            userSearchResults={this.state.userSearchResults}
            ticketSearchResults={this.state.ticketSearchResults}
            isOpen={this.state.isOpen}
            handleClick={this.handleClickSearch}
          />
        </div>
      );
    } else {
      return (
        <div onBlur={this.handleBlur} className="dropdown is-fullwidth">
          <NavSearchField
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            searchTerm={this.state.searchTerm}
            handleBlur={this.handleBlur}
            handleFocus={this.handleFocus}
          />
          <SearchDropDown
            userSearchResults={this.state.userSearchResults}
            ticketSearchResults={this.state.ticketSearchResults}
            isOpen={this.state.isOpen}
            handleClick={this.handleClickSearch}
          />
        </div>
      );
    }
  }
}
