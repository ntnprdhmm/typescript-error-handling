const getIsCreditCardNumberValid = (cardNumber: string): boolean => {
  return Boolean(cardNumber.match("^[0-9]{16}$"));
};

const getIsDateInTheFuture = (expirationDate: Date): boolean => {
  return new Date() < expirationDate;
};

type RegisterCreditCardResult =
  | { outcome: "success" }
  | { outcome: "error"; reason: "invalid_card_number" }
  | { outcome: "error"; reason: "card_expired" };

const registerCreditCard = (
  cardNumber: string,
  expirationDate: Date
): RegisterCreditCardResult => {
  const isCreditCardNumberIsValid = getIsCreditCardNumberValid(cardNumber);
  if (!isCreditCardNumberIsValid) {
    return { outcome: "error", reason: "invalid_card_number" };
  }

  const isDateInTheFuture = getIsDateInTheFuture(expirationDate);
  if (!isDateInTheFuture) {
    return { outcome: "error", reason: "card_expired" };
  }

  // ...

  return { outcome: "success" };
};

const rejectUnexpectedErrorOutcomeReason = (result: never): never => {
  const reason =
    result && typeof result === "object"
      ? (result as any).reason
      : "<not an object>";
  throw new Error(
    `Unexpected value for reason attribute in error outcome: ${reason}`
  );
};

try {
  const result = registerCreditCard("5168441223630339", new Date(2021, 11));
  if (result.outcome === "error") {
    switch (result.reason) {
      case "card_expired":
        console.log("card expired");
        break;
      case "invalid_card_number":
        console.log("invalid card number");
        break;
      default:
        rejectUnexpectedErrorOutcomeReason(result);
    }
  }
} catch (error) {
  console.log("unknown error");
}
