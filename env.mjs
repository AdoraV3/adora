import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    SMTP_HOST: z.string().min(1),
    SMTP_FROM_EMAIL: z.string().min(1),
    SMTP_USERNAME: z.string().min(1),
    SMTP_PORT: z.string().min(1),
    SMTP_SECURE: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    DB_MIGRATING: z.string().default("false"),
    DB_SEEDING: z.string().default("false"),
  },
  client: {
    NEXT_PUBLIC_URL: z.string().url(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    DB_MIGRATING: process.env.DB_MIGRATING,
    DB_SEEDING: process.env.DB_SEEDING,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    // HOST_NAME: process.env.HOST_NAME,
    // EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SECURE: process.env.SMTP_SECURE,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
});
