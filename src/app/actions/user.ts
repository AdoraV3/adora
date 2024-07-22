"use server";

import {
  createBusinessProfile,
  getBusinessProfile,
  getUserByEmail,
  updateBusinessProfile,
  updateProfile,
} from "@/data-access";
import { authenticationProcedure } from "@/lib/procedures";
import { profileSchema } from "@/modules/home/components/profile/validation";

export const updateUserProfileAction = authenticationProcedure
  .createServerAction()
  .input(profileSchema)
  .handler(async ({ input, ctx }) => {
    const { id } = ctx;
    const { name, phoneNumber, country, businessName, businessCountry } = input;
    const profile = await updateProfile(id, {
      name,
      country,
      phone: phoneNumber,
    });
    let businessProfile;

    const findBusinessProfile = await getBusinessProfile(id);
    if (!findBusinessProfile) {
      businessProfile = await createBusinessProfile({
        name: businessName,
        country: businessCountry,
        userId: id,
      });
    } else {
      businessProfile = await updateBusinessProfile(id, {
        name: businessName,
        country: businessCountry,
      });
    }

    return { data: { profile, businessProfile }, success: true };
  });

export const getUserAction = authenticationProcedure
  .createServerAction()
  .handler(async ({ ctx }) => {
    const { email } = ctx;
    const user = await getUserByEmail(email);

    return { success: true, data: user };
  });
