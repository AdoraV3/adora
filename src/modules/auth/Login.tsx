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
import { AuthSchemaType } from "@/validations/auth";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FloatingInput,
  FloatingLabel,
  PasswordInput,
  Shell,
} from "../commons/components";
import { PageHeader } from "./components/PageHeader";

export function Login() {
  const form = useForm<AuthSchemaType>({
    mode: "all",
    // resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<AuthSchemaType> = () => {};

  return (
    <Shell className="w-full mt-10">
      <div>
        <PageHeader className="mb-5" title="Welcome back" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem id="email" className="mb-5 relative">
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
              name="password"
              render={({ field }) => (
                <FormItem className="mt-10 ">
                  <FormControl>
                    <PasswordInput
                      id="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Link href="/forgot-password" className="text-primary">
              Forgot Password?
            </Link>

            <Button
              onClick={form.handleSubmit(onSubmit)}
              // isLoading={createAssetsHandler.isPending}
              className="mt-5 w-full"
              // isDisabled={phoneNumber.length < 12}
              id="submit"
            >
              Con
            </Button>
          </form>
        </Form>
        <div className=" text-center mt-2">
          <p className="font-satoshi text-base font-normal text-gray-750">
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
          <div className="relative flex justify-center font-satoshi text-lg font-normal ">
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
      </div>
    </Shell>
  );
}
