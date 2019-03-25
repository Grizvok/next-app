import React from 'react';

import ExpandedTicketContent from './ExpandedTicketContent';

class ExpandTicketButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showExpandedContent: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      showExpandedContent: !this.state.showExpandedContent,
    });
  }

  render() {
    if (this.state.showExpandedContent) {
      return (
        <React.Fragment>
          <a href="javascript:void(0)" onClick={this.handleClick}>
          <i className="fas fa-minus-square expand-content-icon" />
          </a>
          <ExpandedTicketContent ticketDescription={this.props.ticketDescription}/>
        </React.Fragment>
      );
    } else {
      return (
        <a href="javascript:void(0)" onClick={this.handleClick}>
          <i className="fas fa-plus-square expand-content-icon" />
        </a>
      );
    }
  }
}

export default ExpandTicketButton;
