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
    <Form {...form}>
      <form>
        <div className="grid gap-5 items-center md:grid-col-2">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem className=" col-span-2 relative">
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Agent Number
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="bg-white-100   !border border-[hsla(0,0%,91%,1)] "
                      placeholder="Agent Number"
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
            name="country"
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Voice
                </FormLabel>
                <Select
                  disabled
                  defaultValue={value}
                  onValueChange={data => {
                    onChange(data);
                  }}
                  value={value}
                >
                  <SelectTrigger className=" py-3 border bg-white-100 text-[#575757] focus-visible:border-none">
                    <SelectValue placeholder="Voice" />
                  </SelectTrigger>
                  <SelectContent sideOffset={5}>
                    <SelectGroup>
                      <SelectLabel>Voice</SelectLabel>
                      {VOICES?.map(el => (
                        <SelectItem
                          className="text-[#575757] font-satoshi font-normal text-base"
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
            name="language"
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Language
                </FormLabel>
                <Select
                  defaultValue={value}
                  onValueChange={data => {
                    onChange(data);
                  }}
                  value={value}
                  disabled
                >
                  <SelectTrigger className=" py-3 border bg-white-100 text-[#575757] focus-visible:border-none">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent sideOffset={5}>
                    <SelectGroup>
                      <SelectLabel>Language</SelectLabel>
                      {LANGUAGES?.map(el => (
                        <SelectItem
                          className="text-[#575757] font-satoshi font-normal text-base"
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
        </div>
      </form>
    </Form>
  );
}
