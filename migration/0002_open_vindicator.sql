CREATE TABLE IF NOT EXISTS "adora_available_phone_numbers" (
	"id" text PRIMARY KEY NOT NULL,
	"phone_number" varchar(50) NOT NULL,
	"is_assigned" boolean DEFAULT false NOT NULL,
	"date_assigned" timestamp,
	"vapi_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adora_system_prompt" (
	"id" text PRIMARY KEY NOT NULL,
	"label" text,
	"value" text,
	"system_prompt" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adora_voice" (
	"id" text PRIMARY KEY NOT NULL,
	"label" text,
	"language" text DEFAULT 'english',
	"gender" text DEFAULT 'male',
	"provider" text NOT NULL,
	"created_voice_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "adora_agent" DROP CONSTRAINT "adora_agent_telephone_unique";--> statement-breakpoint
ALTER TABLE "adora_agent" ADD COLUMN "voice_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "adora_agent" ADD COLUMN "provider" varchar(200);--> statement-breakpoint
ALTER TABLE "adora_agent" ADD COLUMN "phone_number_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "adora_agent" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "adora_agent" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_agent" ADD CONSTRAINT "adora_agent_voice_id_adora_voice_id_fk" FOREIGN KEY ("voice_id") REFERENCES "public"."adora_voice"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_agent" ADD CONSTRAINT "adora_agent_phone_number_id_adora_available_phone_numbers_id_fk" FOREIGN KEY ("phone_number_id") REFERENCES "public"."adora_available_phone_numbers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "adora_agent" DROP COLUMN IF EXISTS "voice";--> statement-breakpoint
ALTER TABLE "adora_agent" DROP COLUMN IF EXISTS "telephone";