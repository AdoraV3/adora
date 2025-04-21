"use client";

import { getProfileAction } from "@/app/actions/agent";
import {
  createBusinessAction,
  updateBusinessAction,
} from "@/app/actions/business";
import { getPhoneNumbersAction } from "@/app/actions/phoneNumbers";
import { getCategoriesAction } from "@/app/actions/systemPrompt";
import { getVoicesAction } from "@/app/actions/voice";
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
import { formatPhoneNumber } from "@/modules/auth/helpers";
import { PhoneNumberInput } from "@/modules/commons/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country } from "country-state-city";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProfileSchemaType, profileSchema } from "./validation";

export function Edit() {
  const countries = Country.getAllCountries().map(el => ({
    label: el.name,
    value: el.isoCode,
  }));

  const router = useRouter();

  const { data, isPending } = useServerActionQuery(getProfileAction, {
    input: undefined,
    queryKey: ["getBusinessProfile"],
    refetchOnMount: false,
  });

  const profile = data?.profile;

  const updateProfileHandler = useServerActionMutation(updateBusinessAction, {
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: error => {
      toast.error(error?.message);
    },
  });

  const createProfileHandler = useServerActionMutation(createBusinessAction, {
    onSuccess: () => {
      toast.success("Profile created successfully");
      router.push("/pricing");
    },
    onError: error => {
      toast.error(error?.message);
    },
  });

  const { data: phones } = useServerActionQuery(getPhoneNumbersAction, {
    input: undefined,
    queryKey: ["getPhoneNumbers"],
  });

  const { data: voices } = useServerActionQuery(getVoicesAction, {
    input: undefined,
    queryKey: ["getVoices"],
  });

  const { data: categories } = useServerActionQuery(getCategoriesAction, {
    input: undefined,
    queryKey: ["getCategories"],
  });

  const form = useForm<ProfileSchemaType>({
    mode: "all",
    resolver: zodResolver(profileSchema),
  });

  const isProfileCompleted = data?.profile?.isProfileCompleted ?? false;

  const onSubmit: SubmitHandler<ProfileSchemaType> = values => {
    if (isProfileCompleted) {
      updateProfileHandler.mutate(values);
    } else {
      createProfileHandler.mutate(values);
    }
  };

  useEffect(() => {
    form.reset({
      businessCountry: profile?.businessCountry ?? "",
      businessName: profile?.businessName ?? "",
      country: profile?.country ?? "",
      phoneNumber: profile?.phoneNumber ?? "",
      name: profile?.name ?? "",
      agentName: profile?.agentName ?? "",
      category: profile?.category ?? "",
      businessPhoneNumber: profile?.businessPhoneNumber ?? "",
      voice: profile?.voice ?? "",
    });
  }, [form.reset, profile, form]);

  if (isPending) return <div>Loading...</div>;

  return (
    <Form {...form}>
      <form
        className="mt-20 flex max-w-3xl grid-cols-2 flex-col gap-y-6 bg-white-100 md:grid md:items-center md:gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem id="email" className="relative">
              <FormLabel className="font-satoshi text-base font-normal text-[hsla(0,0%,11%,0.8)]">
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
            <FormItem id="businessName" className="relative">
              <FormLabel className="font-satoshi text-base font-normal text-[hsla(0,0%,11%,0.8)]">
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
              <FormLabel className="font-satoshi text-base font-normal text-[hsla(0,0%,11%,0.8)]">
                Country of residence
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="border-none text-black-100 focus-visible:border-none">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent sideOffset={5}>
                  <SelectGroup>
                    <SelectLabel>All Countries</SelectLabel>
                    {countries?.map(el => (
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
          name="businessCountry"
          render={({ field }) => (
            <FormItem key={field.value}>
              <FormLabel className="font-satoshi text-base font-normal text-[hsla(0,0%,11%,0.8)]">
                Business Country
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="text-black-300 border-none focus-visible:border-none">
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
          name="businessPhoneNumber"
          render={({ field }) => (
            <FormItem id="phoneNumber">
              <div className="group relative" />
              <FormLabel className="font-satoshi text-base font-normal text-[hsla(0,0%,11%,0.8)]">
                Business Phone Number
              </FormLabel>
              <FormControl>
                <PhoneNumberInput
                  placeholder="Phone Number"
                  className="h-12 border-none bg-gray-650"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem key={field.value} id="category">
              <FormLabel className="font-satoshi text-base font-normal text-[hsla(0,0%,11%,0.8)]">
                Business Category
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className=" h-12 focus:border-primary ">
                    <SelectValue
                      placeholder="Category"
                      className="!text-[#8c8c8c40]"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent sideOffset={5}>
                  <SelectGroup>
                    <SelectLabel className="text-[#8c8c8c80]">
                      Select a business category
                    </SelectLabel>
                    {categories?.data?.map(el => (
                      <SelectItem
                        className="font-satoshi text-base font-normal text-[#8c8c8c]"
                        key={el.id}
                        value={el.id}
                      >
                        {el.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agentName"
          render={({ field }) => (
            <FormItem id="agentName">
              <FormLabel className="font-satoshi text-base font-normal text-[hsla(0,0%,11%,0.8)]">
                Agent Name
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="border-none bg-gray-650"
                    placeholder="Enter agent name"
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
          name="voice"
          render={({ field }) => (
            <FormItem key={field.value} id="voice" className="relative">
              <FormLabel className="font-satoshi text-base font-normal text-[hsla(0,0%,11%,0.8)]">
                Agent Voice
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className=" h-12 capitalize focus:border-primary ">
                    <SelectValue
                      placeholder="Select Voice"
                      className="!text-[#8c8c8c40]"
                    />
                  </SelectTrigger>
                  <SelectContent sideOffset={5}>
                    <SelectGroup>
                      <SelectLabel className="text-[#8c8c8c80]">
                        Select a voice
                      </SelectLabel>
                      {voices?.data?.map(el => (
                        <SelectItem
                          className="font-satoshi text-base font-normal capitalize text-[#8c8c8c]"
                          key={el.id}
                          value={el.id}
                        >
                          {el.gender}
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem key={field.value} id="phone" className="relative">
              <FormLabel className="font-satoshi text-base font-normal text-[hsla(0,0%,11%,0.8)]">
                Agent Phone
              </FormLabel>
              <FormControl>
                <Select
                  disabled={isProfileCompleted && !!field.value}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className=" h-12 focus:border-primary ">
                    <SelectValue
                      placeholder="Select Phone Number"
                      className="!text-[#8c8c8c40]"
                    />
                  </SelectTrigger>
                  <SelectContent sideOffset={5}>
                    <SelectGroup>
                      <SelectLabel className="text-[#8c8c8c80]">
                        Select an agent phone
                      </SelectLabel>
                      {phones?.data?.map(el => (
                        <SelectItem
                          className="font-satoshi text-base font-normal text-[#8c8c8c]"
                          key={el.id}
                          value={el.id}
                          disabled={el.isAssigned}
                        >
                          {formatPhoneNumber(el.phoneNumber)}
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

        <Button
          className="ma col-span-2 border border-input bg-brown-50 px-6 text-black-100 "
          onClick={form.handleSubmit(onSubmit)}
          isLoading={
            updateProfileHandler.isPending || createProfileHandler.isPending
          }
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
