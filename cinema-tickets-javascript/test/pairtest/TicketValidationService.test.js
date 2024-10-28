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

  test('there is at least one adult ticket purchased', () => {
    jest
      .spyOn(childTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 5);
    jest
      .spyOn(infantTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 1);

    expect(() => {
      ticketValidationService.validateTicketRequests(
        adultTicketRequest,
        childTicketRequest,
        infantTicketRequest
      );
    }).toThrow(strings.error_require_adult_companion);
  });

  test('number of adult tickets is less than number of infant tickets', () => {
    jest
      .spyOn(adultTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 1);
    jest
      .spyOn(infantTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 2);

    expect(() => {
      ticketValidationService.validateTicketRequests(
        adultTicketRequest,
        childTicketRequest,
        infantTicketRequest
      );
    }).toThrow(strings.error_adult_carry_infant);
  });

  test('number of adult tickets is much less than the number of children to watch', () => {
    jest
      .spyOn(adultTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 2);
    jest
      .spyOn(childTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 5);
    jest
      .spyOn(infantTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 2);

    expect(() => {
      ticketValidationService.validateTicketRequests(
        adultTicketRequest,
        childTicketRequest,
        infantTicketRequest
      );
    }).toThrow(strings.error_adult_watch_children);
  });

  test('that all ticket requests have been validated', () => {
    jest
      .spyOn(adultTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 2);
    jest
      .spyOn(childTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 4);
    jest
      .spyOn(infantTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 2);

    const logSpy = jest.spyOn(global.console, 'log');

    ticketValidationService.validateTicketRequests(
      adultTicketRequest,
      childTicketRequest,
      infantTicketRequest
    );

    expect(logSpy).toHaveBeenCalledWith(strings.tickets_validation_success);

    logSpy.mockRestore();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
