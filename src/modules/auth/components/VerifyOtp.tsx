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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
import { useOtpTimer } from "@/modules/commons/hooks/useOtpTimer";
import { useQueryParams } from "@/modules/commons/hooks/useQueryParams";
import { OtpSchemaType, otpSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function VerifyOtp() {
  const form = useForm<OtpSchemaType>({
    mode: "all",
    resolver: zodResolver(otpSchema),
  });
  const { timer, isOtpValid } = useOtpTimer();
  const router = useRouter();
  const { queryParams } = useQueryParams();
  const email = queryParams.get("email");
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
    verifyOtpHandler.mutate({ otp: data.otp });
  };

  return (
    <ScrollArea className="h-[calc(95dvh-100px)] mt-20">
      <div className="text-center">
        <h6 className="font-semibold text-4xl font-coreC text-black-100 md:text-4xl">
          Verify Email
        </h6>
        <p className="font-bold text-sm mt-2 font-satoshi">
          An Authentication code has been sent to{" "}
          <span className="text-primary">{email} </span>
        </p>
      </div>

      <div className="mt-20 flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
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
                      <InputOTPGroup className="gap-10">
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
            <div className="flex mt-10 flex-col gap-3">
              {isOtpValid ? (
                <p className="mt-10 text-center">
                  Code Sent. Resend Code in{" "}
                  <span className="text-primary"> {timer} </span>
                </p>
              ) : (
                <p className="font-sfPro  text-sm font-normal  text-[hsla(215,19%,35%,1)]">
                  Didn’t receive code?{" "}
                  <span>
                    <Button
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
    </ScrollArea>
  );
}
