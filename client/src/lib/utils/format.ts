export const formatNetworkErrorMessages = (errorMessage: string) =>
  errorMessage.replace("GraphQL error:", "").trim();

export const formatPrice = (price: string) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(parseFloat(price));
};


interface DateOptions {
    year: string;
    month: string;
    day: string;
    weekday?: string;
}

export const formatDateFromTimestamp = (date: Date, showWeekDay: boolean = false): string | undefined => {
  // Type convert to any as Firebase Timestamp is returned from database Date
  const timestamp = date as any;
  const options:DateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  if (showWeekDay) { options.weekday = "short" }
  try {    
    const newDate = timestamp.toDate() as Date;
    const formattedDate = new Intl.DateTimeFormat('en-US',options).format(newDate);
    return formattedDate;
  } catch (e) {
    console.error("Cannot convert date: ", e)
  }
}