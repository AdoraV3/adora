import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "@/mock";
import { DeleteAccount } from "./DeleteAccount";
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

      <div className="flex flex-col mt-6 max-w-sm gap-4">
        <div>
          <Label className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
            Language{" "}
          </Label>
          <Select>
            <SelectTrigger className="mt-1 py-3 border-none text-black-300 focus-visible:border-none">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent sideOffset={5}>
              <SelectGroup>
                <SelectLabel>All Countries</SelectLabel>
                {LANGUAGES?.map(el => (
                  <SelectItem
                    className="text-black-100 font-satoshi font-normal text-base"
                    key={el.value}
                    value={el.value}
                  >
                    {el.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
            Time zone
          </Label>
          <Select>
            <SelectTrigger className="mt-1 py-3 border-none text-black-300 focus-visible:border-none">
              <SelectValue placeholder="Timezone" />
            </SelectTrigger>
            <SelectContent sideOffset={5}>
              <SelectGroup>
                <SelectLabel>Time zone</SelectLabel>
                {LANGUAGES?.map(el => (
                  <SelectItem
                    className="text-black-100 font-satoshi font-normal text-base"
                    key={el.value}
                    value={el.value}
                  >
                    {el.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DeleteAccount />
    </section>
  );
}
