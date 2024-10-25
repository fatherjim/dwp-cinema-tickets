import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  ticketValidationService;

  constructor(ticketValidationService) {
    this.ticketValidationService = ticketValidationService;
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    this.ticketValidationService.validateTicketRequests(...ticketTypeRequests);

    // throws InvalidPurchaseException
  }
}
