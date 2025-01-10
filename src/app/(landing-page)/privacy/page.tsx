"use client";
/* eslint-disable react/no-array-index-key */
import React from "react";

const page = () => {
  const privacyPolicy = [
    {
      title: "Introduction",
      content: `At Adora, a product of Poulina Inc. ("we," "us," or "our"), your privacy is our priority. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered customer service tools and related services ("Services"). By accessing or using our Services, you agree to the terms of this Privacy Policy.`,
    },
    {
      title: "Information We Collect",
      sections: [
        {
          subtitle: "1. Personal Information",
          content: [
            "Business Details: Company name, contact details, and other identifiers you provide when creating an account or subscribing to a plan.",
            "User Details: Names, job titles, email addresses, and phone numbers of individuals authorized to use Adora on behalf of your business.",
            "Payment Information: Billing addresses, credit/debit card details, and transaction history.",
          ],
        },
        {
          subtitle: "2. Operational Data",
          content: [
            "Customer Interactions: Data from calls, messages, and other interactions processed through Adora’s AI, such as transcriptions, audio recordings, and analytics.",
            "Usage Data: Logs of your activities on our platform, including features used, time spent, and error reports.",
          ],
        },
        {
          subtitle: "3. Third-Party Data",
          content: [
            "Data shared by third-party integrations (e.g., Twilio or Vapi) that facilitate voice or messaging functionalities.",
          ],
        },
        {
          subtitle: "4. Technical Information",
          content: [
            "Device identifiers, IP addresses, browser types, and operating systems to ensure platform compatibility and security.",
          ],
        },
      ],
    },
    {
      title: "How We Use Your Information",
      sections: [
        {
          subtitle: "1. Service Delivery",
          content: [
            "Enable and manage access to the platform.",
            "Process and respond to customer interactions.",
            "Customize and improve your user experience.",
          ],
        },
        {
          subtitle: "2. Platform Optimization",
          content: [
            "Analyze usage trends to enhance AI performance.",
            "Identify and resolve technical issues.",
            "Conduct quality assurance testing.",
          ],
        },
        {
          subtitle: "3. Business Operations",
          content: [
            "Facilitate subscription billing and payment processing.",
            "Communicate updates, promotions, and account-related information.",
            "Comply with legal and regulatory obligations.",
          ],
        },
      ],
    },
    {
      title: "Information Sharing and Disclosure",
      sections: [
        {
          subtitle: "1. With Service Providers",
          content:
            "We work with third-party vendors, such as Twilio or Vapi, and payment processors, to deliver core functionalities.",
        },
        {
          subtitle: "2. For Legal Compliance",
          content:
            "We may disclose information to comply with legal obligations, enforce our agreements, or protect against potential fraud.",
        },
        {
          subtitle: "3. Business Transfers",
          content:
            "In the event of a merger, acquisition, or asset sale, your information may be transferred as part of the business transaction.",
        },
      ],
    },
    {
      title: "Data Retention",
      content: `We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.`,
    },
    {
      title: "Your Rights",
      content: [
        "Access and Correct Data: Request a copy of the data we hold about you or correct inaccuracies.",
        "Data Portability: Receive a copy of your data in a portable format.",
        "Withdraw Consent: Opt-out of non-essential data processing or delete your account.",
      ],
    },
    {
      title: "Data Security",
      content: `We implement robust technical and organizational measures to protect your data. However, no system is completely secure, and we cannot guarantee absolute security.`,
    },
    {
      title: "Changes to This Privacy Policy",
      content: `We may update this Privacy Policy to reflect changes in our practices or legal requirements. Significant updates will be communicated through our platform or email.`,
    },
    {
      title: "Contact Us",
      content: ["Email: info@adoratech.ai, ", "Phone: 3065510212"],
    },
  ];

  return (
    <main className="text-black px-4 pt-12 md:px-12 md:pt-20 xl:px-16">
      <h1 className="mb-10 text-center text-4xl font-bold md:text-7xl">
        Privacy Policy
      </h1>
      {privacyPolicy.map((section, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h2 className="mb-5 mt-4 text-2xl font-semibold md:text-4xl ">
            {section.title}
          </h2>
          {section.content && <p>{section.content}</p>}
          {section.sections &&
            section.sections.map((subsection, subIndex) => (
              <div
                key={subIndex}
                style={{ marginLeft: "20px", marginTop: "10px" }}
              >
                <h3 className="mb-5 mt-4 text-xl font-semibold md:text-3xl ">
                  {subsection.subtitle}
                </h3>
                <ul>
                  {typeof subsection.content !== "string" ? (
                    subsection?.content?.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))
                  ) : (
                    <li>{subsection?.content}</li>
                  )}
                </ul>
              </div>
            ))}
        </div>
      ))}
    </main>
  );
};
export default page;
