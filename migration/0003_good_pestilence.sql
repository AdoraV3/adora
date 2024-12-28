ALTER TABLE "adora_voice" RENAME COLUMN "label" TO "name";--> statement-breakpoint
ALTER TABLE "adora_voice" ALTER COLUMN "name" SET NOT NULL;