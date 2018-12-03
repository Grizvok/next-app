import { Container } from 'unstated';


export default class TicketContainer extends Container {
  state = {
    ticketList: []
  }

  getUserTickets = async (e) => {
    e.preventDefault();
  }
}
