import { createCallLogAction } from "@/app/actions/call-log";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
import {
  FloatingInput,
  FloatingLabel,
  Modal,
} from "@/modules/commons/components";
import { Disclosure } from "@/modules/commons/hooks/useDisclosure";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { AppointmentSchemaType, appointmentSchema } from "../validation";

export function AppointmentConfigForm(props: Readonly<Disclosure>) {
  const { isOpen, onClose } = props;

  const initialValues: AppointmentSchemaType = {
    meetingLink: "",
    scenarioId: "",
    webhookUrl: "",
  };

  const form = useForm<AppointmentSchemaType>({
    mode: "onChange",
    resolver: zodResolver(appointmentSchema),
  });

  const webhookHandler = useServerActionMutation(createCallLogAction, {
    onSuccess: () => {
      onClose();
      form.reset(initialValues);
      toast.success("Configurations saved successfully");
    },
    onError: err => toast.error(err?.message),
  });

  const onSubmit: SubmitHandler<AppointmentSchemaType> = data => {
    webhookHandler.mutate(data);
  };

  const handleModalClose = () => {
    onClose();
    form.reset(initialValues);
  };

  return (
    <Modal isOpen={isOpen} isOpenChange={handleModalClose}>
      <Modal.Content title="Appointment configuration">
        <section className="flex flex-col gap-5">
          <h2 className="text-black-100 font-lg font-bold mb-2">
            Paste Webhook URL
          </h2>

          <Form {...form}>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="scenarioId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative group focus:text-primary">
                        <FloatingInput
                          type="number"
                          className="arrow-hide"
                          placeholder="Enter scenario id"
                          {...field}
                        />
                        <FloatingLabel>Scenario ID</FloatingLabel>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="font-normal mt-4 text-[hsla(0,0%,11%,0.8)] text-sm">
                      Copy the generated Webhook URL from Make.com and paste it
                      in the field here.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="webhookUrl"
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
                    <FormMessage />
                    <FormDescription className="font-normal mt-4 text-[hsla(0,0%,11%,0.8)] text-sm">
                      Copy the generated Webhook URL from Make.com and paste it
                      in the field here.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="meetingLink"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative group focus:text-primary">
                        <FloatingInput
                          type="url"
                          placeholder="Enter meeting link"
                          {...field}
                        />
                        <FloatingLabel>Meeting Link</FloatingLabel>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="font-normal mt-4 text-[hsla(0,0%,11%,0.8)] text-sm">
                      Copy the generated Webhook URL from Make.com and paste it
                      in the field here.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button
                isLoading={webhookHandler.isPending}
                className="w-full mt-5"
                type="submit"
              >
                Save
              </Button>
            </form>
          </Form>
        </section>
      </Modal.Content>
    </Modal>
  );
}
