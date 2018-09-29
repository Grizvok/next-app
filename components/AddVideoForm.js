//npm packages
import React from 'react';
import classNames from 'classnames';
import { Subscribe } from 'unstated';
import Link from 'next/link';

export default class AddVideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoURL: '',
      videoURLError: '',
      videoTitle: '',
      videoTitleError: '',
      videoDescription: '',
      videoDescriptionError: '',
      videoCategory: '',
      videoCategoryError: '',
      videoDate: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const vidoeURL = this.state.videoURL;
  };

  handleChange(e) {
    const target = e.target;
    console.log(target);
    const value = e.target.value;

    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  validate = () => {
    let isError = false;
    const errors = {
      videoURLError: '',
      videoTitleError: '',
      videoDescriptionError: '',
      videoCategoryError: '',
    };

    if (this.state.videoTitle.length < 5) {
      (isError = true),
        (errors.videoTitleError =
          'Your title must be at least 6 characters long');
    }
    if (this.state.videoTitle.length > 30) {
      (isError = true),
        (errors.videoTitleError =
          'Your title must be less than 30 characters long');
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
      <div align="center" className="column is-half container add-video-form">
        <div className="box form-container">
          <form method="POST" onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Video URL</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Your Video URL here"
                  name="videoURL"
                  onChange={this.handleChange}
                  value={this.state.videoURL}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Video Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Your Title Here"
                  value={this.state.videoTitle}
                  onChange={this.handleChange}
                  name="video-title"
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
                    value={this.state.videoCategory}
                  >
                    <option>Full Swing (iron)</option>
                    <option>Full Swing (driver)</option>
                    <option>Full Swing (wood)</option>
                    <option>Pitching</option>
                    <option>Chipping</option>
                    <option>Putting</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Video Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Textarea"
                  value={this.state.videoDescription}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input type="checkbox" />I agree to the{' '}
                  <Link href="/terms">
                    <a>terms and conditions</a>
                  </Link>
                </label>
              </div>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-link">Add Video</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
