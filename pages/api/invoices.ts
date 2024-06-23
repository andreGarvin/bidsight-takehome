import { NextApiRequest, NextApiResponse } from "next";

import { faker } from "@faker-js/faker";
import * as dateFns from "date-fns";

const createCharges = () => {
  return [
    { [faker.lorem.word()]: faker.number.float({ min: 1, max: 5000, fractionDigits: 2 }) },
    { [faker.lorem.word()]: faker.number.float({ min: 1, max: 5000, fractionDigits: 2 }) },
    { [faker.lorem.word()]: faker.number.float({ min: 1, max: 5000, fractionDigits: 2 }) },
    { [faker.lorem.word()]: faker.number.float({ min: 1, max: 5000, fractionDigits: 2 }) },
    { [faker.lorem.word()]: faker.number.float({ min: 1, max: 5000, fractionDigits: 2 }) },
  ];
}

const createInvoice = () => {
  return {
    id: faker.number.int(),
    name: faker.lorem.word(),
    status: faker.helpers.arrayElement(["paid", "draft", "outstanding"]),
    due_date: faker.date.between({ from: new Date(), to: dateFns.addDays(new Date(), 5) }),
    charges: createCharges(),
  };
}


export default function handler(req, res: NextApiResponse) {
  const invoices: any[] = [];

  for (let i = 0; i < 10; i++) {
    invoices.push(createInvoice());
  }

  res.status(200).json(invoices);
}
