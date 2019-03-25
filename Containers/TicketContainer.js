import { Container } from 'unstated';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import userStore from '../helpers/localForage';

export default class TicketContainer extends Container {
  constructor(props = {}) {
    super(props);

    this.state = {
      tickets: props.initialTickets || [],
      error: false,
    };
  }
  handleAddTicket = async (e) => {
    console.log('hello world!');
  };
}
