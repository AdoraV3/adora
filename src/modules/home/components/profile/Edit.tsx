"use client";

import { getBusinessAction } from "@/app/actions/business";
import { getUserAction, updateUserProfileAction } from "@/app/actions/user";
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
import { PhoneInput } from "@/modules/commons/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country } from "country-state-city";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProfileSchemaType, profileSchema } from "./validation";

export function Edit() {
  const countries = Country.getAllCountries().map(el => ({
    label: el.name,
    value: el.isoCode,
  }));

  const { data, isPending } = useServerActionQuery(getBusinessAction, {
    input: undefined,
    queryKey: ["getBusinessProfile"],
  });

  const { data: queryData, isPending: loadingUser } = useServerActionQuery(
    getUserAction,
    {
      input: undefined,
      queryKey: ["getUser"],
    },
  );

  const user = queryData?.data;

  const updateProfileHandler = useServerActionMutation(
    updateUserProfileAction,
    {
      onSuccess: () => {
        toast.success("Profile updated successfully");
      },
      onError: error => {
        toast.error(error?.message);
      },
    },
  );
  const form = useForm<ProfileSchemaType>({
    mode: "all",
    resolver: zodResolver(profileSchema),
  });

  const onSubmit: SubmitHandler<ProfileSchemaType> = values => {
    updateProfileHandler.mutate(values);
  };

  const businessProfile = data?.data;

  useEffect(() => {
    form.reset({
      businessCountry: businessProfile?.country ?? "",
      businessName: businessProfile?.name ?? "",
      country: user?.profile?.country ?? "",
      phoneNumber: user?.profile?.phone ?? "",
      name: user?.profile?.name ?? "",
    });
  }, [
    form,
    businessProfile?.name,
    businessProfile?.country,
    user?.profile?.country,
    user?.profile?.name,
    user?.profile?.phone,
  ]);

  if (isPending || loadingUser) return <div>Loading...</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="max-w-3xl bg-white-100 mt-20 grid md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem id="email" className="mb-5 relative">
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Full Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="border-none bg-gray-650"
                      placeholder="John Doe"
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
              <FormItem key={field.value} className="mb-5 relative">
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
            render={({ field }) => (
              <FormItem key={field.value}>
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Country of residence
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className=" py-3 border-none text-black-100 focus-visible:border-none">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                  </FormControl>
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
            render={({ field }) => (
              <FormItem key={field.value}>
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Business Country
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className=" py-3 border-none text-black-300 focus-visible:border-none">
                      <SelectValue
                        placeholder="Country"
                        aria-label={field.value}
                      />
                    </SelectTrigger>
                  </FormControl>
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
            render={({ field }) => (
              <FormItem key={field.value} id="phoneNumber" className="mb-5">
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Business Phone Number
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    id="phoneNumber"
                    className="border-none bg-gray-650"
                    placeholder="Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          className="mt-10 bg-brown-50 text-black-100 px-6 border border-input "
          onClick={form.handleSubmit(onSubmit)}
          isLoading={updateProfileHandler.isPending}
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
