ALTER TABLE "adora_agent" DROP CONSTRAINT "adora_agent_business_id_adora_business_id_fk";
--> statement-breakpoint
ALTER TABLE "adora_agent" ALTER COLUMN "telephone" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "adora_agent" ADD COLUMN "name" varchar(50);--> statement-breakpoint
ALTER TABLE "adora_agent" ADD COLUMN "assistant_id" varchar(50);--> statement-breakpoint
ALTER TABLE "adora_business" ADD COLUMN "agent_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "adora_knowledge_base" ADD COLUMN "url" text;--> statement-breakpoint
ALTER TABLE "adora_knowledge_base" ADD COLUMN "file_id" text;--> statement-breakpoint
ALTER TABLE "adora_knowledge_base" ADD COLUMN "size" integer;--> statement-breakpoint
ALTER TABLE "adora_knowledge_base" ADD COLUMN "original_name" text;--> statement-breakpoint
ALTER TABLE "adora_subscription" ADD COLUMN "currency" varchar(3) DEFAULT 'USD';--> statement-breakpoint
ALTER TABLE "adora_subscription" ADD COLUMN "payment_link" varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_business" ADD CONSTRAINT "adora_business_agent_id_adora_agent_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."adora_agent"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "adora_agent" DROP COLUMN IF EXISTS "business_id";--> statement-breakpoint
ALTER TABLE "adora_agent" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "adora_agent" DROP COLUMN IF EXISTS "updated_at";--> statement-breakpoint
ALTER TABLE "adora_knowledge_base" DROP COLUMN IF EXISTS "transcript";--> statement-breakpoint
ALTER TABLE "adora_subscription" DROP COLUMN IF EXISTS "plan_link";--> statement-breakpoint
ALTER TABLE "adora_agent" ADD CONSTRAINT "adora_agent_telephone_unique" UNIQUE("telephone");