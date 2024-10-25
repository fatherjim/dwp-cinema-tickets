import readline from 'readline';

import strings from './pairtest/utils/strings.json' with { type: 'json' };
import { generateAccountId } from './pairtest/utils/helpers.js';

const accountId = generateAccountId();
console.log(strings.welcome.replace('{accountId}', accountId));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let adultTicketsNo;
let childTicketsNo;
let infantTicketsNo;

const adultTicketsQuestion = () => {
  return new Promise((resolve, _) => {
    rl.question(strings.request_number_of_adult_tickets, (answer) => {
      adultTicketsNo = answer;
      resolve();
    });
  });
};
const childTicketsQuestion = () => {
  return new Promise((resolve, _) => {
    rl.question(strings.request_number_of_child_tickets, (answer) => {
      childTicketsNo = answer;
      resolve();
    });
  });
};
const infantTicketsQuestion = () => {
  return new Promise((resolve, _) => {
    rl.question(strings.request_number_of_infant_tickets, (answer) => {
      infantTicketsNo = answer;
      resolve();
    });
  });
};

const main = async () => {
  await adultTicketsQuestion();
  await childTicketsQuestion();
  await infantTicketsQuestion();
  rl.close();

  console.log(`Adult tickets: ${adultTicketsNo}`);
  console.log(`Child tickets: ${childTicketsNo}`);
  console.log(`Infant tickets: ${infantTicketsNo}`);
};

main();
