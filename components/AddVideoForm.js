import React from "react";
import classNames from "classnames";
import { Subscribe } from "unstated";

import ModalContainer from "../Containers/ModalContainer";

export default class AddVideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
      videoURL: "",
      videoURLError: "",
      videoTitle: "",
      videoTitleError: "",
      videoDescription: "",
      videoDescriptionError: "",
      videoCategory: "",
      videoCategoryError: "",
      videoDate: ""
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = e.target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  validate = () => {
    let isError = false;
    const errors = {
      videoURLError: "",
      videoTitleError: "",
      videoDescriptionError: "",
      videoCategoryError: ""
    };

    if (this.state.videoTitle.length < 5) {
      (isError = true),
        (errors.videoTitleError =
          "Your title must be at least 6 characters long");
    }
    if (this.state.videoTitle.length > 30) {
      (isError = true),
        (errors.videoTitleError =
          "Your title must be less than 30 characters long");
    }
    if (this.state.videoDescription.length < 99) {
      (isError = true),
        (errors.videoDescriptionError =
          "Your video description must be at least 100 characters long");
    }
    if (this.state.videoDescription.length > 700) {
      (isError = true),
        (errors.videoDescriptionError =
          "Your video description must be less than 700 characters long");
    }
    if (!this.state.videoCategory) {
      (isError = true),
        (errors.videoCategoryError =
          "You must select a swing category for your video");
    }
    this.setState({ ...errors });

    return isError;
  };

  render() {
    return (
      <div className="container">
        <form>
          <div class="field">
            <label class="label">Video Title</label>
            <div class="control">
              <input class="input" type="text" placeholder="Your Title Here" />
            </div>
          </div>

          <div class="field">
            <label class="label">Category</label>
            <div class="control">
              <div class="select">
                <select>
                  <option>Full Swing</option>
                  <option>Pitching</option>
                  <option>Chipping</option>
                  <option>Putting</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Video Description</label>
            <div class="control">
              <textarea class="textarea" placeholder="Textarea" />
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" />I agree to the{" "}
                <a href="#">terms and conditions</a>
              </label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
