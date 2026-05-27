"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type VenueInfo = {
  id: string;
  name: string;
  description: string | null;
  manifesto: string | null;
  visibility: string;
};

type Step = "form" | "otp" | "done";

export default function InvitePage() {
  const { token } = useParams<{ token: string }>();

  const [venue, setVenue] = useState<VenueInfo | null>(null);
  const [exhausted, setExhausted] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [loadingVenue, setLoadingVenue] = useState(true);

  // Form fields
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [howHeard, setHowHeard] = useState("");
  const [whyJoin, setWhyJoin] = useState("");
  const [artPractice, setArtPractice] = useState("");
  const [manifestoRead, setManifestoRead] = useState(false);

  // OTP step
  const [otpCode, setOtpCode] = useState("");

  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/invite/${token}`)
      .then(async (res) => {
        if (res.status === 404) { setNotFound(true); return; }
        const data = await res.json();
        setVenue(data.venue);
        setExhausted(data.exhausted);
      })
      .finally(() => setLoadingVenue(false));
  }, [token]);

  async function submitRegistration(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/invite/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name, howHeard: howHeard || undefined, whyJoin: whyJoin || undefined, artPractice: artPractice || undefined }),
      });
      if (res.status === 404) { setError("Liga de invitación no válida"); return; }
      if (res.status === 409) { setError("Esta liga ya fue utilizada"); return; }
      if (!res.ok) { setError("Error al registrar solicitud"); return; }

      // Auto-send OTP to verify identity
      const otpRes = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      if (!otpRes.ok) { setError("Registro exitoso pero error al enviar código WhatsApp. Ve a iniciar sesión."); return; }

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
        body: JSON.stringify({ phone, code: otpCode }),
      });
      if (!res.ok) { setError("Código inválido o expirado"); return; }
      setStep("done");
    } finally {
      setLoading(false);
    }
  }

  // ─── Loading ───────────────────────────────────────────────────────────────

  if (loadingVenue) {
    return (
      <div className="design-root ds-dark" style={{ minHeight: "100dvh", background: "var(--paper)", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="mono body-sm muted">Cargando…</span>
      </div>
    );
  }

  // ─── Error states ──────────────────────────────────────────────────────────

  if (notFound || exhausted) {
    return (
      <div className="design-root ds-dark" style={{ minHeight: "100dvh", background: "var(--paper)", color: "var(--ink)", display: "flex", flexDirection: "column", maxWidth: 480, margin: "0 auto" }}>
        <div className="appbar">
          <div className="brand"><div className="logo">D</div><span>Dionysus</span></div>
        </div>
        <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
          <div className="kicker" style={{ color: "var(--danger)" }}>Liga inválida</div>
          <h1 className="h1">{exhausted ? "Liga ya utilizada" : "Liga no encontrada"}</h1>
          <p className="body-sm muted">
            {exhausted
              ? "Esta liga de invitación ya fue usada. Pide una nueva al organizador."
              : "El enlace no existe o expiró. Pide una nueva liga al organizador."}
          </p>
          <Link href="/login"><button className="btn ink" type="button">Iniciar sesión →</button></Link>
        </div>
      </div>
    );
  }

  // ─── Done ─────────────────────────────────────────────────────────────────

  if (step === "done") {
    return (
      <div className="design-root ds-dark" style={{ minHeight: "100dvh", background: "var(--paper)", color: "var(--ink)", display: "flex", flexDirection: "column", maxWidth: 480, margin: "0 auto" }}>
        <div className="appbar">
          <div className="brand"><div className="logo">D</div><span>Dionysus</span></div>
          <span className="meta">BIENVENIDO</span>
        </div>
        <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
          <div className="kicker" style={{ color: "var(--ok)" }}>✓ Solicitud enviada</div>
          <h1 className="h1">Ya estás<br />dentro</h1>
          <p className="body-sm muted" style={{ lineHeight: 1.6 }}>
            Tu solicitud para unirte a <strong>{venue?.name}</strong> fue enviada.
            Un organizador la revisará pronto. Te avisamos por WhatsApp.
          </p>
          <Link href="/dashboard">
            <button className="btn ink" type="button" style={{ width: "100%" }}>
              Ir a mi comunidad →
            </button>
          </Link>
        </div>
        <div className="mono body-sm muted" style={{ padding: "12px 16px", borderTop: "2px solid var(--line)", textAlign: "center" }}>
          POWERED BY DIONYSUS
        </div>
      </div>
    );
  }

  // ─── OTP step ─────────────────────────────────────────────────────────────

  if (step === "otp") {
    return (
      <div className="design-root ds-dark" style={{ minHeight: "100dvh", background: "var(--paper)", color: "var(--ink)", display: "flex", flexDirection: "column", maxWidth: 480, margin: "0 auto" }}>
        <div className="appbar">
          <div className="brand"><div className="logo">D</div><span>Dionysus</span></div>
          <span className="meta">VERIFICAR</span>
        </div>
        <div style={{ padding: "14px 16px 0" }}>
          <div className="steps"><i className="on" /><i className="on" /><i /></div>
        </div>
        <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="kicker">WhatsApp</div>
          <h1 className="h1">Verifica<br />tu número</h1>
          <p className="body-sm muted">Enviamos un código de 6 dígitos a {phone}.</p>

          <form onSubmit={verifyOtp} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* 6-digit display */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6, marginBottom: 4 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ border: "2px solid var(--line)", padding: "14px 0", textAlign: "center", fontFamily: "var(--display)", fontSize: 22, background: otpCode[i] ? "var(--accent)" : "var(--paper)", color: "var(--ink)" }}>
                  {otpCode[i] ?? "·"}
                </div>
              ))}
            </div>

            <div className="field">
              <label>Código</label>
              <input
                className="input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                placeholder="······"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                required
                autoFocus
                autoComplete="one-time-code"
              />
            </div>

            {error && <div className="mono body-sm" style={{ color: "var(--danger)" }}>{error}</div>}

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="btn ink" type="submit" disabled={loading || otpCode.length < 6}>
                {loading ? "Verificando…" : "Confirmar →"}
              </button>
              <button type="button" className="btn ghost" onClick={() => { setStep("form"); setOtpCode(""); setError(""); }}>
                Cambiar número
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ─── Registration form ────────────────────────────────────────────────────

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
      <div className="appbar">
        <div className="brand"><div className="logo">D</div><span>Dionysus</span></div>
        <span className="meta">INVITACIÓN</span>
      </div>

      {/* Step indicator */}
      <div style={{ padding: "14px 16px 0" }}>
        <div className="steps"><i className="on" /><i /><i /></div>
      </div>

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="kicker">{venue?.name ?? "Comunidad"}</div>
        <h1 className="h1" style={{ marginBottom: 0 }}>Únete<br />a la comunidad</h1>
        <p className="body-sm muted" style={{ lineHeight: 1.5 }}>
          Fuiste invitado a {venue?.name}. Completa tus datos para solicitar membresía.
        </p>

        {/* Manifesto */}
        {venue?.manifesto && (
          <div
            style={{
              border: "2px solid var(--line)",
              padding: 16,
              background: "var(--paper-2)",
            }}
          >
            <div className="kicker" style={{ marginBottom: 8 }}>Manifiesto</div>
            <p className="body-sm" style={{ lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
              {venue.manifesto}
            </p>
            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 12, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={manifestoRead}
                onChange={(e) => setManifestoRead(e.target.checked)}
                style={{ marginTop: 3, flexShrink: 0 }}
              />
              <span className="mono body-sm">He leído y acepto el manifiesto de {venue.name}</span>
            </label>
          </div>
        )}

        <form onSubmit={submitRegistration} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="field">
            <label>Nombre completo</label>
            <input
              className="input"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="field">
            <label>WhatsApp</label>
            <input
              className="input"
              type="tel"
              placeholder="+52 55 1234 5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
            />
            <span className="hint">Incluye el código de país · ej: +52</span>
          </div>

          <div className="field">
            <label>¿Cómo te enteraste?</label>
            <input
              className="input"
              type="text"
              placeholder="Instagram, un amigo, evento…"
              value={howHeard}
              onChange={(e) => setHowHeard(e.target.value)}
            />
          </div>

          <div className="field">
            <label>¿Por qué quieres ser parte?</label>
            <textarea
              className="input"
              placeholder="Cuéntanos un poco…"
              value={whyJoin}
              onChange={(e) => setWhyJoin(e.target.value)}
              rows={3}
              style={{ resize: "vertical" }}
            />
          </div>

          <div className="field">
            <label>¿Qué arte practicas?</label>
            <input
              className="input"
              type="text"
              placeholder="músico, DJ, ceramista, espectador…"
              value={artPractice}
              onChange={(e) => setArtPractice(e.target.value)}
            />
            <span className="hint">Opcional</span>
          </div>

          {error && (
            <div className="mono body-sm" style={{ color: "var(--danger)" }}>{error}</div>
          )}

          <button
            className="btn ink"
            type="submit"
            disabled={loading || (!!venue?.manifesto && !manifestoRead)}
          >
            {loading ? "Enviando…" : "Solicitar membresía →"}
          </button>
        </form>

        <div className="mono body-sm muted" style={{ textAlign: "center" }}>
          ¿Ya tienes cuenta? <Link href="/login" style={{ color: "var(--ink)" }}>Iniciar sesión</Link>
        </div>
      </div>

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
