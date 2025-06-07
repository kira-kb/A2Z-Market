"use server";

import nodemailer from "nodemailer";

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    throw new Error(
      "SMTP environment variables are not set (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)"
    );
  }
  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM environment variable is not set");
  }

  // Create the transporter object with SMTP transport configuration
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., "smtp.gmail.com"
    port: parseInt(process.env.SMTP_PORT || "587"), // e.g., 587 for TLS or 465 for SSL
    secure: process.env.SMTP_PORT === "465", // true if port is 465, false otherwise
    auth: {
      user: process.env.SMTP_USER, // e.g., your email address
      pass: process.env.SMTP_PASS, // e.g., your email password or app-specific password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM, // Sender email address
    to: to.toLowerCase().trim(), // Recipient email address
    subject: subject.trim(), // Email subject
    text: text.trim(), // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    return {
      success: true,
      messageId: info.messageId, // The message ID from nodemailer
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    };
  }
}
