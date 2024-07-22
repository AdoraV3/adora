"use client";

import { getUserAction } from "@/app/actions/user";
import { Icons } from "@/components/icons";
import { useServerActionQuery } from "@/lib/hooks/server-action-hooks";

export function Email() {
  const { data: queryData } = useServerActionQuery(getUserAction, {
    input: undefined,
    queryKey: ["getUser"],
  });

  const user = queryData?.data;

  return (
    <div className="max-w-lg">
      <h3 className="font-medium text-lg my-10 font-satoshi text-black-100">
        Email{" "}
      </h3>

      <div className="mb-10">
        <h6 className="text-black-100 font-medium text-sm mb-2 font-satoshi">
          Current email
        </h6>
        <p className="text-gray-2 font-satoshi font-normal text-xs">
          Your current email address is{" "}
          <span className="font-medium">{user?.email} </span>
        </p>
      </div>
      {user?.account?.type === "google" && (
        <div>
          <div className="flex items-center gap-2">
            <Icons.Google />
            <p className="font-normal text-gray-2 text-xs font-satoshi">
              Log in with Google enabled
            </p>
          </div>

          <div className="bg-brown-50 my-10 rounded-[2px] p-6">
            <div className="flex gap-4">
              <Icons.Warning className="h-6 w-6" />
              <div>
                <h6 className="text-black-100 font-medium text-sm mb-2 font-satoshi">
                  Connected account
                </h6>
                <p className="font-satoshi text-gray-2 font-normal">
                  Your account is connected to a Google account.
                  {/* Changing the email
              address here will disconnect your account from the Google account. */}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <h6 className="text-black-100 mb-3 font-medium text-sm font-satoshi">
          Email notifications
        </h6>
        <p className="text-sm text-gray-2 font-normal font-satoshi">
          To manage marketing emails, visit the{" "}
          <span className="text-blue-100"> email preferences center.</span>
          center.
        </p>
        {/* <p>To manage product emails, visit product settings.</p> */}
      </div>
    </div>
  );
}
