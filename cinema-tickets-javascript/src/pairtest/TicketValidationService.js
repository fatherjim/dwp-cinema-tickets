export default class TicketValidationService {
  validateTicketRequests(...ticketTypeRequests) {
    ticketTypeRequests.forEach((request) => {
      console.log(`${request.getTicketType()}: ${request.getNoOfTickets()}`);
    });
  }
}
