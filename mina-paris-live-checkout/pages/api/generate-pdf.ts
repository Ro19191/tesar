// pages/api/generate-pdf.ts

import type { NextApiRequest, NextApiResponse } from "next";
import PDFDocument from "pdfkit";
import { PassThrough } from "stream";

// Fonction API Next.js : retourne un PDF directement
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const {
    tiktokName,
    reference,
    price,
    clientName,
    email,
    address,
    postalCode,
    city,
  } = req.body;

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const stream = new PassThrough();

  res.setHeader("Content-disposition", "inline; filename=facture-mina-paris.pdf");
  res.setHeader("Content-type", "application/pdf");

  doc.pipe(stream);

  // Contenu de la facture
  doc.fontSize(20).text("Facture - Mina Paris", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Client TikTok : ${tiktokName}`);
  doc.text(`Nom : ${clientName}`);
  doc.text(`Email : ${email}`);
  doc.text(`Adresse : ${address}, ${postalCode} ${city}`);
  doc.moveDown();

  doc.text(`Référence article : ${reference}`);
  doc.text(`Prix : ${price} €`);
  doc.moveDown();

  doc.text(`Date : ${new Date().toLocaleDateString("fr-FR")}`);
  doc.moveDown();
  doc.text("Merci pour votre commande ! ❤️", { align: "center" });

  doc.end();

  stream.pipe(res);
}
