import React from 'react';

class ShareTicketLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showShareLink: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      showShareLink: !this.state.showShareLink,
    });
  }

  render() {
    if (this.state.showShareLink) {
      return (
        <React.Fragment>
          <a href="javascript:void(0)" onClick={this.handleClick}>
          <i className="fas fa-share ticket-actions">share</i>
          </a>
          <div className="box">{this.props.ticketHref}</div>
        </React.Fragment>
      );
    } else {
      return (
        <a onClick={this.handleClick} href="javascript:void(0)">
          <i className="fas fa-share ticket-actions">share</i>
        </a>
      );
    }
  }
}

export default ShareTicketLink;
