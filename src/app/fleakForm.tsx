"use client"

import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import Response from "@/components/ui/response"
import {req_bright_snapshot_id, req_snapshot_is_ready, req_result} from "@/app/api/fleak/apis"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  profile: z.string().min(1, {
    message: "performance must be not null",
  }),
  jobUrl: z.string().min(1, {
    message: "jobUrl must be not null",
  }),
})

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function FleakForm() {
  const [response, setResponse] = useState({});

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      profile: "",
      jobUrl: ""
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setResponse({ status: "pending" });
    const snapshout_id_res = await req_bright_snapshot_id(data.profile);
    console.log("snapshout_id_res", snapshout_id_res)
    let snapshout_status_res = await req_snapshot_is_ready(snapshout_id_res.outputEvents[0].resp.snapshot_id)
    while (snapshout_status_res.outputEvents[0].resp.status !== 'ready') {
      await sleep(3000)
      snapshout_status_res = await req_snapshot_is_ready(snapshout_id_res.outputEvents[0].resp.snapshot_id)
    }
    const result = await req_result(snapshout_id_res.outputEvents[0].resp.snapshot_id, data.jobUrl)
    setResponse({ status: "ready" , data: result} )

  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-4 flex flex-col">
        <FormField
          control={form.control}
          name="profile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>profile</FormLabel>
              <FormControl>
                <Input placeholder="Your profile" {...field} />
              </FormControl>
              <FormDescription>
                This is your profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description Url</FormLabel>
              <FormControl>
                <Input placeholder="Job Description Url" {...field} />
              </FormControl>
              <FormDescription>
                This is your job description url.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className=" text-center">Submit</Button>
      </form>
    </Form>
    <div className="flex grow items-center justify-center p-4 max-w-[60ch]">
        <Response {...response} />
      </div>
    </>
    
  )
}
