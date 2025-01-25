"use client";

import { getUserAction } from "@/app/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useServerActionQuery } from "@/lib/hooks/server-action-hooks";
import { getInitials } from "@/modules/commons/utils/helpers";
import { BusinessSetupModal } from "@/modules/dashboard/components/BusinessSetUpModal";
import { useDisclosure } from "@/modules/commons/hooks/useDisclosure";
import { Edit } from "../components/profile/Edit";

export function Profile() {
  const disclosure = useDisclosure();
  const { data: queryData } = useServerActionQuery(getUserAction, {
    input: undefined,
    queryKey: ["getUser"],
  });

  const user = queryData?.data;
  return (
    <div className="py-5">
      <div className="flex gap-3 items-center">
        <Avatar className="size-15">
          <AvatarFallback>
            {getInitials(user?.profile?.name ?? "")}{" "}
          </AvatarFallback>
          <AvatarImage src={user?.profile?.avatar ?? ""} alt="" />
        </Avatar>
        <div>
          <h6 className="font-medium text-lg text-gray-2 font-satoshi">
            {user?.profile?.name}
          </h6>
          <p className="font-satoshi font-normal text-sm gray-550">
            {user?.email}
          </p>
        </div>
      </div>

      <Edit />

      <BusinessSetupModal {...disclosure} />
    </div>
  );
}
