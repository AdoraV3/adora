import { redirect } from "next/navigation";
import { toast } from "sonner";
import { createServerActionProcedure } from "zsa";
import { getUser } from "./get-user";

export const authenticationProcedure = createServerActionProcedure().handler(
  async () => {
    const user = await getUser();
    if (!user) {
      toast.error("Please login to continue");
      redirect("/login");
    }

    return { email: user.email, id: user.id };
  },
);
