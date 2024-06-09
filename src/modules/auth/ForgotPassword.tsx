"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { EmailSchemaType } from "@/validations/auth";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { FloatingInput, FloatingLabel, Shell } from "../commons/components";
import { PageHeader } from "./components/PageHeader";

export function ForgotPassword() {
  const form = useForm<EmailSchemaType>({
    mode: "all",
    // resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const onSubmit: SubmitHandler<EmailSchemaType> = () => {
    router.push("/reset-password");
  };

  return (
    <Shell className="w-full mt-10">
      <div>
        <PageHeader
          className="my-20"
          subtitle="Enter your email address and we will send you instructions to reset your password."
          title="Reset Password"
        />
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

            <Button
              onClick={form.handleSubmit(onSubmit)}
              // isLoading={createAssetsHandler.isPending}
              className="mt-5 w-full"
              // isDisabled={phoneNumber.length < 12}
              id="submit"
            >
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </Shell>
  );
}
