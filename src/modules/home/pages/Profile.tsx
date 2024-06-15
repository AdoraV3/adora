import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit } from "../components/profile/Edit";

export function Profile() {
  return (
    <div className="py-5">
      <div className="flex gap-3 items-center">
        <Avatar className="size-15">
          <AvatarFallback>NT </AvatarFallback>
          <AvatarImage src="" alt="" />
        </Avatar>
        <div>
          <h6 className="font-medium text-lg text-gray-2 font-satoshi">
            Alex Meian
          </h6>
          <p className="font-satoshi font-normal text-sm gray-550">
            alex@gmail.com
          </p>
        </div>
      </div>

      <Edit />
    </div>
  );
}
