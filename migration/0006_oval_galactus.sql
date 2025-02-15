ALTER TABLE "adora_knowledge_base" ADD COLUMN "vapi_knowledge_base_id" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "adora_knowledge_base" ADD COLUMN "vapi_file_id" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "adora_voice" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "adora_voice" DROP COLUMN IF EXISTS "language";