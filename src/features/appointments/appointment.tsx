"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { BookAppointmentForm } from "./book-appointment-form"
import { CreateAvailabilityForm } from "./create-availability-form"
import { AppointmentList } from "./appointment-list"
import Instructions from "./instructions"
import { toast } from "sonner"
import {
  ChevronRight,
  Download,
  Calendar,
  ArrowLeft,
  LayoutDashboard,
  Plus,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

export function Appointment() {
  const [view, setView] = useState<"setup" | "manage">("manage")
  const [stage, setStage] = useState<number>(1)
  const [stageA, setStageA] = useState<number>(1)
  const [stageC, setStageC] = useState<number>(1)

  const handleDownload = (type: "A" | "C") => {
    // Define the JSON template based on type
    const template =
      type === "A"
        ? {
            name: "Calendar Availability - Adora Integration",
            flow: [
              {
                id: 1,
                module: "gateway:CustomWebHook",
                version: 1,
                parameters: {
                  hook: "ADD_YOUR_WEBHOOK_ID_HERE",
                  maxResults: 1,
                },
                mapper: {},
                metadata: {
                  designer: {
                    x: 0,
                    y: 0,
                  },
                  restore: {},
                  expect: [
                    {
                      name: "hook",
                      type: "hook",
                      label: "Webhook",
                      required: true,
                    },
                  ],
                },
              },
              {
                id: 2,
                module: "http:ActionSendData",
                version: 3,
                parameters: {},
                mapper: {
                  url: "https://adora.neetocal.com/api/external/v1/slots/meeting-with-xxx-yyy",
                  serializeUrl: false,
                  method: "get",
                  headers: [],
                  qs: [
                    {
                      name: "duration",
                      value: "{{1.duration}}",
                    },
                    {
                      name: "date",
                      value: "{{1.date}}",
                    },
                  ],
                  bodyType: "raw",
                  parseResponse: true,
                  authUser: "",
                  authPass: "",
                  timeout: "",
                  shareCookies: false,
                  ca: "",
                  rejectUnauthorized: true,
                  followRedirect: true,
                  useQuerystring: false,
                  gzip: true,
                  useMtls: false,
                },
                metadata: {
                  designer: {
                    x: 300,
                    y: 0,
                  },
                  restore: {
                    expect: {
                      method: {
                        label: "GET",
                      },
                      bodyType: {
                        label: "Raw",
                      },
                    },
                  },
                  expect: [
                    {
                      name: "url",
                      type: "url",
                      label: "URL",
                      required: true,
                    },
                    {
                      name: "method",
                      type: "select",
                      label: "Method",
                      required: true,
                      validate: {
                        enum: ["get", "post", "put", "patch", "delete", "head", "options"],
                      },
                    },
                  ],
                },
              },
              {
                id: 3,
                module: "gateway:WebhookRespond",
                version: 1,
                parameters: {},
                mapper: {
                  status: "200",
                  body: "{{2.data}}",
                  headers: [],
                },
                metadata: {
                  designer: {
                    x: 600,
                    y: 0,
                  },
                  restore: {
                    expect: {
                      status: {
                        label: "200 OK",
                      },
                    },
                  },
                },
              },
            ],
            metadata: {
              version: 1,
              scenario: {
                roundtrips: 1,
                maxErrors: 3,
                autoCommit: false,
                sequential: false,
                confidential: false,
                dataloss: false,
                dlq: false,
              },
              designer: {
                orphans: [],
              },
              zone: "us2.make.com",
            },
          }
        : {
            name: "NeetoCal Appointment Booking",
            flow: [
              {
                id: 1,
                module: "gateway:CustomWebHook",
                version: 1,
                parameters: {
                  hook: 139278,
                  maxResults: 1,
                },
                mapper: {},
                metadata: {
                  designer: {
                    x: 0,
                    y: 0,
                  },
                  restore: {
                    parameters: {
                      hook: {
                        data: {
                          editable: "true",
                        },
                        label: "make_booking",
                      },
                    },
                  },
                  parameters: [
                    {
                      name: "hook",
                      type: "hook:gateway-webhook",
                      label: "Webhook",
                      required: true,
                    },
                    {
                      name: "maxResults",
                      type: "number",
                      label: "Maximum number of results",
                    },
                  ],
                },
              },
              {
                id: 6,
                module: "util:SetVariables",
                version: 1,
                parameters: {},
                mapper: {
                  scope: "roundtrip",
                  variables: [
                    {
                      name: "time_zone",
                      value: "{{1.message.toolCalls[].function.arguments.timezone}}",
                    },
                    {
                      name: "meeting_slug",
                      value: "meeting-with-samuel-ayegbusi",
                    },
                    {
                      name: "API Key",
                      value: "z1mB5ugPmurLp9qzj4ojKrdVuCbe5R3WEcRJ5149wa2JeeBS",
                    },
                  ],
                },
                metadata: {
                  designer: {
                    x: 300,
                    y: 0,
                  },
                  restore: {
                    expect: {
                      scope: {
                        label: "One cycle",
                      },
                      variables: {
                        items: [null, null, null],
                      },
                    },
                  },
                  interface: [
                    {
                      name: "time_zone",
                      type: "any",
                      label: "time_zone",
                    },
                    {
                      name: "meeting_slug",
                      type: "any",
                      label: "meeting_slug",
                    },
                    {
                      name: "API Key",
                      type: "any",
                      label: "API Key",
                    },
                  ],
                },
              },
              {
                id: 9,
                module: "http:ActionSendDataAPIKeyAuth",
                version: 3,
                parameters: {
                  auth: 6895,
                  handleErrors: false,
                },
                mapper: {
                  ca: "",
                  qs: [],
                  url: "https://adora.neetocal.com/api/external/v1/bookings",
                  data: '{\n    "meeting_slug": "{{6.meeting_slug}}",\n    "name": "{{1.message.toolCalls[].function.arguments.name}}",\n    "email": "{{1.message.toolCalls[].function.arguments.email}}",\n    "time_zone": "{{1.message.toolCalls[].function.arguments.timezone}}",\n    "slot_date": "{{1.message.toolCalls[].function.arguments.date}}",\n    "slot_start_time": "{{1.message.toolCalls[].function.arguments.time}}"\n  \n  }',
                  gzip: true,
                  method: "post",
                  headers: [],
                  timeout: "",
                  useMtls: false,
                  bodyType: "raw",
                  contentType: "application/json",
                  serializeUrl: false,
                  shareCookies: false,
                  parseResponse: false,
                  followRedirect: true,
                  useQuerystring: false,
                  followAllRedirects: false,
                  rejectUnauthorized: true,
                },
                metadata: {
                  designer: {
                    x: 600,
                    y: 0,
                    name: "NeetoCal Booking",
                  },
                  restore: {
                    expect: {
                      qs: {
                        mode: "chose",
                      },
                      method: {
                        mode: "chose",
                        label: "POST",
                      },
                      headers: {
                        mode: "chose",
                      },
                      bodyType: {
                        label: "Raw",
                      },
                      contentType: {
                        label: "JSON (application/json)",
                      },
                    },
                    parameters: {
                      auth: {
                        label: "neetocal",
                      },
                    },
                  },
                  parameters: [
                    {
                      name: "auth",
                      type: "keychain:apikeyauth",
                      label: "Credentials",
                      required: true,
                    },
                    {
                      name: "handleErrors",
                      type: "boolean",
                      label: "Evaluate all states as errors (except for 2xx and 3xx )",
                      required: true,
                    },
                  ],
                  expect: [
                    {
                      name: "url",
                      type: "url",
                      label: "URL",
                      required: true,
                    },
                    {
                      name: "serializeUrl",
                      type: "boolean",
                      label: "Serialize URL",
                      required: true,
                    },
                    {
                      name: "method",
                      type: "select",
                      label: "Method",
                      required: true,
                      validate: {
                        enum: ["get", "head", "post", "put", "patch", "delete", "options"],
                      },
                    },
                    {
                      name: "headers",
                      spec: [
                        {
                          name: "name",
                          type: "text",
                          label: "Name",
                          required: true,
                        },
                        {
                          name: "value",
                          type: "text",
                          label: "Value",
                        },
                      ],
                      type: "array",
                      label: "Headers",
                    },
                    {
                      name: "qs",
                      spec: [
                        {
                          name: "name",
                          type: "text",
                          label: "Name",
                          required: true,
                        },
                        {
                          name: "value",
                          type: "text",
                          label: "Value",
                        },
                      ],
                      type: "array",
                      label: "Query String",
                    },
                    {
                      name: "bodyType",
                      type: "select",
                      label: "Body type",
                      validate: {
                        enum: ["raw", "x_www_form_urlencoded", "multipart_form_data"],
                      },
                    },
                    {
                      name: "parseResponse",
                      type: "boolean",
                      label: "Parse response",
                      required: true,
                    },
                    {
                      name: "timeout",
                      type: "uinteger",
                      label: "Timeout",
                      validate: {
                        max: 300,
                        min: 1,
                      },
                    },
                    {
                      name: "shareCookies",
                      type: "boolean",
                      label: "Share cookies with other HTTP modules",
                      required: true,
                    },
                    {
                      name: "ca",
                      type: "cert",
                      label: "Self-signed certificate",
                    },
                    {
                      name: "rejectUnauthorized",
                      type: "boolean",
                      label: "Reject connections that are using unverified (self-signed) certificates",
                      required: true,
                    },
                    {
                      name: "followRedirect",
                      type: "boolean",
                      label: "Follow redirect",
                      required: true,
                    },
                    {
                      name: "useQuerystring",
                      type: "boolean",
                      label: "Disable serialization of multiple same query string keys as arrays",
                      required: true,
                    },
                    {
                      name: "gzip",
                      type: "boolean",
                      label: "Request compressed content",
                      required: true,
                    },
                    {
                      name: "useMtls",
                      type: "boolean",
                      label: "Use Mutual TLS",
                      required: true,
                    },
                    {
                      name: "contentType",
                      type: "select",
                      label: "Content type",
                      validate: {
                        enum: ["text/plain", "application/json", "application/xml", "text/xml", "text/html", "custom"],
                      },
                    },
                    {
                      name: "data",
                      type: "buffer",
                      label: "Request content",
                    },
                    {
                      name: "followAllRedirects",
                      type: "boolean",
                      label: "Follow all redirect",
                      required: true,
                    },
                  ],
                },
              },
              {
                id: 3,
                module: "gateway:WebhookRespond",
                version: 1,
                parameters: {},
                mapper: {
                  body: '{\n   "results": [\n{\n        "result":  "The appointment was booked successfully", \ntoolCallId: {{1.message.toolCalls[].id}}\n        }\n    ]\n}',
                  status: "200",
                  headers: [],
                },
                metadata: {
                  designer: {
                    x: 900,
                    y: 0,
                  },
                  restore: {
                    expect: {
                      headers: {
                        mode: "chose",
                      },
                    },
                  },
                  expect: [
                    {
                      name: "status",
                      type: "uinteger",
                      label: "Status",
                      required: true,
                      validate: {
                        min: 100,
                      },
                    },
                    {
                      name: "body",
                      type: "any",
                      label: "Body",
                    },
                    {
                      name: "headers",
                      spec: [
                        {
                          name: "key",
                          type: "text",
                          label: "Key",
                          required: true,
                          validate: {
                            max: 256,
                          },
                        },
                        {
                          name: "value",
                          type: "text",
                          label: "Value",
                          required: true,
                          validate: {
                            max: 4096,
                          },
                        },
                      ],
                      type: "array",
                      label: "Custom headers",
                      validate: {
                        maxItems: 16,
                      },
                    },
                  ],
                },
              },
            ],
            metadata: {
              instant: true,
              version: 1,
              scenario: {
                roundtrips: 1,
                maxErrors: 3,
                autoCommit: true,
                autoCommitTriggerLast: true,
                sequential: false,
                slots: null,
                confidential: false,
                dataloss: false,
                dlq: false,
                freshVariables: false,
              },
              designer: {
                orphans: [],
              },
              zone: "us2.make.com",
              notes: [],
            },
          }

    // Create blob and trigger download
    const jsonString = JSON.stringify(template, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = type === "A" ? "calendar-availability.json" : "book-appointment.json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    // Show success message
    toast.success(`${type === "A" ? "Calendar Availability" : "Book Appointment"} template downloaded successfully!`)

    // Move to next stage after download
    if (type === "A") setStageA(2)
    else setStageC(2)
  }

  return (
    <section className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center pt-8">
          <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex items-center">
            <button
              onClick={() => setView("manage")}
              className={`flex items-center px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                view === "manage" ? "bg-[#E05E00] text-white shadow-md" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Manage Appointments
            </button>
            <button
              onClick={() => setView("setup")}
              className={`flex items-center px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                view === "setup" ? "bg-[#E05E00] text-white shadow-md" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Plus className="w-4 h-4 mr-2" />
              Setup Integration
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 pt-8">
          {/* Main Content Area */}
          <div className="lg:w-3/5">
            {view === "setup" ? (
              <>
                <header className="mb-10">
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Integration Setup</h1>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#E05E00] transition-all duration-700 ease-in-out"
                        style={{ width: `${(stage / 2) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-slate-500 whitespace-nowrap">Step {stage} of 2</span>
                  </div>
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300">
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-50 text-[#E05E00]">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">
                          {stage === 1 ? "Calendar Availability" : "Booking Configuration"}
                        </h2>
                        <p className="text-slate-500 text-sm">Follow the prompts to configure your integration.</p>
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="space-y-8">
                      {(stage === 1 ? stageA : stageC) === 1 ? (
                        <div className="bg-slate-50 rounded-xl p-8 border border-slate-100 text-center">
                          <div className="max-w-md mx-auto">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Get Started with the Template</h3>
                            <p className="text-slate-500 mb-8">
                              Download our pre-configured Make.com blueprint to speed up your workflow.
                            </p>
                            <Button
                              className="w-full bg-[#E05E00] hover:bg-[#c65300] text-white h-12 font-semibold shadow-lg shadow-orange-100 transition-all active:scale-95"
                              onClick={() => handleDownload(stage === 1 ? "A" : "C")}
                            >
                              <Download className="mr-2 h-5 w-5" />
                              Download Template
                            </Button>
                            <button
                              className="mt-6 text-sm font-medium text-slate-400 hover:text-slate-600 flex items-center justify-center w-full transition-colors"
                              onClick={() => setStage(stage === 1 ? 2 : 1)}
                            >
                              {stage === 1 ? (
                                <>
                                  Skip to Step 2 <ChevronRight className="ml-1 h-4 w-4" />
                                </>
                              ) : (
                                <>
                                  <ArrowLeft className="mr-1 h-4 w-4" /> Back to Step 1
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="animate-in fade-in zoom-in-95 duration-300">
                          {stage === 1 ? (
                            <CreateAvailabilityForm setStage={setStage} />
                          ) : (
                            <BookAppointmentForm setStage={setStage} />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Display the AppointmentList in the management view */
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <header className="mb-10">
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">My Appointments</h1>
                  <p className="text-slate-500">Overview and management of your business appointments.</p>
                </header>
                <AppointmentList />
              </div>
            )}
          </div>

          {/* Sidebar Instructions */}
          <div className="lg:w-2/4">
            <div className="sticky top-12">
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-10">
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                  <h3 className="text-lg font-bold text-slate-900">
                    {view === "setup" ? "Setup Guide" : "Appointment Insights"}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    {view === "setup" ? "Instructional" : "Quick Tips"}
                  </span>
                </div>
                {view === "setup" ? (
                  <Instructions step={stage} />
                ) : (
                  /* Dynamic content for the management view sidebar */
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-[#E05E00]" />
                        Confirmation Workflow
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Confirmed appointments trigger automated notifications to both you and the caller via your
                        configured webhooks.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-slate-900 mb-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2 text-amber-500" />
                        Pending Requests
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Ensure you review pending appointments within 24 hours to maintain high customer satisfaction.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-orange-50 border border-orange-100">
                <p className="text-sm text-orange-800 leading-relaxed font-medium">
                  <strong>Need help?</strong> Our integration team is available to assist you with the Make.com
                  configuration if you run into any issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
