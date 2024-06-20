import Link from "next/link";
import { ChangePassword } from "./ChangePassword";
import { PageHeader } from "./PageHeader";

export function SecurityTab() {
  return (
    <div className="pt-10">
      <div>
        <PageHeader title="Change password" />
        <p className="font-normal text-sm font-satoshi text-gray-2">
          Forgot or never set up your password?{" "}
          <Link href="/reset" className="text-blue-200">
            Request a new password here
          </Link>{" "}
        </p>
      </div>

      <ChangePassword />
    </div>
  );
}
