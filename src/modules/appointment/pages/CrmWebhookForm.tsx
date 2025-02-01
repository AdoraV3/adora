"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FloatingInput, FloatingLabel } from "@/modules/commons/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { WebhookFormSchemaType, webhookFormSchema } from "../schema";

export function CrmWebhookForm() {
  const form = useForm<WebhookFormSchemaType>({
    mode: "onChange",
    resolver: zodResolver(webhookFormSchema),
  });

  const onSubmit: SubmitHandler<WebhookFormSchemaType> = () => {};
  return (
    <section>
      <h2 className="font-lg mb-2 font-bold text-black-100">
        Paste Webhook URL
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="group relative focus:text-primary">
                    <FloatingInput
                      type="url"
                      placeholder="Enter webhook url"
                      {...field}
                    />
                    <FloatingLabel>Webhook url</FloatingLabel>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mx-auto mt-5 flex w-[80%] flex-row items-center justify-between">
            <Button
              className="mt-5 w-[48%] border border-[#DDE4F0] bg-[#FDFAFF] text-[#653716]"
              type="submit"
            >
              Close
            </Button>
            <Button className="mt-5 w-[48%] bg-[#653716]" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
