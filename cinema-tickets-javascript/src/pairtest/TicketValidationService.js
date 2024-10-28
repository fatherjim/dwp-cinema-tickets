import strings from './utils/strings.json' with { type: 'json' };

export default class TicketValidationService {
  validateTicketRequests(
    adultTicketsRequest,
    childTicketsRequest,
    infantTicketsRequest
  ) {
    console.log(strings.ticket_validation_success);
  }
}
