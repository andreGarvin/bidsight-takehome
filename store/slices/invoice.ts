import { Charge, Invoice } from "api/types";
import { StateCreator } from "zustand";

export interface InvoiceSlice {
  invoices: Invoice[];
  deleteInvoice: (id: number) => void;
  setInvoices: (invoices: Invoice[]) => void;
  createOrUpdateInvoice: (invoice: Invoice) => void;
  removeChargeFromInvoice: (invoiceId: number, chargeID: number) => void;
  createOrUpdateChargeOnInvoice: (inoviceID: number, charge: Charge) => void;
}

export const createInvoiceSlice: StateCreator<InvoiceSlice> = (set, get) => ({
  invoices: [],
  setInvoices: (invoices) => {
    const transformedInvoices = invoices.map((invoice) => {
      invoice.charges = invoice.charges.map((charge, idx) => {
        const [c] = Object.entries(charge);
        const [title, price] = c;

        return { id: idx, title, price: Number(price) };
      });
      return invoice;
    });

    set({ invoices: transformedInvoices });
  },
  deleteInvoice: (id: number) => {
    const invoices = get().invoices;

    const filterInvoices = invoices.filter((invoice) => {
      return invoice.id !== id;
    }).map(invoice => {
      invoice.id = invoice.id - 1;
      return invoice
    });

    set({
      invoices: filterInvoices,
    });
  },
  createOrUpdateInvoice: (invoice: Invoice) => {
    const invoices = get().invoices;

    const [inv] = invoices.filter((inv) => {
      return inv.id === invoice.id;
    });

    if (inv) {
      set({
        invoices: invoices.map(inv => {
          if (inv.id === invoice.id) {
            return invoice;
          }

          return inv;
        }),
      });
      return;
    }

    set({
      invoices: [invoice, ...invoices].map((invoice, idx) => {
        invoice.id = idx + 1;
        return invoice;
      }),
    });
  },
  createOrUpdateChargeOnInvoice: (invoiceID: number, charge: Charge) => {
    const invoices = get().invoices;

    const [invoice] = invoices.filter((invoice) => {
      return invoice.id === invoiceID;
    });

    const [selectedCharge] = invoice.charges.filter(c => {
      return c.id === charge.id;
    });

    if (selectedCharge) {
      invoice.charges = invoice.charges.map((c) => {
        if (c.id === charge.id) {
          return { ...c, ...charge };
        }

        return c;
      });
    } else {
      invoice.charges = [
        ...invoice.charges,
        charge
      ];
    }

    set({
      invoices: invoices.map(i => {
        if (i.id === invoice.id) {
          return invoice;
        }

        return i;
      }),
    });
  },
  removeChargeFromInvoice: (invoiceID: number, chargeID: number) => {
    const invoices = get().invoices;

    const filteredInvoices = invoices.map(invoice => {
      if (invoice.id === invoiceID) {
        invoice.charges = invoice.charges.filter((charge) => {
          return charge.id !== chargeID;
        });
      }

      return invoice;
    });

    set({
      invoices: filteredInvoices,
    });
  },
});
