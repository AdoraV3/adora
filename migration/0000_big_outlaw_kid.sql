CREATE TABLE IF NOT EXISTS "adora_account" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"account_type" text DEFAULT 'email' NOT NULL,
	"google_id" text,
	"password" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "adora_account_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adora_account_preference" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"theme" text,
	"language" text,
	"timezone" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adora_agent" (
	"id" text PRIMARY KEY NOT NULL,
	"language" text DEFAULT 'english' NOT NULL,
	"voice_id" text NOT NULL,
	"provider" varchar(200),
	"name" varchar(50),
	"assistant_id" varchar(50),
	"phone_number_id" text NOT NULL,
	"category_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
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
CREATE TABLE IF NOT EXISTS "adora_business" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"logo" varchar(255),
	"stripe_customer_id" varchar(255),
	"customer_base" integer,
	"country" varchar(255),
	"subscription_start_date" timestamp DEFAULT now() NOT NULL,
	"subscription_end_date" timestamp DEFAULT now() NOT NULL,
	"subscription_id" text NOT NULL,
	"agent_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adora_call_log" (
	"id" text PRIMARY KEY NOT NULL,
	"agent_name" varchar(255),
	"transcript" text,
	"business_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adora_knowledge_base" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text,
	"file_id" text,
	"size" integer,
	"original_name" text,
	"business_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adora_profile" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" varchar(255) NOT NULL,
	"bio" text,
	"avatar" text,
	"phone" varchar,
	"country" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adora_reset_token" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token" varchar,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adora_session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adora_subscription" (
	"id" text PRIMARY KEY NOT NULL,
	"subscription_plan" varchar DEFAULT 'basic',
	"subscription_period" varchar DEFAULT 'monthly',
	"amount" integer DEFAULT 0,
	"currency" varchar(3) DEFAULT 'USD',
	"price_id" varchar(255),
	"payment_link" varchar(255),
	"payment_provider" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adora_system_prompt" (
	"id" text PRIMARY KEY NOT NULL,
	"label" text,
	"value" text,
	"system_prompt" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adora_user" (
	"id" text PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "adora_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adora_user_business" (
	"user_id" text NOT NULL,
	"business_id" text NOT NULL,
	CONSTRAINT "adora_user_business_user_id_business_id_unique" UNIQUE("user_id","business_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adora_verify_email_token" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token" text,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
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
DO $$ BEGIN
 ALTER TABLE "adora_account" ADD CONSTRAINT "adora_account_user_id_adora_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."adora_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_account_preference" ADD CONSTRAINT "adora_account_preference_user_id_adora_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."adora_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
DO $$ BEGIN
 ALTER TABLE "adora_agent" ADD CONSTRAINT "adora_agent_category_id_adora_system_prompt_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."adora_system_prompt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_business" ADD CONSTRAINT "adora_business_user_id_adora_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."adora_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_business" ADD CONSTRAINT "adora_business_subscription_id_adora_subscription_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."adora_subscription"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_business" ADD CONSTRAINT "adora_business_agent_id_adora_agent_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."adora_agent"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_call_log" ADD CONSTRAINT "adora_call_log_business_id_adora_business_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."adora_business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_knowledge_base" ADD CONSTRAINT "adora_knowledge_base_business_id_adora_business_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."adora_business"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_profile" ADD CONSTRAINT "adora_profile_user_id_adora_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."adora_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_reset_token" ADD CONSTRAINT "adora_reset_token_user_id_adora_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."adora_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_session" ADD CONSTRAINT "adora_session_user_id_adora_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."adora_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adora_verify_email_token" ADD CONSTRAINT "adora_verify_email_token_user_id_adora_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."adora_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
