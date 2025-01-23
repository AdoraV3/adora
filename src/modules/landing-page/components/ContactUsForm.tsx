"use client";

import { sendContactUsAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
import { PhoneNumberInput } from "@/modules/commons/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ContactUsSchemaType, contactUsSchema } from "../validation";

export function ContactUsForm() {
  const form = useForm<ContactUsSchemaType>({
    mode: "all",
    resolver: zodResolver(contactUsSchema),
  });

  const contactUsHandler = useServerActionMutation(sendContactUsAction, {
    onSuccess: () => {
      toast.success("Your enquiry has ben sent successfully!");
      form.reset({
        fullName: "",
        businessName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    },
    onError: error => {
      toast.error(error?.message);
    },
  });

  const onSubmit: SubmitHandler<ContactUsSchemaType> = data => {
    contactUsHandler.mutate(data);
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col mt-auto flex-1"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid  md:grid-cols-2 items-center gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Full name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Full name"
                    className="border-[hsla(0,0%,91%,1)] border"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem className="cols-span-2">
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Business Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-[hsla(0,0%,91%,1)] border"
                    placeholder="Business name"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    className="border-[hsla(0,0%,91%,1)] border"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem id="phoneNumber" className="mb-5 col-span-2">
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Phone
                </FormLabel>
                <FormControl>
                  <PhoneNumberInput
                    className="bg-white-100 border-[hsla(0,0%,91%,1)]  border"
                    placeholder="Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Message"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button isLoading={contactUsHandler.isPending} className="w-full mt-10">
          Submit{" "}
        </Button>
      </form>
    </Form>
  );
}
