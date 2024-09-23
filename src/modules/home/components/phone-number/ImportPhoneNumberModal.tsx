"use client";

import { createPhoneNumberAction } from "@/app/actions/agent";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useServerActionMutation } from "@/lib/hooks/server-action-hooks";
import { Modal, PhoneInput } from "@/modules/commons/components";
import { Disclosure } from "@/modules/commons/hooks/useDisclosure";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { PhoneNumberImportSchemaType, phoneNumberImportSchema } from "./schema";

type ImportPhoneNumberModalProps = Disclosure;

export function ImportPhoneNumberModal(props: ImportPhoneNumberModalProps) {
  const { isOpen, onClose } = props;
  const form = useForm<PhoneNumberImportSchemaType>({
    mode: "all",
    resolver: zodResolver(phoneNumberImportSchema),
  });

  const createPhoneHandler = useServerActionMutation(createPhoneNumberAction, {
    onSuccess: onClose,
    onError: error => {
      toast.error(error?.message);
    },
  });
  const onSubmit: SubmitHandler<PhoneNumberImportSchemaType> = data => {
    createPhoneHandler.mutate(data);
  };
  return (
    <Modal isOpen={isOpen} isOpenChange={onClose}>
      <Modal.Content className="rounded-[10px] " title="import phone number">
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h6 className="font-medium text-center font-satoshi text-[#575757] text-xl">
              Get AI Assistant Number
            </h6>
            <Link
              className={
                (buttonVariants({ variant: "ghost", size: "icon" }),
                "bg-[hsla(24,66%,92%,1)] text-center py-2 rounded-lg w-full text-primary")
              }
              target="_blank"
              href="https://www.twilio.com/login"
            >
              Sign up to Twilio{" "}
            </Link>
          </div>

          <Form {...form}>
            <form
              className="flex flex-col flex-1 gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem id="phoneNumber">
                    <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        id="phoneNumber"
                        className="border-none bg-gray-650"
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
                name="accountSID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                      Account SID
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-650"
                        id="sid"
                        placeholder="Twilio Account SID"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="authToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                      Auth Token
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-650"
                        id="sid"
                        placeholder="Twilio Auth Token"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Modal.Footer className="sm:justify-between flex-row mt-5">
                <Button
                  onClick={onClose}
                  size="icon"
                  className="bg-[hsla(25,64%,24%,0.1)] font-medium text-sm px-4 text-primary"
                >
                  Cancel
                </Button>
                <Button
                  className="px-4 text-sm font-medium bg-[hsla(25,64%,24%,1)] "
                  size="icon"
                  isLoading={createPhoneHandler.isPending}
                >
                  Import from Twilio
                </Button>
              </Modal.Footer>
            </form>
          </Form>
        </div>
      </Modal.Content>
    </Modal>
  );
}
