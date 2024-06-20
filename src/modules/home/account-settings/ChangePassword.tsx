"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/modules/commons/components";
import {
  ChangePasswordSchemaType,
  changePasswordSchema,
} from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export function ChangePassword() {
  const form = useForm<ChangePasswordSchemaType>({
    mode: "all",
    resolver: zodResolver(changePasswordSchema),
  });
  const onSubmit: SubmitHandler<ChangePasswordSchemaType> = () => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" bg-white-100 mt-10 grid max-w-md ">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem id="email" className="mb-3 relative">
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Old Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <PasswordInput
                      className="border-none bg-gray-650"
                      placeholder="Enter old password"
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
            name="password"
            render={({ field }) => (
              <FormItem className="mb-3 relative">
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <PasswordInput
                      className="border-none bg-gray-650"
                      placeholder="Enter new password"
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-3 relative">
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Repeat new password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <PasswordInput
                      className="border-none bg-gray-650"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          className="mt-10 text-black-100 px-6 border border-input bg-gray-650"
          disabled
        >
          Change Password
        </Button>
      </form>
    </Form>
  );
}
