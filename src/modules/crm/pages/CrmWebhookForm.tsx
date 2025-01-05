"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
      <h2 className="text-black-100 font-lg font-bold mb-2">
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
                  <div className="relative group focus:text-primary">
                    <FloatingInput
                      type="url"
                      placeholder="Enter webhook url"
                      {...field}
                    />
                    <FloatingLabel>Webhook url</FloatingLabel>
                  </div>
                </FormControl>
                <FormDescription className="font-normal text-[hsla(0,0%,11%,0.8)] text-sm">
                  Copy the generated Webhook URL from Make.com and paste it in
                  the field here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full mt-5" type="submit">
            Save
          </Button>
        </form>
      </Form>
    </section>
  );
}
