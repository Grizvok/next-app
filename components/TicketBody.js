import React from 'react';
import fetch from 'isomorphic-unfetch';

class TicketBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticketDescription: this.props.ticketBody,
      editedTicketDescription: this.props.ticketBody,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditCancel = this.handleEditCancel.bind(this);
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
    const payload = {
      description: this.state.editedTicketDescription,
      ticketOwner: this.props.ticketOwner,
    };

    e.preventDefault();

    const res = await fetch(
      `http://localhost:3000/api/ticket/${this.props.ticketID}`,
      {
        method: 'PATCH',
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiJ9.R3JpenZvaw.Z9DrrJKETt8i_nZh4Fme2P5snwvgfhzfHpqFqrH5k5g',
          'Content-Type': 'application/json',
        },
      }
    );

    const json = await res.json();
    const newDescription = json.description;

    if (res.status === 200) {
      this.setState({
        ticketDescription: newDescription,
        editedTicketDescription: newDescription,
      });
      this.props.handleEditMode();
    }
  };

  handleEditCancel = () => {
    this.props.handleEditCancel();

    this.setState({
      editedTicketDescription: this.state.ticketDescription,
    });
  };

  render() {
    if (this.props.editMode === true) {
      return (
        <form>
          <div className="field">
            <div className="control">
              <textarea
                className="column is-three-quarters"
                value={this.state.editedTicketDescription}
                name="editedTicketDescription"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button
                onClick={this.handleSubmit}
                type="submit"
                className="button is-link"
              >
                Save
              </button>
            </div>
            <div className="control">
              <button
                onClick={this.handleEditCancel}
                className="button is-text"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      );
    } else {
      return (
        <div className="box ticket-body column is-three-quarters">
          {this.state.ticketDescription}
        </div>
      );
    }
  }
}

export default TicketBody;
