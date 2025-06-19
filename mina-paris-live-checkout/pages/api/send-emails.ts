// pages/api/send-emails.ts

import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import { PassThrough } from "stream";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const {
    clientName,
    tiktokName,
    email,
    reference,
    price,
    address,
    postalCode,
    city,
  } = req.body;

  try {
    // 1. Crée le PDF en mémoire
    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      const doc = new PDFDocument();
      const buffers: Buffer[] = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);

      doc.fontSize(20).text("Facture - Mina Paris", { align: "center" });
      doc.moveDown();
      doc.fontSize(12);
      doc.text(`Nom TikTok : ${tiktokName}`);
      doc.text(`Nom : ${clientName}`);
      doc.text(`Email : ${email}`);
      doc.text(`Adresse : ${address}, ${postalCode} ${city}`);
      doc.moveDown();
      doc.text(`Article : ${reference}`);
      doc.text(`Prix : ${price} €`);
      doc.moveDown();
      doc.text(`Merci pour votre commande ❤️`, { align: "center" });

      doc.end();
    });

    // 2. Configurer le transport d'email
    const transporter = nodemailer.createTransport({
      service: "gmail", // ou smtp
      auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASS,
      },
    });

    const mailOptions = {
      from: `"Mina Paris" <${process.env.EMAIL_SERVICE_USER}>`,
      to: `${email}, ${process.env.ADMIN_EMAIL}`,
      subject: `Confirmation de commande - Mina Paris`,
      text: `Bonjour ${clientName},\n\nMerci pour votre commande !\nRéférence : ${reference} - Prix : ${price}€\n\nVous trouverez la facture en pièce jointe.\n\n- L'équipe Mina Paris`,
      attachments: [
        {
          filename: `facture-${reference}.pdf`,
          content: pdfBuffer,
        },
      ],
    };

    // 3. Envoi
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Erreur envoi email:", err);
    res.status(500).json({ message: "Échec de l'envoi d'email" });
  }
}
