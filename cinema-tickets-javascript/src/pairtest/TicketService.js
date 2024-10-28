import TicketTypeRequest from './lib/TicketTypeRequest.js';
import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

import { TICKET_TYPES } from './config/app.config.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  ticketValidationService;

  constructor(ticketValidationService) {
    this.ticketValidationService = ticketValidationService;
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // Separate ticket requests by type.
    // TODO - Support multiple ticket requests of same type by
    // grouping by ticket type and find sum of tickets (per type)
    const adultTicketsRequest = ticketTypeRequests.find(
      (request) => request.getTicketType() === TICKET_TYPES.ADULT
    );
    const childTicketsRequest = ticketTypeRequests.find(
      (request) => request.getTicketType() === TICKET_TYPES.CHILD
    );
    const infantTicketsRequest = ticketTypeRequests.find(
      (request) => request.getTicketType() === TICKET_TYPES.INFANT
    );

    try {
      this.ticketValidationService.validateTicketRequests(
        adultTicketsRequest,
        childTicketsRequest,
        infantTicketsRequest
      );
    } catch (errorMsg) {
      throw new InvalidPurchaseException(errorMsg);
    }

    // TODO - Cost calculations
    // TODO - Seat calculations
    // TODO - Call relevant services
  }
}
