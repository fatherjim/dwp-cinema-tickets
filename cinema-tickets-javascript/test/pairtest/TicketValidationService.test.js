import { beforeAll, describe, test } from '@jest/globals';

import TicketValidationService from '../../src/pairtest/TicketValidationService';

describe('Testing TicketValidationService', () => {
  let ticketValidationService;

  beforeAll(() => {
    ticketValidationService = new TicketValidationService();
  });

  test('total number of tickets exceed the maximum', () => {});

  test('there is at least one adult ticket purchased', () => {});

  test('number of adult tickets is equal or more than number of infant tickets', () => {});
});
