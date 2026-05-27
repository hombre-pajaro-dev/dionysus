"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type MemberInfo = {
  membershipId: string;
  member: { id: string; name: string; phone: string };
  balanceCents: number;
};

export default function CashierPage() {
  const router = useRouter();

  // Lookup form
  const [venueId, setVenueId] = useState("");
  const [userId, setUserId] = useState("");
  const [lookingUp, setLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [memberInfo, setMemberInfo] = useState<MemberInfo | null>(null);

  // Top-up form
  const [amountMXN, setAmountMXN] = useState("");
  const [concept, setConcept] = useState("Carga de efectivo");
  const [topping, setTopping] = useState(false);
  const [topupError, setTopupError] = useState("");
  const [newBalance, setNewBalance] = useState<number | null>(null);

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    setLookupError("");
    setMemberInfo(null);
    setNewBalance(null);
    setLookingUp(true);
    try {
      const res = await fetch(
        `/api/members/lookup?userId=${encodeURIComponent(userId)}&venueId=${encodeURIComponent(venueId)}`
      );
      if (res.status === 401) { router.push("/login"); return; }
      if (res.status === 403) { setLookupError("Sin permisos de cajero en este venue"); return; }
      if (res.status === 404) { setLookupError("Miembro no encontrado o membresía inactiva"); return; }
      if (!res.ok) { setLookupError("Error al buscar miembro"); return; }
      setMemberInfo(await res.json());
    } finally {
      setLookingUp(false);
    }
  }

  async function topup(e: React.FormEvent) {
    e.preventDefault();
    if (!memberInfo) return;
    setTopupError("");
    setTopping(true);
    try {
      const amountCents = Math.round(parseFloat(amountMXN) * 100);
      const res = await fetch("/api/balance/topup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          membershipId: memberInfo.membershipId,
          amountCents,
          concept,
        }),
      });
      if (res.status === 401) { router.push("/login"); return; }
      if (!res.ok) {
        const data = await res.json();
        setTopupError(data.error ?? "Error al agregar tokens");
        return;
      }
      setNewBalance((memberInfo.balanceCents) + amountCents);
      setMemberInfo((prev) =>
        prev ? { ...prev, balanceCents: prev.balanceCents + amountCents } : null
      );
      setAmountMXN("");
    } finally {
      setTopping(false);
    }
  }

  function reset() {
    setMemberInfo(null);
    setUserId("");
    setNewBalance(null);
    setLookupError("");
    setTopupError("");
  }

  const balanceMXN = memberInfo ? (memberInfo.balanceCents / 100).toFixed(2) : "0.00";

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
        <span className="meta">CAJERO</span>
      </div>

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="kicker">Cajero de tokens</div>
        <h1 className="h1" style={{ marginBottom: 0 }}>Agregar<br />balance</h1>

        {/* Lookup form */}
        {!memberInfo && (
          <form onSubmit={lookup} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="field">
              <label>ID de Venue</label>
              <input
                className="input"
                type="text"
                placeholder="cuid del venue…"
                value={venueId}
                onChange={(e) => setVenueId(e.target.value)}
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

            {lookupError && (
              <div className="mono body-sm" style={{ color: "var(--danger)" }}>{lookupError}</div>
            )}

            <button className="btn ink" type="submit" disabled={lookingUp}>
              {lookingUp ? "Buscando…" : "Buscar miembro →"}
            </button>
          </form>
        )}

        {/* Member card + top-up */}
        {memberInfo && (
          <>
            {/* Member info */}
            <div className="card ink" style={{ padding: 16 }}>
              <div className="kicker" style={{ color: "var(--paper)", opacity: 0.6, marginBottom: 6 }}>Miembro</div>
              <div style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 900, marginBottom: 4 }}>
                {memberInfo.member.name}
              </div>
              <div className="mono body-sm" style={{ opacity: 0.6, marginBottom: 12 }}>
                {memberInfo.member.phone}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div className="mono body-sm" style={{ opacity: 0.5 }}>BALANCE ACTUAL</div>
                  <div style={{ fontFamily: "var(--display)", fontSize: 32, fontWeight: 900, letterSpacing: "-0.02em" }}>
                    ${balanceMXN}
                  </div>
                </div>
                {newBalance !== null && (
                  <div style={{ textAlign: "right" }}>
                    <div className="mono body-sm" style={{ color: "var(--accent)" }}>+ CARGA</div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 20, fontWeight: 900, color: "var(--ok)" }}>
                      ✓ LISTO
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Top-up form */}
            <form onSubmit={topup} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="field">
                <label>Monto a cargar (MXN)</label>
                <input
                  className="input"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="150.00"
                  value={amountMXN}
                  onChange={(e) => setAmountMXN(e.target.value)}
                  required
                  autoFocus
                />
                <span className="hint">Tasa 1:1 MXN → tokens · Sin comisión</span>
              </div>

              <div className="field">
                <label>Concepto</label>
                <input
                  className="input"
                  type="text"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  required
                />
              </div>

              {topupError && (
                <div className="mono body-sm" style={{ color: "var(--danger)" }}>{topupError}</div>
              )}

              <button className="btn ink" type="submit" disabled={topping || !amountMXN}>
                {topping
                  ? "Procesando…"
                  : amountMXN
                  ? `Agregar $${amountMXN} MXN →`
                  : "Agregar tokens →"}
              </button>
            </form>

            <button type="button" className="btn ghost" onClick={reset}>
              Siguiente miembro →
            </button>
          </>
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
