"use server";

import { getBusiness } from "@/data-access";
import { Business } from "@/db/schema";
import { redirect } from "next/navigation";
import { getUser } from "./get-user";

type ActionWithBusinessFunction<T> = (
  formData: FormData,
  businessData: Business,
) => Promise<T>;

export async function withBusiness<T>(action: ActionWithBusinessFunction<T>) {
  return async (formData: FormData): Promise<T> => {
    const currentUser = await getUser();
    if (!currentUser) {
      redirect("/login?redirect_uri=/pricing");
    }
    const business = await getBusiness(currentUser?.id);
    if (!business) {
      redirect("/profile");
    }

    return action(formData, business);
  };
}
