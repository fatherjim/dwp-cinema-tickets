import InvalidPurchaseException from './lib/InvalidPurchaseException.js';

import { TICKET_PRICES, TICKET_TYPES } from './config/app.config.js';
import strings from './utils/strings.json' with { type: 'json' };

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */
  ticketValidationService;
  ticketPaymentService;
  seatReservationService;

  constructor(
    ticketValidationService,
    ticketPaymentService,
    seatReservationService
  ) {
    this.ticketValidationService = ticketValidationService;
    this.ticketPaymentService = ticketPaymentService;
    this.seatReservationService = seatReservationService;
  }

  #getTicketsCost(adultTicketRequest, childTicketRequest, infantTicketRequest) {
    return (
      adultTicketRequest.getNoOfTickets() * TICKET_PRICES.ADULT +
      childTicketRequest.getNoOfTickets() * TICKET_PRICES.CHILD +
      infantTicketRequest.getNoOfTickets() * TICKET_PRICES.INFANT
    );
  }

  #getTotalNumberOfSeatsToReserve(
    adultTicketRequest,
    childTicketRequest,
    _infantTicketRequest
  ) {
    return (
      adultTicketRequest.getNoOfTickets() + childTicketRequest.getNoOfTickets()
    );
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

    const totalTicketsCost = this.#getTicketsCost(
      adultTicketsRequest,
      childTicketsRequest,
      infantTicketsRequest
    );
    this.ticketPaymentService.makePayment(accountId, totalTicketsCost);
    console.log(
      strings.ticket_payment_successful.replace('{totalCost}', totalTicketsCost)
    );

    const totalSeatsToReserve = this.#getTotalNumberOfSeatsToReserve(
      adultTicketsRequest,
      childTicketsRequest,
      infantTicketsRequest
    );
    this.seatReservationService.reserveSeat(accountId, totalSeatsToReserve);
    console.log(
      strings.seat_reservation_successful.replace(
        '{totalNoOfSeats}',
        totalSeatsToReserve
      )
    );
  }
}
