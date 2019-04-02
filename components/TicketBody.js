// can probably refactor this to be a functional component

import React from 'react';

class TicketBody extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.editMode === true) {
      return (
        <form>
          <div className="field">
            <div className="control">
              <textarea
                className="column is-three-fifths"
                value={this.props.editedTicketDescription}
                name="editedTicketDescription"
                onChange={this.props.handleTicketChange}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button
                onClick={this.props.handleSubmit}
                type="submit"
                className="button is-link"
              >
                Save
              </button>
            </div>
            <div className="control">
              <button
                onClick={this.props.handleEditCancel}
                className="button"
                type="button is-grey"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      );
    } else {
      return (
        <div className="ticket-body column is-full">
          {this.props.ticketBody}
        </div>
      );
    }
  }
}

export default TicketBody;
