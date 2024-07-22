"use client";

import { sendResetPasswordEmailAction } from "@/app/actions/reset-token";
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
import VerifyOtp from "@/modules/auth/components/VerifyOtp";
import { Modal, PasswordInput } from "@/modules/commons/components";
import {
  ChangePasswordSchemaType,
  changePasswordSchema,
} from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export function ChangePassword() {
  const [showOTP, setShowOTP] = useState(false);
  const form = useForm<ChangePasswordSchemaType>({
    mode: "all",
    resolver: zodResolver(changePasswordSchema),
  });

  // const changePasswordHandler = useServerActionMutation(changePasswordAction, {
  //   onSuccess: () => {
  //     toast.success("Password changed successfully");
  //   },
  //   onError: error => toast.error(error?.message),
  // });

  const sendResetOTPHandler = useServerActionMutation(
    sendResetPasswordEmailAction,
    {
      onSuccess: () => {
        toast.success("Password OTP sent successfully!");
        setShowOTP(true);
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

      <Modal isOpen={showOTP} isOpenChange={setShowOTP}>
        <Modal.Content title="Change Password">
          <VerifyOtp />
          <Modal.Footer>Hi</Modal.Footer>
        </Modal.Content>
      </Modal>
    </Form>
  );
}
