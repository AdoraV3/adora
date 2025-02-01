"use client";

import { CrmWebhookForm } from "./CrmWebhookForm";

export function Appointment() {
  // const updateUserHandler = useServerActionMutation(updatePreferenceAction, {});
  return (
    <section className="bg-[hsla(0, 0%, 100%,0.34)] ">
      <div className="flex min-h-screen flex-col md:flex-row md:justify-between">
        
        <div className="pl-4 pt-8 md:w-[58%]">

        <h2 className="font-lg mb-2 font-bold text-black-100 text-left">
             Create your appointment
            </h2>

          <div
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "20px",
              maxWidth: "95%",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              fontFamily: "Arial, sans-serif",
              background: "#f2f2f270"
            }}
            className=""
          >
           

            <CrmWebhookForm />
          </div>
        </div>

        <div className="hidden min-h-screen bg-[#8d8d8d30] md:block md:w-[0.25%]" />
        <div className="pt-8 md:w-[40.5%] md:pr-3">
          <h1 className="text-xl">Steps to Connect Adora to your CRM</h1>
          <ol style={{ lineHeight: "1.8" }} className="mt-4 list-decimal pl-4">
            <li>
              Go to{" "}
              <a
                href="https://Make.com"
                target="_blank"
                className="text-blue-700"
                rel="noreferrer"
              >
                Make.com
              </a>
              <ul className="mb-3 list-disc pl-4 text-[#1c1c1c80]">
                <li>Sign up or log in if you already have an account.</li>
              </ul>
            </li>
            <li>
              Create a Scenario:
              <ul className="mb-3 list-disc pl-4 text-[#1c1c1c80]">
                <li>
                  Add your CRM (e.g., Salesforce, HubSpot, or Zoho CRM) to the
                  scenario.
                </li>
                <li>
                  Example: If using Salesforce, you might set actions like
                  Create a new lead or Update a contact when triggered by
                  certain events.
                </li>
              </ul>
            </li>
            <li>
              Create a Custom Webhook:
              <ul className="mb-3 list-disc pl-4 text-[#1c1c1c80]">
                <li>
                  In the scenario, create a custom webhook, and a unique URL
                  will be generated.
                </li>
              </ul>
            </li>
            <li>
              Choose Data Feeds:
              <ul className="mb-3 list-disc pl-4 text-[#1c1c1c80]">
                <li>
                  Select the data feeds you want to collect via the webhook.
                </li>
                <li>
                  Example: You may choose to collect new lead details, updated
                  customer information, or sales opportunities from your CRM.
                </li>
              </ul>
            </li>
            <li>
              Return to Adora:
              <ul className="mb-3 list-disc pl-4 text-[#1c1c1c80]">
                <li>
                  Copy the webhook URL, come back to the Adora website, and
                  paste the URL where required.
                </li>
              </ul>
            </li>
          </ol>
          <h3>Note:</h3>
          <p>
            You can also watch the YouTube video on how to connect Adora to your
            CRM{" "}
            <a
              href="https://www.youtube.com/watch?v=-qjAF02iVG8"
              target="_blank"
              className="text-blue-700"
              rel="noreferrer"
            >
              https://www.youtube.com/watch?v=-qjAF02iVG8
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
