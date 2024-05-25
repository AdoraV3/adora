import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OtpSchemaType } from "@/validations/auth";
import { SubmitHandler, useForm } from "react-hook-form";

export default function VerifyOtp() {
  const form = useForm<OtpSchemaType>({
    mode: "all",
    // resolver: zodResolver(otpSchema),
  });

  const onSubmit: SubmitHandler<OtpSchemaType> = () => {};
  return (
    <main>
      <div>
        <h6 className="font-semibold text-2xl font-coreC text-black-100 md:text-4xl">
          Verify Email
        </h6>
        <p className="font-bold text-sm mt-2 font-satoshi">
          An Authentication code has been sent to{" "}
          <span className="text-primary">azeezat@email.com</span>
        </p>
      </div>

      <div className="mt-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sfPro text-sm font-normal text-black-400">
                    Enter Code
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      autoFocus
                      className="text-2xl font-bold"
                      maxLength={4}
                      {...field}
                      onChange={data => {
                        field.onChange(data);
                        form.clearErrors("otp");
                      }}
                      id="custom-input-id"
                    >
                      <InputOTPGroup className="gap-10">
                        {[0, 1, 2, 3, 4, 5].map(el => (
                          <InputOTPSlot
                            id={el?.toString()}
                            key={el}
                            index={el}
                            className={`bg-[hsla(240,20%,98%,1)]  text-2xl  font-bold text-[hsla(219,19%,15%,1)]  outline-none [appearance:textfield]
                           focus-visible:border focus-visible:border-blue-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
                           ${
                             form?.formState?.errors?.otp?.message
                               ? "border border-destructive focus-within:border focus-within:border-destructive "
                               : ""
                           } h-[60px] w-[69px] rounded-lg`}
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          </form>
        </Form>
        <p className="mt-10">
          Code Sent. Resend Code in{" "}
          <span className="text-primary"> 00:50 </span>
        </p>
      </div>
    </main>
  );
}
