import { describe, expect, test } from '@jest/globals';

import { createTicketTypeRequestIfValid } from '../../../src/pairtest/utils/helpers.js';
import { TICKET_TYPES } from '../../../src/pairtest/config/app.config.js';
import TicketTypeRequest from '../../../src/pairtest/lib/TicketTypeRequest.js';

function getRandomTicketType() {
  const randomIndex = Math.floor(
    Math.random() * Object.keys(TICKET_TYPES).length
  );
  return Object.values(TICKET_TYPES)[randomIndex];
}

describe('Testing helper function createTicketTypeRequestIfValid', () => {
  const ticketType = getRandomTicketType();
  console.log(`Ticket type: ${ticketType}`);

  test('User input is a non-integer', () => {
    expect(createTicketTypeRequestIfValid(ticketType, 'non-integer')).toBe(
      null
    );
  });

  test('User input is an integer as string', () => {
    const userInput = '10';
    const parsedUserInput = parseInt(userInput);
    const expectedTicketTypeRequest = new TicketTypeRequest(
      ticketType,
      parsedUserInput
    );
    expect(createTicketTypeRequestIfValid(ticketType, userInput)).toMatchObject(
      expectedTicketTypeRequest
    );
  });
});
