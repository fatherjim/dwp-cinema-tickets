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

  test('user input is a non-integer', () => {
    expect(createTicketTypeRequestIfValid(ticketType, 'non-integer')).toBe(
      null
    );
  });

  test('user input is an integer as string, but less than 0', () => {
    expect(createTicketTypeRequestIfValid(ticketType, '-1')).toBe(null);
  });

  test('user input is an integer as string, and >=0', () => {
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
