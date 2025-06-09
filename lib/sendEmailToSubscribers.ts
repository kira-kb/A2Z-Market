import nodemailer from "nodemailer";
import prisma from "./prisma";
// import { Product } from "@/types"; // optional, based on your type setup

interface Product {
  id: string | null;
  name: string | null;
  description: string | null;
  price: number | null;
  stock: number | null;
  image: string[];
  type: string | null;
  subCategory: string | null;
  brands: string | null;
  conditions: string | null;
}

// Replace with Prisma query in production
const getAllEmails = async (): Promise<string[]> => {
  const subscribers = await prisma.subscription
    .findMany({
      where: { notification: true },
      select: { email: true },
    })
    .then((subs) => subs.map((sub) => sub.email));

  return subscribers;
  // return ["kirubelbewket@gmail.com"];
};

// -----------------------------
// Generate Email HTML Template
// -----------------------------
export const generateEmailHTML = (product: Product) => {
  const safeName = product.name || "New Product";
  const safeDescription = product.description || "No description provided.";
  const safePrice =
    product.price !== null ? `$${product.price}` : "Price not available";
  const productUrl = `https://a2z-market.vercel.app/shop/${product.id}`;

  console.log("images: ", product.image);

  const imagesHTML = product.image
    .map(
      (img) => `
      <td style="padding: 6px;">
        <img src="https://a2z-market.vercel.app/api/telegram-file?fileId="${img}" alt="${safeName}" width="150" style="border-radius: 8px; max-width: 100%;" />
      </td>`
    )
    .join("");

  return `
    <div style="font-family: Helvetica, Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 24px; border-radius: 12px;">
        <h2 style="color: #4F46E5;">🛍️ ${safeName}</h2>
        <p style="font-size: 16px; color: #444;">${safeDescription}</p>
        <p style="font-size: 18px; color: #10B981; font-weight: bold;">${safePrice}</p>
        ${
          product.image.length
            ? `<table><tr>${imagesHTML}</tr></table>`
            : `<p style="color: #888;">No images provided.</p>`
        }

        <div style="margin-top: 20px;">
          <a href="${productUrl}"
             style="display: inline-block; background: #4F46E5; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none;">
             🔎 View Product
          </a>
        </div>

        <p style="font-size: 12px; color: #aaa; margin-top: 40px;">
          You’re receiving this because you subscribed to A2Z Market updates.
        </p>
      </div>
    </div>
  `;
};

// -------------------------------------
// Main Function to Send Email Broadcast
// -------------------------------------
export const sendEmailToSubscribers = async (product: Product) => {
  const emails = await getAllEmails();
  if (!emails.length) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"A2Z Market" <${process.env.EMAIL_USER}>`,
    bcc: emails, // 👈 safer and hides recipients
    subject: `🛒 New Product: ${product.name ?? "Check it out!"}`,
    html: generateEmailHTML(product),
  };

  // Optional: Wrap this in a queue or a background job system
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("❌ Failed to send email:", err);
    } else {
      console.log("✅ Email sent to subscribers:", info.accepted);
    }
  });
};

// ?????????????????????????????????????????????????
// ?????????????????????????????????????????????????

// import nodemailer from "nodemailer";
// // import prisma from "./prisma";
// // import { Product } from "@/types"; // Adjust if needed

// interface Product {
//   id: string | null;
//   name: string | null;
//   description: string | null;
//   price: number | null;
//   stock: number | null;
//   image: string[];
//   //   categories: { name: string }[];
//   type: string | null;
//   subCategory: string | null;
//   brands: string | null;
//   conditions: string | null;
// }

// // Dummy email list for now — replace with DB call if needed
// const getAllEmails = async (): Promise<string[]> => {
//   // You can replace this with a DB query like: await prisma.subscriber.findMany()
//   return ["kirubelbewket@gmail.com"];
// };

// // HTML template generator
// // const generateEmailHTML = (product: Product) => `
// //   <div style="font-family: sans-serif; line-height: 1.6;">
// //     <h2>🛍️ New Product Alert: ${product.name}</h2>
// //     <img src="${product.image?.[0] || "#"}" alt="${
// //       product.name
// //     }" style="max-width: 100%; height: auto;" />
// //     <p><strong>Description:</strong> ${product.description}</p>
// //     <p><strong>Price:</strong> $${product.price}</p>
// //     <a href="https://a2zmarket.com/products/${
// //       product.id
// //     }" target="_blank" style="background: #4F46E5; color: white; padding: 10px 16px; text-decoration: none; border-radius: 5px;">View Product</a>
// //   </div>
// // `;

// export const generateEmailHTML = (product: {
//   name: string | null;
//   description: string | null;
//   price: number | null;
//   id: string | null;
//   image: string[];
// }) => {
//   const imagesHTML = product.image
//     .map(
//       (img) => `
//         <td style="padding: 10px;">
//           <img src="${img}" alt="${product.name}" style="max-width: 100%; border-radius: 8px;" width="150" />
//         </td>
//       `
//     )
//     .join("");

//   return `
//   <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
//     <h2 style="color: #4F46E5;">🆕 New Product Added: ${product.name}</h2>

//     <p style="font-size: 16px;">${product.description}</p>
//     <p style="font-size: 18px; font-weight: bold;">Price: $${product.price}</p>

//     ${
//       product.image?.length
//         ? `
//     <table role="presentation" cellspacing="0" cellpadding="0" border="0">
//       <tr>${imagesHTML}</tr>
//     </table>`
//         : ""
//     }

//     <div style="margin-top: 20px;">
//       <a href="https://a2zmarket.com/products/${product.id}"
//          style="display: inline-block; padding: 12px 20px; background-color: #4F46E5; color: #fff; text-decoration: none; border-radius: 6px;">
//          View Product
//       </a>
//     </div>

//     <p style="font-size: 12px; color: #888; margin-top: 30px;">
//       You're receiving this email because you're subscribed to A2Z Market.
//     </p>
//   </div>
//   `;
// };

// export const sendEmailToSubscribers = async (product: Product) => {
//   const emails = await getAllEmails();
//   if (!emails.length) return;

//   const transporter = nodemailer.createTransport({
//     service: "gmail", // or use "smtp"
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"A2Z Market" <${process.env.EMAIL_USER}>`,
//     to: emails, // array or comma-separated string
//     subject: `🛒 New Product: ${product.name}`,
//     html: generateEmailHTML(product),
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("✅ Emails sent to subscribers.");
//   } catch (error) {
//     console.error("❌ Error sending emails:", error);
//   }
// };
