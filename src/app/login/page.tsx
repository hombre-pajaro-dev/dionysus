"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "phone" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Error al enviar código");
        return;
      }
      setStep("otp");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Código inválido o expirado");
        return;
      }
      router.push("/");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  function resetToPhone() {
    setStep("phone");
    setCode("");
    setError("");
  }

  return (
    <div
      className="design-root ds-dark"
      style={{
        minHeight: "100dvh",
        background: "var(--paper)",
        color: "var(--ink)",
        display: "flex",
        flexDirection: "column",
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      {/* AppBar */}
      <div className="appbar">
        <div className="brand">
          <div className="logo">D</div>
          <span>Dionysus</span>
        </div>
        <span className="meta">LOGIN</span>
      </div>

      {/* Steps */}
      <div style={{ padding: "14px 16px 0" }}>
        <div className="steps">
          <i className="on" />
          <i className={step === "otp" ? "on" : ""} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column" }}>
        {step === "phone" ? (
          <form onSubmit={sendOtp}>
            <div className="kicker" style={{ marginBottom: 6 }}>Acceso</div>
            <h1 className="h1" style={{ marginBottom: 14 }}>Entra a la<br />comunidad</h1>
            <p className="body-sm muted" style={{ marginBottom: 24, lineHeight: 1.5 }}>
              Te enviamos un código de 6 dígitos por WhatsApp.<br />Sin contraseñas.
            </p>

            <div className="field">
              <label>WhatsApp</label>
              <input
                className="input"
                type="tel"
                placeholder="+52 55 1234 5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                autoFocus
                autoComplete="tel"
              />
              <span className="hint">Incluye el código de país · ej: +52</span>
            </div>

            {error && (
              <div
                className="mono body-sm"
                style={{ color: "var(--danger)", marginBottom: 12 }}
              >
                {error}
              </div>
            )}

            <button className="btn ink" type="submit" disabled={loading}>
              {loading ? "Enviando…" : "Continuar →"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp}>
            <div className="kicker" style={{ marginBottom: 6 }}>WhatsApp</div>
            <h1 className="h1" style={{ marginBottom: 12 }}>Te llegó<br />un código</h1>
            <p className="body-sm muted" style={{ marginBottom: 24, lineHeight: 1.5 }}>
              Enviamos 6 dígitos a {phone}.
            </p>

            {/* 6-digit display */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: 6,
                marginBottom: 20,
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    border: "2px solid var(--line)",
                    padding: "14px 0",
                    textAlign: "center",
                    fontFamily: "var(--display)",
                    fontSize: 22,
                    background: code[i] ? "var(--accent)" : "var(--paper)",
                    color: "var(--ink)",
                  }}
                >
                  {code[i] ?? "·"}
                </div>
              ))}
            </div>

            {/* Hidden actual input */}
            <div className="field">
              <label>Código</label>
              <input
                className="input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                placeholder="······"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                required
                autoFocus
                autoComplete="one-time-code"
              />
            </div>

            {error && (
              <div
                className="mono body-sm"
                style={{ color: "var(--danger)", marginBottom: 12 }}
              >
                {error}
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="btn ink" type="submit" disabled={loading || code.length < 6}>
                {loading ? "Verificando…" : "Confirmar →"}
              </button>
              <button type="button" className="btn ghost" onClick={resetToPhone}>
                Cambiar número
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Bottom bar */}
      <div
        className="mono body-sm muted"
        style={{
          padding: "12px 16px",
          borderTop: "2px solid var(--line)",
          textAlign: "center",
          letterSpacing: "0.06em",
        }}
      >
        POWERED BY DIONYSUS
      </div>
    </div>
  );
}
