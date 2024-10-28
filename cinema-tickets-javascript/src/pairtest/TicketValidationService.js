import { MAX_NUMBER_OF_TICKETS_PER_REQUEST } from './config/app.config.js';
import strings from './utils/strings.json' with { type: 'json' };

export default class TicketValidationService {
  #validateTotalNumberOfTickets(
    adultTicketsRequest,
    childTicketsRequest,
    infantTicketsRequest
  ) {
    let totalNoOfTickets =
      adultTicketsRequest.getNoOfTickets() +
      childTicketsRequest.getNoOfTickets() +
      infantTicketsRequest.getNoOfTickets();

    if (totalNoOfTickets <= 0) {
      throw strings.error_min_number_of_tickets;
    }

    if (totalNoOfTickets > MAX_NUMBER_OF_TICKETS_PER_REQUEST) {
      const errorMsg = strings.error_max_number_of_tickets
        .replace('{currentTicketNumber}', totalNoOfTickets)
        .replace('{maxTicketNumber}', MAX_NUMBER_OF_TICKETS_PER_REQUEST);
      throw errorMsg;
    }
  }

  #validateAdultCompanion(
    adultTicketsRequest,
    childTicketRequest,
    infantTicketRequest
  ) {
    if (adultTicketsRequest.getNoOfTickets() <= 0) {
      throw strings.error_require_adult_companion;
    }

    if (
      adultTicketsRequest.getNoOfTickets() <
      infantTicketRequest.getNoOfTickets()
    ) {
      throw strings.error_adult_carry_infant;
    }
  }

  validateTicketRequests(
    adultTicketsRequest,
    childTicketsRequest,
    infantTicketsRequest
  ) {
    this.#validateTotalNumberOfTickets(
      adultTicketsRequest,
      childTicketsRequest,
      infantTicketsRequest
    );

    this.#validateAdultCompanion(
      adultTicketsRequest,
      childTicketsRequest,
      infantTicketsRequest
    );

    console.log(strings.tickets_validation_success);
  }
}
