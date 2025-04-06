ALTER TABLE "adora_business" ALTER COLUMN "subscription_start_date" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "adora_business" ALTER COLUMN "subscription_start_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "adora_business" ALTER COLUMN "subscription_end_date" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "adora_business" ALTER COLUMN "subscription_end_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "adora_business" ALTER COLUMN "subscription_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "adora_business" ALTER COLUMN "agent_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "adora_subscription" ADD COLUMN "description" text DEFAULT '';