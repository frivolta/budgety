export const formatNetworkErrorMessages = (errorMessage: string) =>
  errorMessage.replace("GraphQL error:", "").trim();

export const formatPrice = (price: string) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(parseFloat(price));
};
