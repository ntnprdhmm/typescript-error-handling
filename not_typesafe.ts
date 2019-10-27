const getIsCreditCardNumberValid = (cardNumber: string): boolean => {
  return Boolean(cardNumber.match("^[0-9]{16}$"));
};

const getIsDateInTheFuture = (expirationDate: Date): boolean => {
  return new Date() < expirationDate;
};

const registerCreditCard = (cardNumber: string, expirationDate: Date): void => {
  const isCreditCardNumberIsValid = getIsCreditCardNumberValid(cardNumber);
  if (!isCreditCardNumberIsValid) {
    throw new Error("invalid_card_number");
  }

  const isDateInTheFuture = getIsDateInTheFuture(expirationDate);
  if (!isDateInTheFuture) {
    throw new Error("card_expired");
  }

  // ...
};

try {
  registerCreditCard("5168441223630339", new Date(2021, 11));
  console.log("ok");
} catch (error) {
  switch (error.message) {
    case "invalid_card_number":
      console.log("invalid card number");
      break;
    case "card_expired":
      console.log("card expired");
      break;
    default:
      console.log("unknown error");
  }
}
