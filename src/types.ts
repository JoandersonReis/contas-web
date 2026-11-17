export type User = { id: string; name: string; email: string };
export type Entry = {
  id: string;
  description: string;
  amountCents: number;
  date: string;
};
export type Folder = {
  id: string;
  name: string;
  budgetCents: number;
  spentCents: number;
  entries: Entry[];
};
