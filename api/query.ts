import { Invoice } from "./types";

const APIUrl = process.env.NEXT_PUBLIC_API_URL as string;

export const GetInvoices = async (): Promise<Invoice[]> => {
  const resp = await fetch(APIUrl);
  return resp.json();
};
