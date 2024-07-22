"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/modules/commons/components";
import {
  PhoneInput,
  getPhoneData,
} from "@/modules/commons/components/phone-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateKnowledgeBaseSchemaType,
  createKnowledgeBaseSchema,
} from "../validation";

export function CreateKnowledgeBase() {
  const form = useForm<CreateKnowledgeBaseSchemaType>({
    mode: "all",
    resolver: zodResolver(createKnowledgeBaseSchema),
  });

  const onSubmit: SubmitHandler<CreateKnowledgeBaseSchemaType> = data => {
    const phoneData = getPhoneData(data.phoneNumber);

    if (!phoneData.isValid) {
      form.setError("phoneNumber", {
        type: "manual",
        message: "Invalid phone number",
      });
    }
  };

  const handleFileChange = () => {};

  // const options = [
  //   { label: "React", value: "react" },
  //   { label: "Vue", value: "vue" },
  //   { label: "Angular", value: "angular" },
  // ];
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 pt-10 space-y-3 gap-4">
            <h4 className="font-satoshi col-span-2 underline underline-offset-2 font-medium text-base text-black-100">
              Client Information
            </h4>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[hsla(0,0%,91%,1)] border "
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[hsla(0,0%,91%,1)] border"
                      placeholder="Contact Person"
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
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[hsla(0,0%,91%,1)] border"
                      placeholder="email"
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
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem id="phoneNumber" className="mb-5">
                  <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      // maxLength={phoneNumber.length < 13 ? 16 : 14}
                      // id="phoneNumber"
                      onChange={onChange}
                      className="bg-white-100 border-[hsla(0,0%,91%,1)]  border"
                      placeholder="Phone Number"
                      {...rest}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <section className="space-y-3">
            <h4 className="font-satoshi my-3 underline-offset-2 underline font-medium text-base text-black-100">
              Customer Support Knowledge Base
            </h4>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paste or Write Knowledge Base Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paste or Write Knowledge Base Content</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={options}
                      onValueChange={value => field.onChange(value)}
                      // defaultValue={field.value}
                      placeholder="Select options"
                      //   variant="inverted"
                      animation={2}
                      maxCount={3}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Glossary of Terms</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste URL or write Important Terms and Definitions"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2 space-y-2">
              <Label className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                Upload Knowledge Base (Optional){" "}
              </Label>
              <FileUpload
                accept="jpg, .jpeg, .png,"
                register={form.register("knowledgeBase", {
                  onChange: handleFileChange,
                })}
              >
                <div className="flex py-16  flex-col gap-2 justify-center items-center">
                  <p className="text-sm font-normal font-satoshi text-[hsla(0,2%,41%,1)] ">
                    <span className="font-bold"> Click to upload </span> or drag
                    and drop
                  </p>

                  <p className="text-[hsla(0,2%,41%,1)] font-normal text-sm font-satoshi ">
                    PDF, SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              </FileUpload>
            </div>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any Other Relevant Information"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
        </form>
      </Form>
    </div>
  );
}
