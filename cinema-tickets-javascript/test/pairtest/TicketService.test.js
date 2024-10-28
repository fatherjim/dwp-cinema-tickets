import { describe, test } from '@jest/globals';

import TicketService from '../../src/pairtest/TicketService.js';
import TicketValidationService from '../../src/pairtest/TicketValidationService.js';
import TicketPaymentService from '../../src/thirdparty/paymentgateway/TicketPaymentService.js';

describe('Testing TicketService', () => {
  const ticketValidationService = new TicketValidationService();
  const ticketPaymentService = new TicketPaymentService();
  const ticketService = new TicketService(
    ticketValidationService,
    ticketPaymentService
  );

  test('failed ticket payment due to erroneous account id', () => {});

  test('failed ticket payment due to non-integer total', () => {});

  test('successful ticket payment', () => {});
});
