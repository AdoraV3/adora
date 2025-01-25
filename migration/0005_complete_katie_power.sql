ALTER TABLE "adora_business" ALTER COLUMN "is_free_trial" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "adora_business" ADD COLUMN "is_profile_completed" boolean DEFAULT false;