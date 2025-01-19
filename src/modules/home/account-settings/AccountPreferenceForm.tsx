"use client";

import {
  createAccountPreferenceAction,
  getAccountPreferenceAction,
} from "@/app/actions/accountPreference";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useServerActionMutation,
  useServerActionQuery,
} from "@/lib/hooks/server-action-hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country } from "country-state-city";
import { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { AccountPreferenceSchemaType, accountPreferenceSchema } from "./schema";

export function AccountPreferenceForm() {
  const form = useForm<AccountPreferenceSchemaType>({
    mode: "onChange",
    resolver: zodResolver(accountPreferenceSchema),
  });

  const { data: accountPreference } = useServerActionQuery(
    getAccountPreferenceAction,
    {
      input: undefined,
      queryKey: ["getAccountPreference"],
    },
  );

  const updateAccountPreferenceHandler = useServerActionMutation(
    createAccountPreferenceAction,
    {
      onSuccess: () => toast.error("Account preference updated successfully"),
      onError: error => {
        toast.error(error?.message);
      },
    },
  );
  const timezones = Intl.supportedValuesOf("timeZone");

  const countries = Country.getAllCountries();

  const formattedTimezones = useMemo(() => {
    return timezones
      .map(timezone => {
        const formatter = new Intl.DateTimeFormat("en", {
          timeZone: timezone,
          timeZoneName: "shortOffset",
        });
        const parts = formatter.formatToParts(new Date());
        const offset =
          parts.find(part => part.type === "timeZoneName")?.value || "";
        const modifiedOffset = offset === "GMT" ? "GMT+0" : offset;

        return {
          value: timezone,
          label: `(${modifiedOffset}) ${timezone.replace(/_/g, " ")}`,
          numericOffset: parseInt(
            offset.replace("GMT", "").replace("+", "") || "0",
            10,
          ),
        };
      })
      .sort((a, b) => a.numericOffset - b.numericOffset);
  }, [timezones]);

  const onSubmit: SubmitHandler<AccountPreferenceSchemaType> = data => {
    updateAccountPreferenceHandler.mutate(data);
  };

  useEffect(() => {
    if (accountPreference?.data) {
      form.reset({
        country: accountPreference?.data?.country || "",
        timezone: accountPreference?.data?.timezone || "",
      });
    }
  }, [accountPreference?.data, form.reset]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col mt-6 max-w-sm gap-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem key={field.value}>
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Country
                </FormLabel>

                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="mt-1 py-3 border-none text-black-300 focus-visible:border-none">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent sideOffset={5}>
                      <SelectGroup>
                        <SelectLabel>All Countries</SelectLabel>
                        {countries?.map(el => (
                          <SelectItem
                            className="text-black-100 font-satoshi font-normal text-base"
                            key={el.name}
                            value={el.name}
                          >
                            {el.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem key={field.value}>
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Time zone
                </FormLabel>

                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger id="select-30">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {formattedTimezones.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          isLoading={updateAccountPreferenceHandler.isPending}
          type="submit"
          className="mt-10 text-black-100 px-6 border border-input bg-gray-650"
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
