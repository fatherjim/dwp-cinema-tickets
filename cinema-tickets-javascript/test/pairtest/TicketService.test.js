import { jest, describe, test, expect } from '@jest/globals';

import TicketService from '../../src/pairtest/TicketService.js';
import TicketValidationService from '../../src/pairtest/TicketValidationService.js';
import TicketPaymentService from '../../src/thirdparty/paymentgateway/TicketPaymentService.js';
import TicketTypeRequest from '../../src/pairtest/lib/TicketTypeRequest';
import { TICKET_TYPES } from '../../src/pairtest/config/app.config.js';
import { generateAccountId } from '../../src/pairtest/utils/helpers.js';
import InvalidPurchaseException from '../../src/pairtest/lib/InvalidPurchaseException.js';
import strings from '../../src/pairtest/utils/strings.json' with { type: 'json' };

describe('Testing TicketService', () => {
  const ticketValidationService = new TicketValidationService();
  const ticketPaymentService = new TicketPaymentService();
  const ticketService = new TicketService(
    ticketValidationService,
    ticketPaymentService
  );

  const adultTicketRequest = new TicketTypeRequest(TICKET_TYPES.ADULT, 0);
  const childTicketRequest = new TicketTypeRequest(TICKET_TYPES.CHILD, 0);
  const infantTicketRequest = new TicketTypeRequest(TICKET_TYPES.INFANT, 0);

  test('failed ticket validation', () => {
    const accountId = generateAccountId();

    expect(() => {
      ticketService.purchaseTickets(
        accountId,
        adultTicketRequest,
        childTicketRequest,
        infantTicketRequest
      );
    }).toThrowError(InvalidPurchaseException);
  });

  test('failed ticket payment due to erroneous account id', () => {
    jest
      .spyOn(ticketValidationService, 'validateTicketRequests')
      .mockImplementation(() => undefined);

    expect(() => {
      ticketService.purchaseTickets(
        'accountId',
        adultTicketRequest,
        childTicketRequest,
        infantTicketRequest
      );
    }).toThrowError('accountId must be an integer');
  });

  test('successful ticket payment', () => {
    const accountId = generateAccountId();

    jest
      .spyOn(adultTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 10);
    jest
      .spyOn(childTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 6);
    jest
      .spyOn(infantTicketRequest, 'getNoOfTickets')
      .mockImplementation(() => 2);
    const expectedTotalCostString = strings.ticket_payment_successful.replace(
      '{totalCost}',
      340
    );

    const logSpy = jest.spyOn(global.console, 'log');

    ticketService.purchaseTickets(
      accountId,
      adultTicketRequest,
      childTicketRequest,
      infantTicketRequest
    );

    expect(logSpy).toHaveBeenCalledWith(expectedTotalCostString);

    logSpy.mockClear();
  });
});
