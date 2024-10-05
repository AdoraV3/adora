"use client";

import { getGoogleOauthConsentUrl, signupAction } from "@/app/actions/auth";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
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

export function Register() {
  const form = useForm<RegisterSchemaType>({
    mode: "all",
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  // const { data: phones } = useServerActionQuery(getPhoneNumbersAction, {
  //   input: undefined,
  //   queryKey: ["getPhoneNumbers"],
  // });

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
    <Shell as="main" className="flex flex-col flex-1">
      <div className="h-[calc(95dvh-100px)] scrollbar-thin px-6 ">
        <PageHeader className="mb-10" title="Create an account" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem id="name" className="mb-6 relative">
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
                <FormItem id="email" className="mb-6 relative">
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
                <FormItem id="email" className="mb-6 relative">
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
        <div className="text-center mt-2">
          <p className="font-satoshi text-base font-normal text-black-100">
            Already have an account?
            <span>
              <Link href="/login" className="text-primary">
                {" "}
                Login
              </Link>
            </span>{" "}
          </p>
        </div>
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-400" />
          </div>
          <div className="relative flex justify-center font-satoshi  font-normal ">
            <span className="bg-white-100 text-sm font-normal font-satoshi px-2 uppercase text-muted-foreground">
              or
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            className="text-gray-2 font-medium text-lg "
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

        <div className=" divide-x  mt-6 divide-primary text-center">
          <Link
            className="text-primary pr-3 font-medium text-lg font-satoshi"
            href="/"
          >
            Terms of Use
          </Link>
          <Link
            className="text-primary font-medium pl-3 text-lg font-satoshi"
            href="/"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </Shell>
  );
}
