// pages/admin.tsx

import { useState } from "react";

const ADMIN_PASSWORD = "Belleville75!"; // Mot de passe sécurisé

export default function AdminPage() {
  const [isLogged, setIsLogged] = useState(false);
  const [password, setPassword] = useState("");

  const [orders, setOrders] = useState<any[]>([]); // à remplacer par des vraies données si tu ajoutes un stockage

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsLogged(true);
      fetchOrders(); // simulate load
    } else {
      alert("Mot de passe incorrect.");
    }
  };

  const fetchOrders = () => {
    // Simule des commandes fictives (remplacer par appel API ou lecture JSON)
    setOrders([
      {
        name: "tiktok_user123",
        reference: "PANT01",
        price: "29€",
        email: "client@example.com",
        address: "12 rue des Fleurs, Paris",
        status: "Payé",
      },
    ]);
  };

  if (!isLogged) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <h1 className="text-2xl font-bold mb-4">Espace admin Mina Paris</h1>
        <input
          type="password"
          placeholder="Mot de passe"
          className="border px-4 py-2 rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-black text-white px-6 py-2 rounded-full"
          onClick={handleLogin}
        >
          Se connecter
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">Commandes reçues</h1>
      {orders.length === 0 ? (
        <p>Aucune commande pour le moment.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Nom TikTok</th>
              <th className="p-2">Référence</th>
              <th className="p-2">Prix</th>
              <th className="p-2">Email</th>
              <th className="p-2">Adresse</th>
              <th className="p-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{order.name}</td>
                <td className="p-2">{order.reference}</td>
                <td className="p-2">{order.price}</td>
                <td className="p-2">{order.email}</td>
                <td className="p-2">{order.address}</td>
                <td className="p-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
