"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RegisterSchemaType } from "@/validations/auth";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
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
    // resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = () => {};

  return (
    <Shell className="w-full mt-10">
      <ScrollArea className="h-[calc(95dvh-100px)] px-6 ">
        <PageHeader className="mb-10" title="Create an account" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="fullName"
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
              name="password"
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
              // isLoading={createAssetsHandler.isPending}
              className="mt-5 w-full"
              // isDisabled={phoneNumber.length < 12}
              id="submit"
            >
              Sign Up
            </Button>
          </form>
        </Form>
        <div className=" text-center mt-2">
          <p className="font-sfPro text-base font-normal text-gray-750">
            Don’t have an account?
            <span>
              <Link href="/register" className="text-primary">
                {" "}
                Sign Up{" "}
              </Link>
            </span>{" "}
          </p>
        </div>
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-400" />
          </div>
          <div className="relative flex justify-center font-sfPro text-lg font-normal ">
            <span className="bg-white-100 px-2 uppercase text-muted-foreground">
              or
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="outline" icon={<Icons.Google />}>
            Continue with Google{" "}
          </Button>
          <Button variant="outline" icon={<Icons.Apple />}>
            Continue with Apple{" "}
          </Button>
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
      </ScrollArea>
    </Shell>
  );
}
