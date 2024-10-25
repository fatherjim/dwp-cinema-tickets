import readline from 'readline';

import strings from './pairtest/utils/strings.json' with { type: 'json' };
import TicketTypeRequest from './pairtest/lib/TicketTypeRequest.js';
import { TICKET_TYPES } from './pairtest/config/app.config.js';
import { generateAccountId } from './pairtest/utils/helpers.js';
import TicketService from './pairtest/TicketService.js';
import TicketValidationService from './pairtest/TicketValidationService.js';

const accountId = generateAccountId();
console.log(strings.welcome.replace('{accountId}', accountId));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let adultTicketsRequest;
let childTicketsRequest;
let infantTicketsRequest;

const requestNoOfAdultTickets = () => {
  return new Promise((resolve, _) => {
    rl.question(strings.request_number_of_adult_tickets, (input) => {
      const parsedInput = parseInt(input);
      if (!Number.isInteger(parsedInput)) {
        console.log(strings.error_request_valid_number_of_tickets);
      } else {
        adultTicketsRequest = new TicketTypeRequest(
          TICKET_TYPES.ADULT,
          parsedInput
        );
      }
      resolve();
    });
  });
};

const requestNoOfChildTickets = () => {
  return new Promise((resolve, _) => {
    rl.question(strings.request_number_of_child_tickets, (input) => {
      const parsedInput = parseInt(input);
      if (!Number.isInteger(parsedInput)) {
        console.log(strings.error_request_valid_number_of_tickets);
      } else {
        childTicketsRequest = new TicketTypeRequest(
          TICKET_TYPES.CHILD,
          parsedInput
        );
      }
      resolve();
    });
  });
};

const requestNoOfInfantTickets = () => {
  return new Promise((resolve, _) => {
    rl.question(strings.request_number_of_infant_tickets, (input) => {
      const parsedInput = parseInt(input);
      if (!Number.isInteger(parsedInput)) {
        console.log(strings.error_request_valid_number_of_tickets);
      } else {
        infantTicketsRequest = new TicketTypeRequest(
          TICKET_TYPES.INFANT,
          parsedInput
        );
      }
      resolve();
    });
  });
};

const main = async () => {
  do {
    await requestNoOfAdultTickets();
  } while (adultTicketsRequest == null);
  do {
    await requestNoOfChildTickets();
  } while (childTicketsRequest == null);
  do {
    await requestNoOfInfantTickets();
  } while (infantTicketsRequest == null);
  rl.close();

  const ticketValidationService = new TicketValidationService();
  const ticketService = new TicketService(ticketValidationService);
  ticketService.purchaseTickets(
    accountId,
    adultTicketsRequest,
    childTicketsRequest,
    infantTicketsRequest
  );
};

main();
