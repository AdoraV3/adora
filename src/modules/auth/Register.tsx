"use client";

import { getGoogleOauthConsentUrl, signupAction } from "@/app/actions/auth";
import { getPhoneNumbersAction } from "@/app/actions/phoneNumbers";
import { getVoicesAction } from "@/app/actions/voice";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { SYSTEM_PROMPTS } from "@/mock";
import { RegisterSchemaType, registerSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  FloatingInput,
  FloatingLabel,
  PasswordInput,
  Shell,
} from "../commons/components";
import { PageHeader } from "./components/PageHeader";
import { formatPhoneNumber } from "./helpers";

export function Register() {
  const form = useForm<RegisterSchemaType>({
    mode: "all",
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  const { data: phones } = useServerActionQuery(getPhoneNumbersAction, {
    input: undefined,
    queryKey: ["getPhoneNumbers"],
  });

  const { data: voices } = useServerActionQuery(getVoicesAction, {
    input: undefined,
    queryKey: ["getVoices"],
  });

  const [isPending, startTransition] = useTransition();
  const signUpHandler = useServerActionMutation(signupAction, {
    onSuccess: () => {
      toast.success("Account created successfully", {
        description: "We have sent you a code to verify your account.",
      });
      router.push(`/verify-email?email=${form.getValues("email")}`);
    },
    onError: error => {
      toast.error(error?.message);
    },
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = data => {
    signUpHandler.mutate(data);
  };

  const handleGoogleSignIn = () => {
    startTransition(async () => {
      const res = await getGoogleOauthConsentUrl();

      if (res.url) {
        window.location.href = res.url;
      }
    });
  };

  return (
    <Shell as="main" className="flex flex-1 flex-col">
      <div className="mx-auto h-[calc(95dvh-100px)] w-[95%] px-6 scrollbar-thin">
        <PageHeader className="mb-10" title="Create an account" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem id="name" className="relative mb-6">
                  <FormControl>
                    <div className="relative">
                      <FloatingInput placeholder="John Doe" {...field} />
                      <FloatingLabel>Full Name</FloatingLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem id="email" className="relative mb-6">
                  <FormControl>
                    <div className="relative">
                      <FloatingInput placeholder="john@doe.com" {...field} />
                      <FloatingLabel>Email address</FloatingLabel>
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
                <FormItem id="email" className="relative mb-6">
                  <FormControl>
                    <div className="relative">
                      <FloatingInput placeholder="Paystack" {...field} />
                      <FloatingLabel>Business Name</FloatingLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem id="email" className="relative mb-6">
                  <FormControl>
                    <div className="relative">
                      <FloatingLabel>Business Category</FloatingLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="bg-white peer mt-1 h-14 border border-gray-550 py-3 focus:border-primary ">
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
                            {SYSTEM_PROMPTS?.map(el => (
                              <SelectItem
                                className="font-satoshi text-base font-normal text-[#8c8c8c]"
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="locationRegion"
              render={({ field }) => (
                <FormItem id="location" className="relative mb-6">
                  <FormControl>
                    <div className="relative">
                      <FloatingInput placeholder="Europe" {...field} />
                      <FloatingLabel>Location Region</FloatingLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="agentName"
              render={({ field }) => (
                <FormItem id="agentName" className="relative mb-6">
                  <FormControl>
                    <div className="relative">
                      <FloatingInput placeholder="007" {...field} />
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
                <FormItem id="voice" className="relative mb-6">
                  <FormControl>
                    <div className="relative">
                      <FloatingLabel>Agent Voice</FloatingLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="bg-white-100 capitalize peer mt-1 h-14 border border-gray-550 py-3 focus:border-primary ">
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
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem id="phone" className="relative mb-6">
                  <FormControl>
                    <div className="relative">
                      <FloatingLabel>Agent Phone</FloatingLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="bg-white peer mt-1 h-14 border border-gray-550 py-3 focus:border-primary ">
                          <SelectValue
                            placeholder="000 111 222"
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-6 ">
                  <FormControl>
                    <PasswordInput
                      id="password"
                      placeholder="Enter password"
                      label="Password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mb-6 ">
                  <FormControl>
                    <PasswordInput
                      id="password"
                      label="Confirm Password"
                      placeholder="Enter confirm password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              onClick={form.handleSubmit(onSubmit)}
              isLoading={signUpHandler.isPending}
              className="mt-5 w-full"
              // isDisabled={phoneNumber.length < 12}
              id="submit"
            >
              Sign Up
            </Button>
          </form>
        </Form>
        <div className="mt-2 text-center">
          <p className="font-satoshi text-base font-normal text-black-100">
            Already have an account?
            <Link href="/login" className="text-primary">
              {" "}
              Login
            </Link>
          </p>
        </div>
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-400" />
          </div>
          <div className="relative flex justify-center font-satoshi  font-normal ">
            <span className="bg-white-100 px-2 font-satoshi text-sm font-normal uppercase text-muted-foreground">
              or
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            className="text-lg font-medium text-gray-2 "
            variant="outline"
            icon={<Icons.Google />}
            onClick={handleGoogleSignIn}
            isLoading={isPending}
          >
            Continue with Google{" "}
          </Button>
          {/* <Button
            className="text-gray-2 font-medium text-lg "
            variant="outline"
            icon={<Icons.Apple />}
          >
            Continue with Apple{" "}
          </Button> */}
        </div>

        <div className=" mt-6  divide-x divide-primary text-center">
          <Link
            className="pr-3 font-satoshi text-lg font-medium text-primary"
            href="/"
          >
            Terms of Use
          </Link>
          <Link
            className="pl-3 font-satoshi text-lg font-medium text-primary"
            href="/"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </Shell>
  );
}
