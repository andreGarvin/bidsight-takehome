import { ValueOf } from "next/dist/shared/lib/constants";

export type Charge = {
  id: number;
  title: string;
  price: number;
}

export enum InvoiceStatuses {
  paid = 'paid',
  draft = 'draft',
  outstanding = 'outstanding'
}

export type InvoiceStatus = keyof typeof InvoiceStatuses;

export type Invoice = {
  id: number;
  name: string;
  due_date: string;
  charges: Charge[];
  status: InvoiceStatus;
};
