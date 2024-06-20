"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country } from "country-state-city";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileSchemaType, profileSchema } from "./validation";

export function Edit() {
  const countries = Country.getAllCountries().map(el => ({
    label: el.name,
    value: el.isoCode,
  }));
  const form = useForm<ProfileSchemaType>({
    mode: "all",
    resolver: zodResolver(profileSchema),
  });
  const onSubmit: SubmitHandler<ProfileSchemaType> = () => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-w-3xl bg-white-100 mt-20 grid md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem id="email" className="mb-5 relative">
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  First name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="border-none bg-gray-650"
                      placeholder="John"
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
            name="lastName"
            render={({ field }) => (
              <FormItem className="mb-5 relative">
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Last name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="border-none bg-gray-650"
                      placeholder="Doe"
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
            name="businessName"
            render={({ field }) => (
              <FormItem className="mb-5 relative">
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Business name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="border-none bg-gray-650"
                      placeholder="Stripe"
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
                  Country of residence
                </FormLabel>
                <Select
                  defaultValue={value}
                  onValueChange={data => {
                    onChange(data);
                  }}
                  value={value}
                >
                  <SelectTrigger className=" py-3 border-none text-black-100 focus-visible:border-none">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent sideOffset={5}>
                    <SelectGroup>
                      <SelectLabel>All Countries</SelectLabel>
                      {countries?.map(el => (
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
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessCountry"
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Business Country
                </FormLabel>
                <Select
                  defaultValue={value}
                  onValueChange={data => {
                    onChange(data);
                  }}
                  value={value}
                >
                  <SelectTrigger className=" py-3 border-none text-black-300 focus-visible:border-none">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent sideOffset={5}>
                    <SelectGroup>
                      <SelectLabel>All Countries</SelectLabel>
                      {countries?.map(el => (
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
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem id="phoneNumber" className="mb-5">
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Phone
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    // maxLength={phoneNumber.length < 13 ? 16 : 14}
                    // id="phoneNumber"
                    onChange={onChange}
                    className="border-none bg-gray-650"
                    placeholder="Phone Number"
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          className="mt-10 text-black-100 px-6 border border-input bg-gray-650"
          disabled
        >
          {" "}
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
