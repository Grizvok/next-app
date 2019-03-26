//npm packages
import React from 'react';
import classNames from 'classnames';
import { Subscribe } from 'unstated';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

import { userStore } from '../Containers/UserContainer';

export default class AddTicketForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketTitle: '',
      videoTitleError: '',
      ticketDescription: '',
      videoDescriptionError: '',
      ticketCategory: '',
      videoCategoryError: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (e, token) => {
    e.preventDefault();
    const payload = {
      ticketTitle: this.state.ticketTitle,
      ticketCategory: this.state.ticketCategory,
      ticketDescription: this.state.ticketDescription,
    };

    const res = await fetch('http://localhost:3000/api/ticket', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify(payload),
      headers: {
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzI1NiJ9.R3JpenZvaw.Z9DrrJKETt8i_nZh4Fme2P5snwvgfhzfHpqFqrH5k5g',
        'Content-Type': 'application/json',
      },
    });
    const resJSON = await res.json();
    console.log(resJSON);
    if (res.status === 200) {
      Router.push(`/ticket?id=${resJSON.ticket}`, `/ticket/${resJSON.ticket}`);
      return;
    }
  };

  handleChange(e) {
    const target = e.target;
    const value = e.target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  validate = () => {
    let isError = false;
    const errors = {
      videoTitleError: '',
      videoDescriptionError: '',
      videoCategoryError: '',
    };

    if (this.state.videoTitle.length < 9) {
      (isError = true),
        (errors.videoTitleError =
          'Your title must be at least 10 characters long');
    }
    if (this.state.videoTitle.length > 40) {
      (isError = true),
        (errors.videoTitleError =
          'Your title must be 40 or less characters long');
    }
    if (this.state.videoDescription.length < 99) {
      (isError = true),
        (errors.videoDescriptionError =
          'Your video description must be at least 100 characters long');
    }
    if (this.state.videoDescription.length > 700) {
      (isError = true),
        (errors.videoDescriptionError =
          'Your video description must be less than 700 characters long');
    }
    if (!this.state.videoCategory) {
      (isError = true),
        (errors.videoCategoryError =
          'You must select a swing category for your video');
    }
    this.setState({ ...errors });

    return isError;
  };

  render() {
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => {
          console.log(userstore.state.currentUser);
          return (
            <div
              align="center"
              className="column is-half container add-video-form"
            >
              <div className="box form-container">
                <form
                  method="POST"
                  onSubmit={(e) => {
                    const payload = {
                      ticketTitle: this.state.ticketTitle,
                      ticketCategory: this.state.ticketCategory,
                      ticketDescription: this.state.ticketDescription,
                    };
                    userstore.handleTicketCreation(e, payload);
                  }}
                >
                  <div className="field">
                    <label className="label">Ticket Title</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Your Title Here"
                        value={this.state.ticketTitle}
                        onChange={this.handleChange}
                        name="ticketTitle"
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="category-select" className="label">
                      Category
                    </label>
                    <div className="control" required>
                      <div className="select">
                        <select
                          id="category-select"
                          onChange={this.handleChange}
                          value={this.state.ticketCategory}
                          name="ticketCategory"
                          required
                        >
                          <option
                            value=""
                            disabled="disabled"
                            defaultValue="true"
                          >
                            Choose a category:
                          </option>
                          <option value="finance">Finance</option>
                          <option value="programming">Programming</option>
                          <option value="fitness">Fitness</option>
                          <option value="business">Business</option>
                          <option value="writing">Writing</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Ticket Description</label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        name="ticketDescription"
                        placeholder="Describe your ticket"
                        value={this.state.ticketDescription}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <p className="control">
                      <button className="button is-link">Add Ticket</button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Subscribe>
    );
  }
}
