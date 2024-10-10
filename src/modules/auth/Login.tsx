"use client";

import { getGoogleOauthConsentUrl, loginInAction } from "@/app/actions/auth";
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
import { AuthSchemaType, authSchema } from "@/validations/auth";
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
import { useQueryParams } from "../commons/hooks/useQueryParams";
import { PageHeader } from "./components/PageHeader";

export function Login() {
  const form = useForm<AuthSchemaType>({
    mode: "all",
    resolver: zodResolver(authSchema),
  });

  const { queryParams, createQueryStrings } = useQueryParams();
  const from = queryParams.get("from");

  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const loginHandler = useServerActionMutation(loginInAction, {
    onSuccess: () => {
      if (from) {
        const redirectUrl = decodeURIComponent(from);
        router.push(
          `${redirectUrl}?${createQueryStrings({
            prefilled_email: form.getValues("email"),
          })}`,
        );
        return;
      }
      router.push("/home");
      toast.success("Login successful");
    },
    onError: error => {
      toast.error(error?.message);
    },
  });

  const onSubmit: SubmitHandler<AuthSchemaType> = data => {
    loginHandler.mutate(data);
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
    <Shell as="main" className="flex w-full flex-col flex-1">
      <div className="flex flex-col flex-1 gap-5 px-6 w-[95%] sm:w-full mx-auto">
        <PageHeader className="mb-2" title="Welcome back" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem id="email" className="mb-5 relative">
                  <FormControl>
                    <div className="relative group focus:text-primary">
                      <FloatingInput
                        className="group-focus:text-primary"
                        placeholder="john@doe.com"
                        {...field}
                      />
                      <FloatingLabel className="group-focus:text-primary">
                        Email address
                      </FloatingLabel>
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
                <FormItem className="mt-10 mb-2 ">
                  <FormControl>
                    <PasswordInput
                      id="password"
                      label="Password"
                      placeholder="Enter  password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Link
              href="/forgot-password"
              className="text-primary font-medium text-base  mt-4 font-satoshi"
            >
              Forgot Password?
            </Link>

            <Button
              onClick={form.handleSubmit(onSubmit)}
              isLoading={loginHandler.isPending}
              className="mt-5 w-full"
              // isDisabled={phoneNumber.length < 12}
              id="submit"
            >
              Login
            </Button>
          </form>
        </Form>
        <div className=" text-center">
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
          <Button
            onClick={handleGoogleSignIn}
            className="text-gray-2 font-medium text-lg "
            variant="outline"
            icon={<Icons.Google />}
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
