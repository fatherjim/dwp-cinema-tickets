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
    try {
      this.ticketValidationService.validateTicketRequests(
        ...ticketTypeRequests
      );
    } catch (errorMsg) {
      throw new InvalidPurchaseException(errorMsg);
    }
  }
}
