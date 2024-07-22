CREATE TABLE IF NOT EXISTS "adora_user_business" (
	"user_id" text NOT NULL,
	"business_id" text NOT NULL,
	CONSTRAINT "adora_user_business_user_id_business_id_unique" UNIQUE("user_id","business_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_user_business" ADD CONSTRAINT "adora_user_business_user_id_adora_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."adora_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_user_business" ADD CONSTRAINT "adora_user_business_business_id_adora_business_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."adora_business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
