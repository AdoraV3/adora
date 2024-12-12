import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES, VOICES } from "@/mock";
import { useForm } from "react-hook-form";

export default function AgentDetails() {
  const form = useForm();
  return (
    <div className="border border-[#8E8E9320]  p-4 rounded-md shadow-lg">
      <h2 className="mb-4 text-black text-xl">Fill in the AI Agent Information</h2>
      <Form {...form}>
        <form>
          <div className="md:grid-col-2 grid items-center gap-5">
            <FormField
              control={form.control}
              name="businessProvince"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel className="font-satoshi text-base font-normal text-[hsla(0,0%,11%,0.8)]">
                    Business Province
                  </FormLabel>
                  <Select
                    disabled
                    defaultValue={value}
                    onValueChange={data => {
                      onChange(data);
                    }}
                    value={value}
                  >
                    <SelectTrigger className=" border border-[#8E8E93] bg-white-100 py-3 text-black-100">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent sideOffset={5}>
                      <SelectGroup>
                        {VOICES?.map(el => (
                          <SelectItem
                            className="font-satoshi text-base font-normal text-black-100"
                            key={el.value}
                            value={el.value}
                          >
                            {el.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessPhone"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="font-satoshi text-base font-normal text-[hsla(0,0%,11%,0.8)]">
                    Business Phone Number
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="!border border-[#8E8E93] bg-white-100"
                        placeholder=""
                        disabled
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aiVoice"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel className="font-satoshi text-base font-normal text-[hsla(0,0%,11%,0.8)]">
                    AI Voice
                  </FormLabel>
                  <Select
                    disabled
                    defaultValue={value}
                    onValueChange={data => {
                      onChange(data);
                    }}
                    value={value}
                  >
                    <SelectTrigger className=" border border-[#8E8E93] bg-white-100 py-3 text-black-100">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent sideOffset={5}>
                      <SelectGroup>
                        <SelectLabel>Voice</SelectLabel>
                        {VOICES?.map(el => (
                          <SelectItem
                            className="font-satoshi text-base font-normal text-black-100"
                            key={el.value}
                            value={el.value}
                          >
                            {el.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aiPhone"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel className="font-satoshi text-base font-normal text-[hsla(0,0%,11%,0.8)]">
                    AI Phone Number
                  </FormLabel>
                  <Select
                    defaultValue={value}
                    onValueChange={data => {
                      onChange(data);
                    }}
                    value={value}
                    disabled
                  >
                    <SelectTrigger className=" border border-[#8E8E93] bg-white-100 py-3 text-black-100">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent sideOffset={5}>
                      <SelectGroup>
                        <SelectLabel>Language</SelectLabel>
                        {LANGUAGES?.map(el => (
                          <SelectItem
                            className="font-satoshi text-base font-normal text-black-100"
                            key={el.value}
                            value={el.value}
                          >
                            {el.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aiName"
              render={({ field }) => (
                <FormItem className=" relative col-span-2">
                  <FormLabel className="font-satoshi text-base font-normal text-[hsla(0,0%,11%,0.8)]">
                    AI Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="!border border-[#8E8E93] bg-white-100"
                        placeholder=""
                        disabled
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
