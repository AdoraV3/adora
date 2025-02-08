"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FloatingInput } from "@/modules/commons/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { WebhookFormSchemaType, webhookFormSchema } from "../schema";

export function CrmWebhookForm({ setstage }: any) {
  const form = useForm<WebhookFormSchemaType>({
    mode: "onChange",
    resolver: zodResolver(webhookFormSchema),
  });

  const onSubmit: SubmitHandler<WebhookFormSchemaType> = () => {};
  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="group relative focus:text-primary">
                    <p className="mb-2 text-left font-light text-[#00000090]">
                      Webhook URL
                    </p>
                    <FloatingInput
                      type="url"
                      placeholder="Paste"
                      {...field}
                      className="border-[1px] border-[#8c8c8c] bg-[#ffffff]"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mx-auto mt-5 flex w-[80%] flex-row items-center justify-between">
            <Button
              onClick={() => setstage(1)}
              className="mt-5 w-[48%] border border-[#DDE4F060] bg-[#FDFAFF] text-[#653716]"
              type="button"
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
