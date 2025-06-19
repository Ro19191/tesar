// pages/api/auth.ts

import type { NextApiRequest, NextApiResponse } from "next";

// Le même mot de passe que dans admin.tsx
const ADMIN_PASSWORD = "Belleville75!";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Mot de passe manquant" });
  }

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Mot de passe incorrect" });
  }

  // Ici on pourrait retourner un token ou flag pour session
  return res.status(200).json({ success: true });
}
