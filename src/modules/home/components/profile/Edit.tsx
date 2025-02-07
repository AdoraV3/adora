"use client";

import { getAgentWithVoiceAction } from "@/app/actions/agent";
import {
  createBusinessAction,
  getBusinessAction,
  updateBusinessAction,
} from "@/app/actions/business";
import { getPhoneNumbersAction } from "@/app/actions/phoneNumbers";
import { getCategoriesAction } from "@/app/actions/systemPrompt";
import { getUserAction } from "@/app/actions/user";
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
import {
  FloatingInput,
  FloatingLabel,
  PhoneNumberInput,
} from "@/modules/commons/components";
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
  const { data: agentData, isPending: loadingAgent } = useServerActionQuery(
    getAgentWithVoiceAction,
    {
      input: undefined,
      queryKey: ["getAgent"],
    },
  );

  const user = queryData?.data;

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

  // const { data: profile } = useServerActionQuery(getProfile, {
  //   input: undefined,
  //   queryKey: ["getCategories"],
  // });

  const form = useForm<ProfileSchemaType>({
    mode: "all",
    resolver: zodResolver(profileSchema),
  });
  const businessProfile = data?.data;

  const isProfileCompleted = businessProfile?.isProfileCompleted;

  const onSubmit: SubmitHandler<ProfileSchemaType> = values => {
    if (isProfileCompleted) {
      updateProfileHandler.mutate(values);
    } else {
      createProfileHandler.mutate(values);
    }
  };

  useEffect(() => {
    form.reset({
      businessCountry: businessProfile?.country ?? "",
      businessName: businessProfile?.name ?? "",
      country: user?.profile?.country ?? "",
      phoneNumber: agentData?.data?.phoneNumber?.phoneNumber ?? "",
      name: user?.profile?.name ?? "",
      agentName: agentData?.data?.name ?? "",
      category: agentData?.data?.categoryId ?? "",
      businessPhoneNumber: user?.profile?.phone ?? "",
      voice: agentData?.data?.voiceId ?? "test",
    });
  }, [
    form.reset,
    businessProfile?.name,
    businessProfile?.country,
    user?.profile?.country,
    user?.profile?.name,
    user?.profile?.phone,
    agentData?.data?.name,
    agentData?.data?.voiceId,
    agentData?.data?.phoneNumberId,
  ]);
  if (isPending || loadingUser || loadingAgent) return <div>Loading...</div>;

  return (
    <article className=" max-w-3xl w-full gap-10 flex flex-1 flex-col mt-20 bg-white-100">
      <Form {...form}>
        <form
          className="w-full grid gap-5 items-center md:grid-cols-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem id="email" className="relative">
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
              <FormItem id="businessName" className="relative">
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
                    <SelectTrigger className="border-none text-black-100 focus-visible:border-none">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent sideOffset={5}>
                    <SelectGroup>
                      <SelectLabel>All Countries</SelectLabel>
                      {countries?.map(el => (
                        <SelectItem
                          className="text-base font-normal text-black-100 font-satoshi"
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
                    <SelectTrigger className="border-none text-black-300 focus-visible:border-none">
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
                          className="text-base font-normal text-black-100 font-satoshi"
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
                <div className="relative group" />
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
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
                <FormControl>
                  <div className="relative">
                    <FloatingLabel className="bg-white-100 z-10">
                      Business Category
                    </FloatingLabel>
                    <Select
                      disabled={isProfileCompleted ?? false}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="h-12 bg-white border peer border-gray-550 focus:border-primary ">
                        <SelectValue
                          placeholder="Category"
                          className="!text-[#8c8c8c40]"
                        />
                      </SelectTrigger>
                      <SelectContent sideOffset={5}>
                        <SelectGroup>
                          <SelectLabel className="text-[#8c8c8c80]">
                            Select a business category
                          </SelectLabel>
                          {categories?.data?.map(el => (
                            <SelectItem
                              className="font-satoshi text-base font-normal text-[#8c8c8c]"
                              key={el.id ?? ""}
                              value={el.id ?? ""}
                            >
                              {el.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agentName"
            render={({ field }) => (
              <FormItem id="agentName">
                <FormControl>
                  <div className="relative">
                    <FloatingInput
                      className="h-12"
                      placeholder="Enter agent name"
                      {...field}
                    />
                    <FloatingLabel>Agent Name</FloatingLabel>
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
                <FormControl>
                  <div className="relative">
                    <FloatingLabel>Agent Voice</FloatingLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-12 capitalize border bg-white-100 peer border-gray-550 focus:border-primary ">
                        <SelectValue
                          placeholder="male"
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
                              className="font-satoshi capitalize text-base font-normal text-[#8c8c8c]"
                              key={el.id}
                              value={el.id}
                            >
                              {el.gender}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!isProfileCompleted && (
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem id="phone" className="relative">
                  <FormControl>
                    <div className="relative">
                      <FloatingLabel>Agent Phone</FloatingLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="h-12 bg-white border peer border-gray-550 focus:border-primary ">
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
                              >
                                {formatPhoneNumber(el.phoneNumber)}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </form>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="w-full mt-auto px-6 border ma bg-brown-50 text-black-100 border-input "
          isLoading={
            updateProfileHandler.isPending || createProfileHandler.isPending
          }
        >
          Save Changes
        </Button>
      </Form>
    </article>
  );
}
