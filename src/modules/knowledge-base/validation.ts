import { z } from "zod";
import {
  ACCEPTED_KNOWLEDGE_BASE_TYPES,
  MAX_FILE_SIZE,
  REQUIRED_FIELD,
} from "../commons/utils/constant";

export const knowledgeBaseSchema = z.object({
  fileId: z.string().max(100),
  url: z.string().min(1, REQUIRED_FIELD).max(50).url(),
});
export const createKnowledgeBaseSchema = z.object({
  file: z
    .any()
    .refine(files => files?.length === 0, "Knowledge base is required")
    .refine(files => files?.[0]?.size >= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine(
      files => ACCEPTED_KNOWLEDGE_BASE_TYPES.includes(files?.[0]?.type),
      ".docx,.pdf, .jpeg, files are accepted.",
    ),

  // file: z.any(),
});

export type CreateKnowledgeBaseSchemaType = z.infer<
  typeof createKnowledgeBaseSchema
>;

export const fileUploadSchema = z.object({
  id: z.string(),
  url: z.string(),
  originalName: z.string(),
  size: z.number(),
});

export type FileUploadSchema = z.infer<typeof fileUploadSchema>;
