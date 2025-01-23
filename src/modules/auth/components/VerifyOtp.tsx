"use client";

import { verifyEmailAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
import { useOtpTimer } from "@/modules/commons/hooks/useOtpTimer";
import { useQueryParams } from "@/modules/commons/hooks/useQueryParams";
import { OtpSchemaType, otpSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function VerifyOtp() {
  const form = useForm<OtpSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(otpSchema),
  });
  const { timer, isOtpValid } = useOtpTimer();
  const router = useRouter();
  const { queryParams } = useQueryParams();
  const email = queryParams.get("email");
  const otp = queryParams.get("otp") ?? "";
  const verifyOtpHandler = useServerActionMutation(verifyEmailAction, {
    onSuccess: () => {
      toast.success("Email Verified Successfully", {
        description: "Please login again",
      });
      router.push("/login");
    },
    onError: error => {
      toast.error(error?.message);
    },
  });
  const onSubmit: SubmitHandler<OtpSchemaType> = data => {
    verifyOtpHandler.mutate({ otp: data.otp }, {});
  };

  useEffect(() => {
    form.reset({ otp });
  }, [otp, form]);

  return (
    <div className="flex flex-col items-center justify-between flex-1">
      <div className="text-center flex-1 flex flex-col gap-2">
        <h6 className="font-semibold text-4xl font-coreC text-black-100 md:text-4xl">
          Verify Email
        </h6>
        <div className="font-bold text-sm  font-satoshi">
          <p> An Authentication code has been sent to </p>
          <p className="text-primary">{email} </p>
        </div>
      </div>

      <Form {...form}>
        <form
          className="flex items-center px-6  flex-1 flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="my-10">
                <FormControl>
                  <InputOTP
                    autoFocus
                    className="text-4xl font-bold"
                    maxLength={4}
                    {...field}
                    onChange={data => {
                      field.onChange(data);
                      form.clearErrors("otp");
                    }}
                    id="custom-input-id"
                  >
                    <InputOTPGroup className="gap-5">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3">
            {isOtpValid ? (
              <p className=" text-center">
                Code Sent. Resend Code in{" "}
                <span className="text-primary"> {timer} </span>
              </p>
            ) : (
              <p className="font-sfPro  text-sm font-normal  text-[hsla(215,19%,35%,1)]">
                Didn’t receive code?{" "}
                <span>
                  <Button
                    type="button"
                    id="resendOtp"
                    isDisabled={isOtpValid}
                    variant="link"
                    className="px-0 underline"
                    // onClick={resendOtp}
                    // isLoading={handleRegisterPhone.isPending}
                  >
                    Resend Code{" "}
                  </Button>{" "}
                </span>{" "}
              </p>
            )}
          </div>

          <Button
            className="w-full mt-10"
            onClick={form.handleSubmit(onSubmit)}
            isLoading={verifyOtpHandler.isPending}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
