"use client";

import { createAppointmentBookingToolAction } from "@/app/actions/call-log";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
import {
  AppointmentSchemaType,
  appointmentSchema,
} from "@/modules/call-logs/validation";
import { FloatingInput } from "@/modules/commons/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface CreateAvailabilityFormProps {
  setStage: (stage: number) => void;
}

export function CreateAvailabilityForm({
  setStage,
}: Readonly<CreateAvailabilityFormProps>) {
  const initialValues: AppointmentSchemaType = {
    url: "",
    scenarioId: "",
  };
  const form = useForm<AppointmentSchemaType>({
    mode: "onChange",
    resolver: zodResolver(appointmentSchema),
    defaultValues: initialValues,
  });

  const webhookHandler = useServerActionMutation(
    createAppointmentBookingToolAction,
    {
      onSuccess: () => {
        form.reset(initialValues);
        toast.success("Configurations saved successfully");
        setStage(2);
      },
      onError: err => toast.error(err?.message),
    },
  );

  const onSubmit: SubmitHandler<AppointmentSchemaType> = data => {
    webhookHandler.mutate(data);
  };
  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="scenarioId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative group focus:text-primary">
                    <p className="mb-2 text-left font-light text-[#00000090]">
                      Scenario Id
                    </p>
                    <FloatingInput
                      type="number"
                      className="arrow-hide"
                      placeholder="Enter scenario id"
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
              onClick={() => setStage(1)}
              type="button"
              className="mt-5 w-[48%] border border-[#DDE4F060] bg-[#FDFAFF] text-[#653716]"
            >
              Close
            </Button>
            <Button
              className="mt-5 w-[48%] bg-[#653716]"
              onClick={form.handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
