"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

type EventDetail = {
  id: string;
  name: string;
  description: string | null;
  date: string;
  durationMinutes: number;
  minimumDonation: number;
  visibility: string;
  venue: { id: string; name: string; slug: string };
};

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [donating, setDonating] = useState(false);
  const [donated, setDonated] = useState(false);
  const [donationError, setDonationError] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetch(`/api/events/${id}`).then(async (res) => {
      if (res.status === 401) { router.push("/login"); return; }
      if (res.status === 404) { router.push("/dashboard"); return; }
      if (res.ok) {
        const data = await res.json();
        setEvent(data);
        setAmount(String(data.minimumDonation / 100));
      }
      setLoading(false);
    });
  }, [id, router]);

  async function donate(e: React.FormEvent) {
    e.preventDefault();
    setDonationError("");
    setDonating(true);
    try {
      const balRes = await fetch("/api/balance");
      if (balRes.status === 401) { router.push("/login"); return; }
      const { membership } = await balRes.json();

      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          membershipId: membership.id,
          eventId: event!.id,
          amountCents: Math.round(parseFloat(amount) * 100),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setDonationError(data.error ?? "Error al procesar donativo");
        return;
      }

      setDonated(true);
    } finally {
      setDonating(false);
    }
  }

  if (loading) {
    return (
      <div className="design-root ds-dark" style={{ minHeight: "100dvh", background: "var(--paper)", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="mono body-sm muted">Cargando…</span>
      </div>
    );
  }

  if (!event) return null;

  const eventDate = new Date(event.date);
  const minMXN = (event.minimumDonation / 100).toFixed(0);

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
        <Link href="/dashboard" className="meta" style={{ textDecoration: "none" }}>← INICIO</Link>
        <div className="brand">
          <div className="logo">D</div>
          <span>Dionysus</span>
        </div>
        <span className="meta">{event.visibility === "PUBLIC" ? "PÚBLICO" : "MIEMBROS"}</span>
      </div>

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Venue */}
        <div className="kicker">{event.venue.name}</div>

        {/* Event name */}
        <h1 className="h1" style={{ marginBottom: 0 }}>{event.name}</h1>

        {/* Date strip */}
        <div className="strip">
          {eventDate.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          {" · "}
          {eventDate.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
          {" · "}
          {event.durationMinutes} MIN
        </div>

        {/* Description */}
        {event.description && (
          <p className="body-sm" style={{ lineHeight: 1.6, color: "var(--ink-2)" }}>
            {event.description}
          </p>
        )}

        {/* Donation section */}
        {!donated ? (
          <form onSubmit={donate} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
            <div className="kicker">Donativo sugerido</div>
            <div
              style={{
                fontFamily: "var(--display)",
                fontSize: 40,
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}
            >
              ${minMXN} MXN
            </div>

            <div className="field">
              <label>Tu donativo (MXN)</label>
              <input
                className="input"
                type="number"
                min={minMXN}
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <span className="hint">Mínimo ${minMXN} MXN · Se convierte 1:1 en tokens</span>
            </div>

            {donationError && (
              <div className="mono body-sm" style={{ color: "var(--danger)" }}>
                {donationError}
              </div>
            )}

            <button className="btn ink" type="submit" disabled={donating}>
              {donating ? "Procesando…" : `Donar $${amount} MXN →`}
            </button>
          </form>
        ) : (
          <div
            style={{
              border: "4px solid var(--ok)",
              padding: 20,
              textAlign: "center",
              marginTop: 8,
            }}
          >
            <div
              style={{
                fontFamily: "var(--display)",
                fontSize: 28,
                fontWeight: 900,
                color: "var(--ok)",
                marginBottom: 8,
              }}
            >
              ✓ DONATIVO REGISTRADO
            </div>
            <p className="body-sm muted">
              Tu acceso al evento está confirmado. Presenta tu QR en la entrada.
            </p>
            <Link href="/qr">
              <button className="btn ink" type="button" style={{ marginTop: 12 }}>
                Ver mi QR →
              </button>
            </Link>
          </div>
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
