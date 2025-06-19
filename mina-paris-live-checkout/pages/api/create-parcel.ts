// pages/api/create-parcel.ts

import type { NextApiRequest, NextApiResponse } from "next";

const SENDCLOUD_API_KEY = process.env.SENDCLOUD_PUBLIC_KEY!;
const SENDCLOUD_API_SECRET = process.env.SENDCLOUD_SECRET_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const {
    name,
    address,
    city,
    postalCode,
    country = "FR",
    phone,
    email,
    orderNumber,
    weight = 500, // en grammes
  } = req.body;

  try {
    const response = await fetch("https://panel.sendcloud.sc/api/v2/parcels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(`${SENDCLOUD_API_KEY}:${SENDCLOUD_API_SECRET}`).toString("base64"),
      },
      body: JSON.stringify({
        parcel: {
          name,
          address,
          city,
          postal_code: postalCode,
          country,
          telephone: phone,
          email,
          order_number: orderNumber,
          weight,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur Sendcloud :", data);
      return res.status(500).json({ message: "Erreur lors de la création du colis Sendcloud", error: data });
    }

    return res.status(200).json({ message: "Colis créé avec succès", data });
  } catch (err) {
    console.error("Erreur API:", err);
    return res.status(500).json({ message: "Erreur interne serveur", error: err });
  }
}
