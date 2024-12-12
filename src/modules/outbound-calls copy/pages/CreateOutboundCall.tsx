"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FileUpload, TimePicker } from "@/modules/commons/components";
import { Label } from "@radix-ui/react-label";
import {
  CreateOutboundCallSchemaType,
  createOutboundCallSchema,
} from "../validation";

export function CreateOutboundCall() {
  const form = useForm<CreateOutboundCallSchemaType>({
    resolver: zodResolver(createOutboundCallSchema),
  });

  const onSubmit: SubmitHandler<CreateOutboundCallSchemaType> = () => {};

  return (
    <section className="max-w-3xl pt-10 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4 items-center">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex col-span-2 flex-col">
                  <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                    Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full bg-white-100 rounded-md border !border-[hsla(0,0%,91%,1)] pl-3 text-left font-normal",
                            // eslint-disable-next-line sonarjs/no-duplicate-string
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Icons.Calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                    Start Time
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full rounded-md bg-white-100 border !border-[hsla(0,0%,91%,1)] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "hh:mm a")
                          ) : (
                            <span>Pick a start time</span>
                          )}
                          <Icons.Timer className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto pb-6" align="start">
                      <TimePicker setDate={field.onChange} date={field.value} />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                    End Time
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full rounded-md bg-white-100 border !border-[hsla(0,0%,91%,1)] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "hh:mm a")
                          ) : (
                            <span>Pick a end time</span>
                          )}
                          <Icons.Timer className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto pb-6" align="start">
                      <TimePicker setDate={field.onChange} date={field.value} />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="knowledgeBase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                    Knowledge base
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white-100   border !border-[hsla(0,0%,91%,1)] "
                      placeholder="Type knowledge base or paste Url"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="callCycle"
              render={({ field: { onChange, value } }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                    Call Cycle
                  </FormLabel>
                  <Select
                    defaultValue={value}
                    onValueChange={data => {
                      onChange(data);
                    }}
                    value={value}
                  >
                    <SelectTrigger className=" py-3  bg-white-100 text-black-300 focus-visible:border">
                      <SelectValue placeholder="Call Cycle" />
                    </SelectTrigger>
                    <SelectContent sideOffset={5}>
                      <SelectGroup>
                        <SelectLabel>Call Cycles</SelectLabel>
                        {[1, 3, 4]?.map(el => (
                          <SelectItem
                            className="text-black-100 font-satoshi font-normal text-base"
                            key={el}
                            value={el?.toString()}
                          >
                            {el}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="col-span-2 space-y-2">
              <Label className="font-normal text-[hsla(0,0%,11%,0.8)] text-base font-satoshi">
                Upload Knowledge Base (Optional){" "}
              </Label>
              <FileUpload />
            </div>
            <div className="flex col-span-2 justify-center mt-20">
              <Button className="px-20" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
