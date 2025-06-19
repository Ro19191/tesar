// Page de confirmation après paiement// pages/thank-you.tsx

import Head from "next/head";
import Link from "next/link";

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Merci pour votre commande – Mina Paris</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white">
        <h1 className="text-3xl font-bold mb-4">🎉 Merci pour votre commande !</h1>
        <p className="text-lg mb-6">
          Vous allez recevoir un email avec le résumé de votre commande ainsi qu'un lien de suivi d’expédition.
        </p>
        <p className="text-base mb-10">
          Si vous avez des questions, contactez-nous sur TikTok ou par email.
        </p>
        <Link
          href="/checkout"
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
        >
          Retour à l’accueil
        </Link>
      </main>
    </>
  );
}
