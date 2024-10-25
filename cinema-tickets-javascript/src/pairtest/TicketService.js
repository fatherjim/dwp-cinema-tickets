import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    console.log(
      `Account #${accountId} would like to purchase the following tickets:`
    );
    ticketTypeRequests.forEach((request) => {
      console.log(`${request.getTicketType()}: ${request.getNoOfTickets()}`);
    });

    // throws InvalidPurchaseException
  }
}
