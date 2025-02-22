"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import appointmentData from "../../../db/seeds/data/appointment_booking.json";
import calendarData from "../../../db/seeds/data/calendar_check.json";
import { BookAppointmentForm } from "./BookAppointmentForm";
import { CreateAvailabilityForm } from "./CreateAvailabilityForm";

export function Appointment() {
  function Step({ text, linkText, linkHref, suffix, isBold, last }: any) {
    return (
      <div className="relative flex items-start space-x-3 ">
        <div className="z-20 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm">
          <p className="text-[#ffffff]">&#10003;</p>
        </div>
        <div
          className={`${
            last ? "h-[70%]" : "h-full"
          } absolute top-6 z-10 w-[2px] bg-green-500`}
        />
        <p
          className={`max-w-full text-[#1C1C1CB2] md:max-w-[90%] ${
            isBold ? "font-semibold text-[#12B86A]" : "font-thin"
          }`}
        >
          {text}
          {linkText && linkHref && (
            <a
              href={linkHref}
              className="md:max-[80%] mx-1 text-[#657EFF] no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkText}
            </a>
          )}
          {suffix}
        </p>
      </div>
    );
  }
  // main toggle calendar & appointment
  const [stage, setstage] = useState<number>(1);
  // Toggle appointment
  const [stageA, setstageA] = useState<number>(1);
  // Toggle calendar
  const [stageC, setstageC] = useState<number>(1);
  const borderC = "1px solid #eee";
  const shadow = "0 2px 10px rgba(0, 0, 0, 0.1)";

  const handleDownloadA = () => {
    const jsonData = JSON.stringify(appointmentData, null, 2); // Convert to JSON string
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json"; // File name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setstageA(2);
  };

  const handleDownloadC = () => {
    const jsonData = JSON.stringify(calendarData, null, 2); // Convert to JSON string
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json"; // File name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setstageC(2);
  };
  return (
    <section className="bg-[hsla(0, 0%, 100%,0.34)] ">
      <div className="flex min-h-screen flex-col md:flex-row md:justify-between">
        <div className="pl-4 pt-8 md:w-[54%]">
          <h2 className="font-lg mb-2 text-left font-bold text-black-100">
            Create your appointment
          </h2>
          <div className="my-4 max-w-[95%]">
            <p className="text-center text-[#975221]">
              Step {stage} of <span className="text-[#83898C]">2</span>
            </p>
            <div className="relative mt-2 h-[5px] w-full rounded-full bg-[#83898C80]">
              <div
                className={`left-0 top-0 h-full w-${stage}/2 rounded-full bg-[#653716] `}
              />
            </div>
          </div>
          {/* Step 1 */}
          {stage === 1 && stageA === 1 && (
            <div>
              <div className="flex flex-row items-center gap-x-3 ">
                <div className="rounded-full bg-[#F8E8DD] px-4 py-1">
                  <p className="font-thin ">Step {stage}</p>
                </div>
                <h3>Set Up Calendar Availability</h3>
              </div>
              <p className="my-4 text-[#1C1C1C80]">
                Fill all necessary process to complete this.
              </p>
              <div
                style={{
                  border: borderC,
                  borderRadius: "8px",
                  padding: "20px",
                  maxWidth: "95%",
                  textAlign: "left",
                  boxShadow: shadow,
                  background: "#f2f2f270",
                }}
                className=""
              >
                <p className="mb-2 text-2xl font-semibold text-[#1C1C1C]">
                  Download Template
                </p>
                <p className="mb-4 font-thin">
                  Get the make.com template here on Adora.
                </p>
                <Button
                  className="mt-5 w-full bg-[#653716]"
                  type="button"
                  onClick={handleDownloadA}
                >
                  Download
                </Button>
                <Button
                  className="mt-3 w-full bg-transparent text-[#653716]"
                  type="button"
                >
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {stage === 1 && stageA === 2 && (
            <div>
              <div className="flex flex-row items-center gap-x-3 ">
                <div className="rounded-full bg-[#F8E8DD] px-4 py-1">
                  <p className="font-thin ">Step {stage}</p>
                </div>
                <h3>Set Up Calendar Availability</h3>
              </div>
              <p className="my-4 text-[#1C1C1C80]">
                Fill all necessary process to complete this.
              </p>
              <div
                style={{
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  padding: "20px",
                  maxWidth: "95%",
                  textAlign: "center",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  fontFamily: "Arial, sans-serif",
                  background: "#f2f2f270",
                }}
                className=""
              >
                <CreateAvailabilityForm setStage={setstage} />
              </div>
            </div>
          )}

          {/* Step 1 */}
          {stage === 2 && stageC === 1 && (
            <div>
              <div className="flex flex-row items-center gap-x-3 ">
                <div className="rounded-full bg-[#F8E8DD] px-4 py-1">
                  <p className="font-thin ">Step {stage}</p>
                </div>
                <h3>Booking an Appointment</h3>
              </div>
              <p className="my-4 text-[#1C1C1C80]">
                Fill all necessary process to complete this.
              </p>
              <div
                style={{
                  border: borderC,
                  borderRadius: "8px",
                  padding: "20px",
                  maxWidth: "95%",
                  textAlign: "left",
                  boxShadow: shadow,
                  background: "#f2f2f270",
                }}
                className=""
              >
                <p className="mb-2 text-2xl font-semibold text-[#1C1C1C]">
                  Download Template
                </p>
                <p className="mb-4 font-thin">
                  Get the make.com template here on Adora.
                </p>
                <Button
                  className="mt-5 w-full bg-[#653716]"
                  type="button"
                  onClick={handleDownloadC}
                >
                  Download
                </Button>
                <Button
                  className="mt-3 w-full bg-transparent text-[#653716]"
                  type="button"
                >
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {stage === 2 && stageC === 2 && (
            <div>
              <div className="flex flex-row items-center gap-x-3 ">
                <div className="rounded-full bg-[#F8E8DD] px-4 py-1">
                  <p className="font-thin ">Step {stage}</p>
                </div>
                <h3>Booking an Appointment</h3>
              </div>
              <p className="my-4 text-[#1C1C1C80]">
                Fill all necessary process to complete this.
              </p>
              <div
                style={{
                  border: borderC,
                  borderRadius: "8px",
                  padding: "20px",
                  maxWidth: "95%",
                  textAlign: "left",
                  boxShadow: shadow,
                  background: "#f2f2f270",
                }}
                className=""
              >
                <BookAppointmentForm setStage={setstage} />
              </div>
            </div>
          )}
        </div>

        <div className="hidden min-h-screen bg-[#8d8d8d30] md:block md:w-[0.25%]" />
        <div className="pt-8 md:w-[45%] md:pr-3">
          <div className="flex flex-col items-center justify-center pb-12 pt-10 md:pl-4">
            <div className="bg-white w-full rounded-lg p-6 shadow-lg">
              {stage === 1 && (
                <div className="space-y-6">
                  <Step
                    text="Go to "
                    linkText="neetocal.com"
                    linkHref="https://neetocal.com"
                    suffix=" and sign up. Follow the needed steps to sign up."
                  />
                  <Step text="Go to the meetings tab and copy the meeting link." />
                  <Step
                    text="Download the make.com template on Adora and open the JSON file. Replace the current URL that looks like "
                    linkText="https://adora.neetocal.com/api/external/v1/slots/meeting-with-xxx-yyy with the meeting link you just copied on neetocal.com."
                    linkHref="https://adora.neetocal.com/api/external/v1/slots/meeting-with-xxx-yyy with the meeting link you just copied on neetocal.com."
                  />
                  <Step text="Sign up on make.com and navigate to the Create Scenario section. Click on the menu icon and import the blueprint template." />
                  <Step
                    text="Upload the updated blueprint that now includes your meeting link."
                    isBold
                  />
                  <Step text="Click on the webhook icon, click on the add button, and name the automation whatever you want and which webhook URL is generated that looks like this" />
                  <Step
                    text="Now paste the webhook URL you copied on Adora. Find the scenario ID in the URL, e.g., "
                    linkText="https://us2.make.com/119296/scenarios/320809/edit"
                    linkHref="https://us2.make.com/119296/scenarios/320809/edit"
                    suffix=" scenario id is 320809"
                    last
                  />
                </div>
              )}

              {stage === 2 && (
                <div className="space-y-6">
                  <Step
                    text="Download the booking appointment template on Adora and login to "
                    linkText="make.com"
                    linkHref="https://make.com"
                  />
                  <Step text="Create a new scenario and import the template same step for creating calender availability scenario this time there is no need to edit the template" />
                  <Step
                    text="Click on the webhook icon, click on the add button, and name the automation whatever you want and which webhook URL is generated that looks like this:"
                    linkText={`https://hook.us2.make.com/xxxx. Also, click  on the neetocal icon and click on the add icon in the "Key" section paste your neetocal  API key.`}
                    linkHref={`https://hook.us2.make.com/xxxx. Also, click  on the neetocal icon and click on the add icon in the "Key" section paste your neetocal  API key.`}
                  />
                  <Step
                    text="Now paste the webhook URL you copied on adora. For the scenario Id, you can find it in the URL e.g"
                    linkText="https://us2.make.com/119296/scenarios/320809/edit scenario id is 320809"
                    linkHref="https://us2.make.com/119296/scenarios/320809/edit"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
