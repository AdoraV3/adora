import { AccountPreferenceForm } from "./AccountPreferenceForm";
import { PageHeader } from "./PageHeader";

export function AccountPreferenceTab() {
  return (
    <section className="pt-10">
      <PageHeader
        title="Account preferences"
        subtitle="Control settings related to your account."
      />

      <div className="mt-6 ">
        <h6 className="font-medium mb-2 text-sm text-black-100 font-satoshi">
          Language & Region
        </h6>
        <p className="text-gray-2 font-normal font-satoshi text-sm">
          Update your language and timezone
        </p>
      </div>

      <AccountPreferenceForm />
    </section>
  );
}
