"use client";

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProfileSchemaType, profileSchema } from "./validation";

export function Edit() {
  const form = useForm<ProfileSchemaType>({
    mode: "all",
    resolver: zodResolver(profileSchema),
  });
  const onSubmit: SubmitHandler<ProfileSchemaType> = () => {};
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h1>Hello</h1>
      </form>
    </Form>
  );
}
