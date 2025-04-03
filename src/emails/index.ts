import { render } from "@react-email/render";
import sgMail from "@sendgrid/mail";
import { env } from "env.mjs";
import { Resend } from "resend";
import { ContactUs } from "./ContactUs";
import { ResetPassword } from "./ResetPassword";
import { SignUp } from "./SignUp";

sgMail.setApiKey(env.SENDGRID_API_KEY ?? "");

export const maxDuration = 60;

const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationEmail({
  to,
  token,
  name,
}: {
  to: string;
  token: string;
  name: string;
}) {
  try {
    const signUpHTML = render(SignUp({ token, name, email: to }));
    const mailOptions = {
      from: env.SMTP_FROM_EMAIL,
      to,
      subject: "Verify your email address",
      html: signUpHTML,
    };
    const response = await resend.emails.send(mailOptions);
    console.error("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
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
    from: env.SMTP_FROM_EMAIL,
    to,
    subject: "Password Reset Instructions",
    html: resetPasswordHTML,
  };
  await resend.emails.send(mailOptions);
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
    from: env.SMTP_FROM_EMAIL,
    to: env.SMTP_FROM_EMAIL,
    subject: `Message from ${name}`,
    html: contactUsHTML,
    replyTo: email,
  };
  await resend.emails.send(mailOptions);
}
