"use client";
import React from "react";

const page = () => {
  const termsOfUse = [
    {
      title: "Welcome to Adora",
      content: `Adora is a B2B AI-powered customer service platform provided by Poulina Inc. These Terms of Use govern your access and use of our Services. By using Adora, you agree to comply with these Terms.`,
    },
    {
      title: "Definitions",
      sections: [
        {
          subtitle: "Adora",
          content: `Refers to the platform and services provided by Poulina Inc.`,
        },
        {
          subtitle: "User",
          content: `Refers to businesses and authorized individuals accessing the platform.`,
        },
        {
          subtitle: "Content",
          content: `Includes any data, text, or media uploaded, processed, or generated using the Services.`,
        },
      ],
    },
    {
      title: "Use of Services",
      content: `Adora is designed to streamline customer service processes through AI-powered tools. Users must adhere to the following:`,
      sections: [
        {
          subtitle: "1. Eligibility",
          content: `You must be a registered business entity or authorized representative to use Adora.`,
        },
        {
          subtitle: "2. Account Responsibilities",
          content: [
            "Maintain the confidentiality of login credentials.",
            "Notify Adora immediately of unauthorized account use.",
          ],
        },
        {
          subtitle: "3. Permitted Use",
          content: `You may use Adora only for lawful business purposes.`,
        },
        {
          subtitle: "4. Prohibited Activities",
          content: [
            "Use the platform for fraudulent or illegal activities.",
            "Modify, reverse-engineer, or decompile Adora’s code.",
            "Introduce malware, spam, or other disruptive elements.",
          ],
        },
      ],
    },
    {
      title: "Subscription and Billing",
      sections: [
        {
          subtitle: "1. Payment Terms",
          content: [
            "Subscription fees are billed monthly or annually, depending on your plan.",
            "Payments are non-refundable unless explicitly stated otherwise.",
          ],
        },
        {
          subtitle: "2. Cancellation",
          content: `You may cancel your subscription at any time. Cancellation will take effect at the end of the billing cycle.`,
        },
        {
          subtitle: "3. Changes to Fees",
          content: `Adora reserves the right to adjust subscription fees with prior notice.`,
        },
      ],
    },
    {
      title: "Intellectual Property",
      content: `Adora and all related materials are the intellectual property of Poulina Inc. Users are granted a non-exclusive, non-transferable license to use the platform for their business operations.`,
    },
    {
      title: "Limitation of Liability",
      content: `Adora is provided "as-is" without warranties of any kind. Poulina Inc. is not liable for:`,
      sections: [
        {
          subtitle: "Losses",
          content: `Caused by user error, third-party service failures, or interruptions.`,
        },
        {
          subtitle: "Indirect or Consequential Damages",
          content: `Not covered under liability.`,
        },
      ],
    },
    {
      title: "Termination",
      content: `Adora may suspend or terminate your account if you violate these Terms. Upon termination, access to all platform features will cease immediately.`,
    },
    {
      title: "Governing Law",
      content: `These Terms are governed by the laws of Ontario, Canada.`,
    },
    {
      title: "Changes to Terms",
      content: `We may update these Terms periodically. Continued use of the Services constitutes acceptance of any modifications.`,
    },
    {
      title: "Contact Us",
      sections: [
        {
          subtitle: "Email",
          content: `info@adoratech.ai`,
        },
        {
          subtitle: "Phone",
          content: `3065510212`,
        },
      ],
    },
  ];

  return (
    <main className="text-black px-4 pt-12 md:px-12 md:pt-20 xl:px-16">
      <h1 className="mb-10 text-center text-4xl font-bold md:text-7xl">
        Terms of use
      </h1>
      {termsOfUse.map((term, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h2 className="mb-5 mt-4 text-2xl font-semibold md:text-4xl ">
            {term.title}
          </h2>
          {term.content && <p>{term.content}</p>}
          {term.sections &&
            term.sections.map((section, idx) => (
              <div key={idx} style={{ marginLeft: "20px" }}>
                <h3 className="mb-5 mt-4 text-xl font-semibold md:text-3xl ">
                  {section.subtitle}
                </h3>
                {Array.isArray(section.content) ? (
                  <ul>
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{section.content}</p>
                )}
              </div>
            ))}
        </div>
      ))}
    </main>
  );
};

export default page;
