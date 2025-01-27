import { ResetPassword } from "@/emails/ResetPassword";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { ContactUs } from "./ContactUs";
import { SignUp } from "./SignUp";

// const resend = new Resend(env.EMAIL_SERVER_PASSWORD);
// create a nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT ?? "587", 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.RESEND_API_KEY,
  },
});

export async function sendVerificationEmail({
  to,
  token,
  name,
}: {
  to: string;
  token: string;
  name: string;
}) {
  const signUpHTML = render(SignUp({ token, name, email: to }));

  const mailOptions = {
    from: process.env.SMTP_FROM_EMAIL,
    to,
    subject: "Verify your email address",
    html: signUpHTML,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendResetPasswordEmail({
  to,
  token,
  name,
}: {
  to: string;
  token: string;
  name: string;
}) {
  const resetPasswordHTML = render(ResetPassword({ token, name }));
  const mailOptions = {
    from: process.env.SMTP_FROM_EMAIL,
    to,
    subject: "Password Reset Instructions",
    html: resetPasswordHTML,
  };
  await transporter.sendMail(mailOptions);
}

export async function sendContactUsEmail({
  message,
  name,
  phone,
  email,
  businessName,
}: {
  message: string;
  name: string;
  phone: string;
  email: string;
  businessName: string;
}) {
  const contactUsHTML = render(
    ContactUs({ message, name, phone, email, businessName }),
  );
  const mailOptions = {
    from: email,
    to: process.env.SMTP_FROM_EMAIL,
    subject: `Message from ${name}`,
    html: contactUsHTML,
  };
  await transporter.sendMail(mailOptions);
}
