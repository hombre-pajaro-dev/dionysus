"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CheckinResult = {
  hasAccess: boolean;
  member: { name: string; phone: string };
  balanceCents: number;
  event: { name: string; date: string };
} | null;

export default function DoorPage() {
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckinResult>(null);
  const [error, setError] = useState("");

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch(
        `/api/checkin?userId=${encodeURIComponent(userId)}&eventId=${encodeURIComponent(eventId)}`
      );
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (res.status === 403) {
        setError("Sin permisos de operador de puerta en este venue");
        return;
      }
      if (res.status === 404) {
        setError("Miembro o evento no encontrado");
        return;
      }
      if (!res.ok) {
        setError("Error al verificar acceso");
        return;
      }
      setResult(await res.json());
    } finally {
      setLoading(false);
    }
  }

  const balanceMXN = result ? (result.balanceCents / 100).toFixed(2) : "0.00";

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
        <span className="meta">PUERTA</span>
      </div>

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="kicker">Operador</div>
        <h1 className="h1" style={{ marginBottom: 0 }}>Verificar<br />acceso</h1>

        <form onSubmit={verify} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="field">
            <label>ID de Evento</label>
            <input
              className="input"
              type="text"
              placeholder="cuid del evento…"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>ID de Miembro (del QR)</label>
            <input
              className="input"
              type="text"
              placeholder="Escanea o pega el userId…"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              autoFocus
            />
            <span className="hint">El QR del miembro codifica su userId global</span>
          </div>

          {error && (
            <div className="mono body-sm" style={{ color: "var(--danger)" }}>
              {error}
            </div>
          )}

          <button className="btn ink" type="submit" disabled={loading}>
            {loading ? "Verificando…" : "Verificar →"}
          </button>
        </form>

        {/* Result card */}
        {result && (
          <div
            style={{
              border: `4px solid ${result.hasAccess ? "var(--ok)" : "var(--danger)"}`,
              padding: 20,
              marginTop: 8,
            }}
          >
            {/* Access status */}
            <div
              style={{
                fontFamily: "var(--display)",
                fontSize: 32,
                fontWeight: 900,
                color: result.hasAccess ? "var(--ok)" : "var(--danger)",
                marginBottom: 12,
                letterSpacing: "-0.02em",
              }}
            >
              {result.hasAccess ? "✓ ACCESO" : "✗ SIN ACCESO"}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div className="body-sm">
                <span className="muted mono">NOMBRE · </span>
                <strong>{result.member.name}</strong>
              </div>
              <div className="body-sm">
                <span className="muted mono">TELÉFONO · </span>
                {result.member.phone}
              </div>
              <div className="body-sm">
                <span className="muted mono">BALANCE · </span>
                <strong>${balanceMXN} MXN</strong>
              </div>
              <div className="body-sm">
                <span className="muted mono">EVENTO · </span>
                {result.event.name}
              </div>
            </div>
          </div>
        )}

        {/* Reset */}
        {result && (
          <button
            type="button"
            className="btn ghost"
            onClick={() => {
              setResult(null);
              setUserId("");
            }}
          >
            Verificar otro →
          </button>
        )}
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
