// pages/api/payment-intent.ts

import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { amount, currency = "eur", metadata = {} } = req.body;

  if (!amount || isNaN(amount)) {
    return res.status(400).json({ message: "Montant invalide ou manquant." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(amount) * 100), // € → centimes
      currency,
      metadata,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("Erreur Stripe PaymentIntent:", error);
    res.status(500).json({ message: "Erreur lors de la création du paiement." });
  }
}
