import * as z from "zod";

export const authSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(100, {
      message: "Password must be at most 100 characters long",
    }),
});

export type AuthSchemaType = z.infer<typeof authSchema>;

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: "Verification code must be 6 characters long",
    })
    .max(6),
});

export const emailSchema = z.object({
  email: authSchema.shape.email,
});

export type EmailSchemaType = z.infer<typeof emailSchema>;

export const resetPasswordSchema = z
  .object({
    password: authSchema.shape.password,
    confirmPassword: authSchema.shape.password,
    code: verifyEmailSchema.shape.code,
  })
  .refine(data => data.password === data.confirmPassword, {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export const registerSchema = z
  .object({
    email: authSchema.shape.email,
    password: authSchema.shape.password,
    confirmPassword: authSchema.shape.password,
    businessName: z
      .string()
      .min(3, {
        message: "Business name must be at least 3 characters long",
      })
      .max(100),
    category: z.string(),
    name: z
      .string()
      .min(3, {
        message: "Full name must be at least 3 characters long",
      })
      .max(100),
    agentName: z
      .string()
      .min(3, {
        message: "Agent name must be at least 3 characters long",
      })
      .max(100),
    voice: z.string(),
    phone: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .min(4, {
      message: "OTP must be 4 characters long",
    })
    .max(4),
});

export type OtpSchemaType = z.infer<typeof otpSchema>;

export const changePasswordSchema = z
  .object({
    oldPassword: authSchema.shape.password,
    password: authSchema.shape.password,
    confirmPassword: authSchema.shape.password,
    token: z.string().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
