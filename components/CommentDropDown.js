import React from 'react';
import EditCommentTextArea from './EditCommentTextArea';

export default class CommentDropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <>
          <div onClick={this.handleClick} className="dropdown is-active">
            <div className="dropdown-trigger">
              <i className="fas fa-ellipsis-h ellipsis-icon" />
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                <a
                  className="dropdown-item is-unselectable"
                  onClick={this.props.openEditMode}
                >
                  Edit
                </a>
                <hr className="dropdown-divider" />
                <a
                  onClick={this.props.openDeleteMode}
                  className="dropdown-item is-unselectable"
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        </>
      );
    } else if (!this.state.isOpen) {
      return (
        <>
          <div onClick={this.handleClick} className="dropdown">
            <div className="dropdown-trigger">
              <i className="fas fa-ellipsis-h ellipsis-icon" />
            </div>
          </div>
        </>
      );
    }
  }
}
