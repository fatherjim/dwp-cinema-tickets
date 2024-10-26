import TicketTypeRequest from '../lib/TicketTypeRequest.js';

function generateNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateAccountId() {
  return generateNumberBetween(1, 100);
}

function createTicketTypeRequestIfValid(ticketType, userInput) {
  const parsedInput = parseInt(userInput);
  if (Number.isInteger(parsedInput) && parsedInput >= 0) {
    return new TicketTypeRequest(ticketType, parsedInput);
  } else {
    return null;
  }
}

export { generateAccountId, createTicketTypeRequestIfValid };
