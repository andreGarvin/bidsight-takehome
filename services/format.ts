import * as dateFns from "date-fns";

export const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(value);
};

export const formatTime = (value: string) => {
  return dateFns.format(new Date(value), "MMMM do yyyy");
};
