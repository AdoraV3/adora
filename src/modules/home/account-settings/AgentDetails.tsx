"use client";

import {
  getAgentWithVoiceAction,
  updateAssistantAction,
} from "@/app/actions/agent";
import { getVoicesAction } from "@/app/actions/voice";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useServerActionMutation,
  useServerActionQuery,
} from "@/lib/hooks/server-action-hooks";
import { QueryKeyFactory } from "@/lib/queryKeyFactory";
import { formatPhoneNumber } from "@/modules/auth/helpers";
import { FloatingInput, FloatingLabel } from "@/modules/commons/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { AgentDetailsSchemaType, agentDetailsSchema } from "./schema";

export default function AgentDetails() {
  const form = useForm<AgentDetailsSchemaType>({
    mode: "onChange",
    resolver: zodResolver(agentDetailsSchema),
    defaultValues: {
      voice: "",
      number: "",
      name: "",
    },
  });

  const { data } = useServerActionQuery(getAgentWithVoiceAction, {
    input: undefined,
    queryKey: QueryKeyFactory.getAgentWithVoice(),
  });

  const { data: voices } = useServerActionQuery(getVoicesAction, {
    input: undefined,
    queryKey: QueryKeyFactory.getVoices(),
  });

  useEffect(() => {
    if (data?.data && (voices?.data?.length ?? 0) > 0) {
      form.reset({
        voice: data?.data?.voiceId,
        number: formatPhoneNumber(data?.data?.phoneNumber?.phoneNumber),
        name: data?.data?.name ?? "",
      });
    }
  }, [form.reset, data?.data, voices?.data]);

  const updateAssistantHandler = useServerActionMutation(
    updateAssistantAction,
    {
      onSuccess: () => {
        toast.success("Assistant updated successfully");
      },
      onError: () => {
        toast.error("Failed to update assistant");
      },
    },
  );

  const onSubmit: SubmitHandler<AgentDetailsSchemaType> = formValues => {
    updateAssistantHandler.mutate(formValues);
  };
  return (
    <article className="space-y-4">
      <h3 className="text-lg font-satoshi text-black-100 font-normal">
        Fill in the AI Agent Information
      </h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-6 items-center md:grid-cols-2"
        >
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Agent Number
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white-100   !border border-[hsla(0,0%,91%,1)] "
                    placeholder="Agent Number"
                    readOnly
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="voice"
            render={({ field: { onChange, value } }) => (
              <FormItem key={value} className="relative">
                <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                  Agent Voice
                </FormLabel>
                <FormControl>
                  <Select onValueChange={onChange} value={value}>
                    <SelectTrigger className=" py-3 capitalize border bg-white-100 text-black-100 focus-visible:border-none">
                      <SelectValue placeholder="Voice" />
                    </SelectTrigger>
                    <SelectContent sideOffset={5}>
                      <SelectGroup>
                        <SelectLabel>Voice</SelectLabel>
                        {voices?.data?.map(el => (
                          <SelectItem
                            className="font-satoshi capitalize text-base font-normal text-[#8c8c8c]"
                            key={el.id}
                            value={el.id}
                          >
                            {el.gender}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem id="name" className="relative  col-span-2">
                <FormControl>
                  <div className="relative">
                    <FloatingInput placeholder="AI name" {...field} />
                    <FloatingLabel>AI Name</FloatingLabel>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            isLoading={updateAssistantHandler.isPending}
            type="submit"
            className="mt-10 w-full col-span-2 text-black-100 px-6 border border-input bg-gray-650"
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </article>
  );
}
