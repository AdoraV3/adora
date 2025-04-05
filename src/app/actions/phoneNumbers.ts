"use server";

import {
  createAvailablePhoneNumber,
  getAvailablePhoneNumbers,
} from "@/data-access/availablePhoneNumber";
import { createServerAction } from "zsa";
import { getVapiPhoneNumbers } from "./vapi";

export const getPhoneNumbersAction = createServerAction().handler(async () => {
  const vapiPhoneNumbers = await getVapiPhoneNumbers();
  const existingPhoneNumbers = await getAvailablePhoneNumbers();

  const existingPhoneNumberSet = new Set(
    existingPhoneNumbers.map(pn => pn.phoneNumber),
  );

  const newPhoneNumbers = vapiPhoneNumbers.filter(
    pn => !existingPhoneNumberSet.has(pn.number),
  );

  if (newPhoneNumbers.length > 0) {
    const payload = newPhoneNumbers.map(pn => ({
      phoneNumber: pn.number,
      vapiId: pn.id,
    }));
    await createAvailablePhoneNumber(payload);
  }

  const phoneNumbers = await getAvailablePhoneNumbers();
  return { success: true, data: phoneNumbers };
});
