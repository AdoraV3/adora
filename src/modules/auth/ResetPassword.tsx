"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  ResetPasswordSchemaType,
  resetPasswordSchema,
} from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { PasswordInput, Shell } from "../commons/components";
import { PageHeader } from "./components/PageHeader";

export function ResetPassword() {
  const form = useForm<ResetPasswordSchemaType>({
    mode: "all",
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordSchemaType> = () => {};

  return (
    <Shell className="w-full mt-10">
      <div>
        <PageHeader
          className="my-10"
          subtitle="Enter a new password below to change your password."
          title="Reset Password"
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem id="password" className="mb-5 relative">
                  <FormControl>
                    <PasswordInput
                      label="Password"
                      placeholder="Enter password"
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
                <FormItem className="mt-10 ">
                  <FormControl>
                    <PasswordInput
                      id="password"
                      placeholder="Enter confirm  password"
                      {...field}
                      label="Confirm Password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              onClick={form.handleSubmit(onSubmit)}
              // isLoading={createAssetsHandler.isPending}
              className="mt-10 w-full"
              // isDisabled={phoneNumber.length < 12}
              id="submit"
            >
              Reset password
            </Button>
          </form>
        </Form>
      </div>
    </Shell>
  );
}
