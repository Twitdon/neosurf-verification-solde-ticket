"use client";

import { useEffect, useState } from "react";

type CodeItem = {
  id: number;
  code: string;
  created_at: string;
};

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [codes, setCodes] = useState<CodeItem[]>([]);

  const checkPassword = () => {
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (password === adminPassword) {
      setAuthorized(true);
      sessionStorage.setItem("admin-auth", "ok");
      sessionStorage.setItem("admin-password", password);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  const fetchCodes = async () => {
    const savedPassword = sessionStorage.getItem("admin-password");

    const res = await fetch(
      `/api/admin-codes?password=${encodeURIComponent(savedPassword || "")}`
    );

    const json = await res.json();

    if (res.ok) {
      setCodes(json.codes || []);
    } else {
      console.error(json.error);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("admin-auth");
    if (saved === "ok") {
      setAuthorized(true);
    }
  }, []);

  useEffect(() => {
    if (!authorized) return;

    fetchCodes();

    const interval = setInterval(() => {
      fetchCodes();
    }, 3000);

    return () => clearInterval(interval);
  }, [authorized]);

  if (!authorized) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#e9ecef",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "#fff",
            borderRadius: "6px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            padding: "30px",
          }}
        >
          <h1
            style={{
              marginTop: 0,
              marginBottom: "20px",
              fontSize: "26px",
              textAlign: "center",
            }}
          >
            Accès admin
          </h1>

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              height: "48px",
              padding: "0 14px",
              fontSize: "16px",
              border: "1px solid #cfd4da",
              borderRadius: "4px",
              marginBottom: "16px",
              boxSizing: "border-box",
            }}
          />

          <button
            onClick={checkPassword}
            style={{
              width: "100%",
              height: "48px",
              background: "#212853",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Se connecter
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#e9ecef",
        fontFamily: "Arial, sans-serif",
        padding: "30px 16px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "6px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#212853",
            color: "#fff",
            padding: "20px 24px",
            fontSize: "24px",
            fontWeight: 700,
          }}
        >
          Admin - Codes reçus
        </div>

        <div style={{ padding: "20px 24px" }}>
          {codes.length === 0 ? (
            <p>Aucun code reçu pour le moment.</p>
          ) : (
            codes.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 0",
                  borderBottom: "1px solid #e5e7eb",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#111",
                  }}
                >
                  {item.code}
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    whiteSpace: "nowrap",
                  }}
                >
                  {new Date(item.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}