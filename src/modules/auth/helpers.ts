import { CountryCode, parsePhoneNumber } from "libphonenumber-js";

export function formatPhoneNumber(
  phoneNumber?: string,
  defaultCountry: CountryCode = "US",
) {
  if (!phoneNumber) return "No phone number provided";
  try {
    const parsedNumber = parsePhoneNumber(phoneNumber, defaultCountry);
    if (parsedNumber) {
      // Format for international use
      return parsedNumber.formatInternational();
    }
    return "Invalid phone number";
  } catch (error) {
    console.error("Error parsing phone number:", error);
    return "Error parsing phone number";
  }
}
