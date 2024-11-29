ALTER TABLE "adora_agent" ADD COLUMN "category_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "adora_subscription" ADD COLUMN "features" text[] DEFAULT ;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_agent" ADD CONSTRAINT "adora_agent_category_id_adora_system_prompt_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."adora_system_prompt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
