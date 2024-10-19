"use client";

import { logOutAction } from "@/app/actions";
import {
  changePasswordAction,
  sendResetPasswordEmailAction,
} from "@/app/actions/reset-token";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
import { PasswordInput } from "@/modules/commons/components";
import {
  ChangePasswordSchemaType,
  changePasswordSchema,
} from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { VerifyOtpModal } from "./VerifyOtpModal";

export function ChangePassword() {
  const [showOTP, setShowOTP] = useState(false);
  const form = useForm<ChangePasswordSchemaType>({
    mode: "all",
    resolver: zodResolver(changePasswordSchema),
  });

  const logOutHandler = useServerActionMutation(logOutAction, {});

  const changePasswordHandler = useServerActionMutation(changePasswordAction, {
    onSuccess: () => {
      toast.success("Password changed successfully!", {
        description: "Please login again with your new password",
      });
      setShowOTP(!showOTP);
      form.reset({
        oldPassword: "",
        password: "",
        confirmPassword: "",
      });
      logOutHandler.mutate(undefined);
    },
    onError: error => toast.error(error?.message),
  });

  const changePassword = (otp: string) => {
    if (!otp) return;
    changePasswordHandler.mutate({ ...form.getValues(), token: otp });
  };

  const sendResetOTPHandler = useServerActionMutation(
    sendResetPasswordEmailAction,
    {
      onSuccess: () => {
        toast.success("Password OTP sent successfully!");
        setShowOTP(!showOTP);
      },
      onError: error => toast.error(error?.message),
    },
  );
  const onSubmit: SubmitHandler<ChangePasswordSchemaType> = () => {
    sendResetOTPHandler.mutate(undefined);
  };

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
          isLoading={sendResetOTPHandler.isPending}
          onClick={form.handleSubmit(onSubmit)}
          className="mt-10 text-black-100 px-6 border border-input bg-gray-650"
        >
          Change Password
        </Button>
      </form>

      <VerifyOtpModal
        isOpen={showOTP}
        onClose={() => setShowOTP(!showOTP)}
        isLoading={changePasswordHandler.isPending}
        onSubmit={changePassword}
      />
    </Form>
  );
}
