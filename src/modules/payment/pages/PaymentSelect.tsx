"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  PaymentMethodSchemaType,
  paymentMethodSchema,
} from "@/modules/outbound-calls/validation";

export function PaymentSelectForm() {
  const form = useForm<PaymentMethodSchemaType>({
    resolver: zodResolver(paymentMethodSchema),
  });

  function onSubmit() {}

  return (
    <div className="pt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select Payment Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col mt-10 space-y-3"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="paystack" />
                      </FormControl>
                      <FormLabel className="font-normal">Pay stack</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="stripe" />
                      </FormControl>
                      <FormLabel className="font-normal">Stripe</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center mt-20">
            <Button className="px-20" type="submit">
              Connect
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
