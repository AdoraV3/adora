"use client";

import {
  createKnowledgeBaseAction,
  deleteKnowledgeBaseAction,
  getKnowledgeBaseAction,
} from "@/app/actions/knowledgeBase";
import { Label } from "@/components/ui/label";
import {
  useServerActionMutation,
  useServerActionQuery,
} from "@/lib/hooks/server-action-hooks";
import { FileUpload } from "@/modules/commons/components";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FileUploadSchema } from "../validation";
import { ViewKnowledgeBase } from "./ViewKnowledgeBase";

const knowledgeBaseData = [
  {
    title: "Introduction",
    content:
      "Welcome to the Adora Knowledge Base setup guide. This guide will help you create a structured and effective knowledge base for your company, ensuring smooth customer support and AI-driven responses.",
  },
  {
    title: "1. Getting Started",
    content: [
      {
        subTitle: "What is a Knowledge Base?",
        text: "A knowledge base is a centralized repository of information about your company, products, and services. It helps customers find answers quickly and supports AI-driven interactions in Adora.",
      },
      {
        subTitle: "Why Use a Knowledge Base?",
        text: [
          "• Reduces support inquiries by providing self-service answers.",
          "• Improves AI responses by offering structured information.",
          "• Enhances customer experience with clear, accessible knowledge.",
        ],
      },
    ],
  },
  {
    title: "2. Structuring Your Knowledge Base",
    content: [
      {
        subTitle: "Recommended Categories",
        text: [
          "• General Information: Overview of your company, mission, and policies.",
          "• Products & Services: Details about offerings, features, and usage.",
          "• Billing & Payments: Pricing plans, invoices, and refund policies.",
          "• Troubleshooting & FAQs: Common issues and step-by-step solutions.",
          "• Contact & Support: Ways to reach your team for further help.",
        ],
      },
      {
        subTitle: "Creating Articles",
        text: [
          "Each article should include:",
          "• Title: Clear and concise topic name.",
          "• Overview: Brief explanation of what the article covers.",
          "• Step-by-Step Guide: Instructions to resolve issues or use features.",
          "• FAQs: Answers to related common questions.",
          "• Related Articles: Links to additional resources.",
        ],
      },
    ],
  },
  {
    title: "3. Maintaining Your Knowledge Base",
    content: [
      {
        subTitle: "Regular Updates",
        text: "Keep articles accurate and relevant.",
      },
      {
        subTitle: "Monitor Feedback",
        text: "Use customer queries to refine content.",
      },
      {
        subTitle: "Expand FAQs",
        text: "Add answers to recurring questions.",
      },
    ],
  },
  {
    title: "Need Help?",
    content:
      "If you have any questions or need assistance, contact Adora Support at info@adora3.com +13065510212 or visit our Help Center at www.adora3.com.",
  },
];

export function CreateKnowledgeBase() {
  const [hasFile, setHasFile] = useState(false);
  const createKnowledgeBaseHandler = useServerActionMutation(
    createKnowledgeBaseAction,
    {
      onSuccess: () =>
        toast.success("Successfully added!", {
          description: "You have successfully updated your knowledge base",
        }),
      onError: error => {
        toast.error(error?.message);
      },
    },
  );

  const onFileUploadSuccess = (data: FileUploadSchema) => {
    createKnowledgeBaseHandler.mutate(data);
  };

  const { data: knowledgeBase } = useServerActionQuery(getKnowledgeBaseAction, {
    queryKey: ["knowledgeBase"],
    input: undefined,
  });

  useEffect(() => {
    if (knowledgeBase?.data?.fileId) {
      setHasFile(true);
    }
  }, [knowledgeBase?.data?.fileId]);

  const deleteKnowledgeBaseHandler = useServerActionMutation(
    deleteKnowledgeBaseAction,
    {
      onSuccess: () => {
        toast.success("Successfully Deleted!", {
          description: "You have successfully deleted the knowledge base.",
        });
        setHasFile(false);
      },
      onError: error => {
        toast.error(error?.message);
      },
    },
  );

  return (
    <section className="space-y-3">
      {hasFile ? (
        <div>
          <ViewKnowledgeBase
            isLoading={deleteKnowledgeBaseHandler.isPending}
            file={{
              name: knowledgeBase?.data?.originalName ?? "",
              size: knowledgeBase?.data?.size ?? 0,
              url: knowledgeBase?.data?.url ?? "",
            }}
            handleDelete={() => deleteKnowledgeBaseHandler.mutate(undefined)}
          />
          <div className="px-6 pt-3">
            {knowledgeBaseData.map(section => (
              <div key={section.title}>
                <h2>{section.title}</h2>
                {Array.isArray(section.content) ? (
                  section.content.map(subSection => (
                    <div key={subSection.subTitle}>
                      {subSection.subTitle && <h3>{subSection.subTitle}</h3>}
                      {Array.isArray(subSection.text) ? (
                        <ul>
                          {subSection.text.map(item => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{subSection.text}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>{section.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="col-span-2 max-w-4xl space-y-2">
          <h4 className="my-3 font-satoshi text-base font-medium text-black-100 underline underline-offset-2">
            Customer Support Knowledge Base
          </h4>
          <Label className="font-satoshi text-base font-normal text-[hsla(0,0%,11%,0.8)]">
            Upload Knowledge Base
          </Label>

          <FileUpload onSuccess={onFileUploadSuccess} />
        </div>
      )}
    </section>
  );
}
