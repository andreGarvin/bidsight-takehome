import { create } from "zustand";
import { InvoiceSlice, createInvoiceSlice } from "./slices/invoice";

type StoreState = InvoiceSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createInvoiceSlice(...a),
}));
