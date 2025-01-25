"use server";

import { getBusiness } from "@/data-access";
import { redirect } from "next/navigation";
import { getUser } from "./get-user";

export async function validateRequest() {
  const findUser = await getUser();

  if (!findUser) {
    redirect("/login");
  }
  const business = await getBusiness(findUser?.id);
  if (!business?.isProfileCompleted) {
    redirect("/profile");
  }
}
