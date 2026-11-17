export const money = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const today = () => new Date().toLocaleDateString("en-CA");
