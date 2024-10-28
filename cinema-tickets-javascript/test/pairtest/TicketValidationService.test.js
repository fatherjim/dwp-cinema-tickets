import {
  beforeAll,
  describe,
  expect,
  test,
  jest,
  afterEach,
} from '@jest/globals';

import TicketValidationService from '../../src/pairtest/TicketValidationService.js';
import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest.js';
import {
  TICKET_TYPES,
  MAX_NUMBER_OF_TICKETS_PER_REQUEST,
} from '../../src/pairtest/config/app.config.js';
import strings from '../../src/pairtest/utils/strings.json' with { type: 'json' };

describe('Testing TicketValidationService', () => {
  let ticketValidationService;
  const adultTicketRequest = new TicketTypeRequest(TICKET_TYPES.ADULT, 0);
  const childTicketRequest = new TicketTypeRequest(TICKET_TYPES.CHILD, 0);
  const infantTicketRequest = new TicketTypeRequest(TICKET_TYPES.INFANT, 0);

  beforeAll(() => {
    ticketValidationService = new TicketValidationService();
  });

  test('total number of tickets must be positive', () => {
    expect(() => {
      ticketValidationService.validateTicketRequests(
        adultTicketRequest,
        childTicketRequest,
        infantTicketRequest
      );
    }).toThrow(strings.error_min_number_of_tickets);
  });

  test('total number of tickets exceed the maximum', () => {
    jest
      .spyOn(adultTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 25);
    jest
      .spyOn(childTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 5);
    jest
      .spyOn(infantTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 1);
    const expectedErrorMsg = strings.error_max_number_of_tickets
      .replace('{currentTicketNumber}', 31)
      .replace('{maxTicketNumber}', MAX_NUMBER_OF_TICKETS_PER_REQUEST);

    expect(() => {
      ticketValidationService.validateTicketRequests(
        adultTicketRequest,
        childTicketRequest,
        infantTicketRequest
      );
    }).toThrow(expectedErrorMsg);
  });

  test('there is at least one adult ticket purchased', () => {});

  test('number of adult tickets is equal or more than number of infant tickets', () => {});

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
