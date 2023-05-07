import { Charge } from "api/types";

export const calculateTotalCost = (charges: Charge[]): number => {
  return charges.reduce((prev, curr) => {
    return prev + curr.price;
  }, 0);
};
