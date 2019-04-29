import React from 'react';

import EditCommentModal from './EditCommentModal';
import Portal from './Portal';

export default class CommentDropDown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isModalOpen: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  open = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  close = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleEditClick() {
    this.setState(() => ({
      isModalOpen: !this.state.isModalOpen,
    }));
  }

  render() {
    return this.state.isOpen ? (
      <>
        <div onClick={this.handleClick} className="dropdown is-active">
          <div className="dropdown-trigger">
            <i className="fas fa-ellipsis-h ellipsis-icon" />
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <a className="dropdown-item is-unselectable" onClick={this.open}>
                Edit
              </a>
              <hr className="dropdown-divider" />
              <a className="dropdown-item is-unselectable">Delete</a>
            </div>
          </div>
        </div>
      </>
    ) : (
      <>
        <div onClick={this.handleClick} className="dropdown">
          <div className="dropdown-trigger">
            <i className="fas fa-ellipsis-h ellipsis-icon" />
          </div>
        </div>
        {this.state.isModalOpen && (
          <Portal selector={'#modal'}>
            <EditCommentModal
              close={this.close}
              isModalOpen={this.state.isModalOpen}
              comment={this.props.comment}
            />
          </Portal>
        )}
      </>
    );
  }
}
