"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PendingMember = {
  id: string;
  user: { name: string; phone: string };
  howHeard: string | null;
  whyJoin: string | null;
  createdAt: string;
};

type Event = {
  id: string;
  name: string;
  date: string;
  minimumDonation: number;
  visibility: string;
};

export default function OrganizerPage() {
  const router = useRouter();
  const [venueId, setVenueId] = useState("");
  const [pending, setPending] = useState<PendingMember[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingPending, setLoadingPending] = useState(false);
  const [approving, setApproving] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Create event form
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [newEventName, setNewEventName] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventDonation, setNewEventDonation] = useState("");
  const [creatingEvent, setCreatingEvent] = useState(false);

  async function loadData(vid: string) {
    setLoadingPending(true);
    try {
      const [pendRes, evRes] = await Promise.all([
        fetch(`/api/membership/pending?venueId=${vid}`),
        fetch(`/api/events?venueId=${vid}`),
      ]);
      if (pendRes.status === 401 || evRes.status === 401) { router.push("/login"); return; }
      if (pendRes.status === 403) { setError("Sin permisos de organizador en este venue"); return; }
      if (pendRes.ok) setPending(await pendRes.json());
      if (evRes.ok) setEvents(await evRes.json());
    } finally {
      setLoadingPending(false);
    }
  }

  async function approve(membershipId: string) {
    setApproving(membershipId);
    try {
      const res = await fetch(`/api/membership/${membershipId}/approve`, { method: "POST" });
      if (!res.ok) return;
      setPending((p) => p.filter((m) => m.id !== membershipId));
    } finally {
      setApproving(null);
    }
  }

  async function createEvent(e: React.FormEvent) {
    e.preventDefault();
    setCreatingEvent(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          venueId,
          name: newEventName,
          date: new Date(newEventDate).toISOString(),
          minimumDonation: Math.round(parseFloat(newEventDonation) * 100),
          visibility: "MEMBERS_ONLY",
        }),
      });
      if (!res.ok) return;
      const ev = await res.json();
      setEvents((prev) => [...prev, ev]);
      setNewEventName("");
      setNewEventDate("");
      setNewEventDonation("");
      setShowCreateEvent(false);
    } finally {
      setCreatingEvent(false);
    }
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
        <span className="meta">ORGANIZER</span>
      </div>

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 20 }}>
        <div className="kicker">Panel de gestión</div>
        <h1 className="h1" style={{ marginBottom: 0 }}>Organizador</h1>

        {/* Venue selector */}
        <div className="field">
          <label>ID de Venue</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              className="input"
              type="text"
              placeholder="cuid del venue…"
              value={venueId}
              onChange={(e) => setVenueId(e.target.value)}
            />
            <button
              className="btn ink"
              type="button"
              onClick={() => venueId && loadData(venueId)}
              disabled={!venueId || loadingPending}
              style={{ flexShrink: 0 }}
            >
              {loadingPending ? "…" : "Cargar"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mono body-sm" style={{ color: "var(--danger)" }}>{error}</div>
        )}

        {/* Pending members */}
        {pending.length > 0 && (
          <div>
            <div className="kicker" style={{ marginBottom: 10 }}>
              Solicitudes pendientes · {pending.length}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: -2 }}>
              {pending.map((m) => (
                <div key={m.id} className="card" style={{ padding: 16, border: "2px solid var(--line)", marginBottom: -2 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <div className="body-sm" style={{ fontWeight: 600 }}>{m.user.name}</div>
                      <div className="mono body-sm muted">{m.user.phone}</div>
                    </div>
                    <div className="mono body-sm muted" style={{ fontSize: 10 }}>
                      {new Date(m.createdAt).toLocaleDateString("es-MX")}
                    </div>
                  </div>
                  {m.howHeard && (
                    <div className="body-sm muted" style={{ marginBottom: 4 }}>
                      <span className="mono" style={{ fontSize: 10 }}>CÓMO SE ENTERÓ · </span>
                      {m.howHeard}
                    </div>
                  )}
                  {m.whyJoin && (
                    <div className="body-sm muted" style={{ marginBottom: 10 }}>
                      <span className="mono" style={{ fontSize: 10 }}>POR QUÉ · </span>
                      {m.whyJoin}
                    </div>
                  )}
                  <button
                    className="btn ink"
                    type="button"
                    onClick={() => approve(m.id)}
                    disabled={approving === m.id}
                    style={{ fontSize: 12 }}
                  >
                    {approving === m.id ? "Aprobando…" : "Aprobar →"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {pending.length === 0 && venueId && !loadingPending && (
          <div className="body-sm muted">No hay solicitudes pendientes</div>
        )}

        {/* Events */}
        {events.length > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div className="kicker">Eventos · {events.length}</div>
              <button
                className="btn ghost"
                type="button"
                onClick={() => setShowCreateEvent((v) => !v)}
                style={{ fontSize: 11 }}
              >
                {showCreateEvent ? "Cancelar" : "+ Nuevo evento"}
              </button>
            </div>

            {showCreateEvent && (
              <form onSubmit={createEvent} style={{ border: "2px solid var(--accent)", padding: 16, marginBottom: 8, display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="kicker" style={{ color: "var(--accent)" }}>Nuevo evento</div>
                <div className="field">
                  <label>Nombre</label>
                  <input className="input" type="text" value={newEventName} onChange={(e) => setNewEventName(e.target.value)} required />
                </div>
                <div className="field">
                  <label>Fecha y hora</label>
                  <input className="input" type="datetime-local" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} required />
                </div>
                <div className="field">
                  <label>Donativo mínimo (MXN)</label>
                  <input className="input" type="number" min="0" step="0.01" placeholder="150.00" value={newEventDonation} onChange={(e) => setNewEventDonation(e.target.value)} required />
                </div>
                <button className="btn ink" type="submit" disabled={creatingEvent}>
                  {creatingEvent ? "Creando…" : "Crear evento →"}
                </button>
              </form>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: -2 }}>
              {events.map((ev) => (
                <div key={ev.id} className="card" style={{ padding: "12px 16px", border: "2px solid var(--line)", marginBottom: -2 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div className="body-sm" style={{ fontWeight: 600 }}>{ev.name}</div>
                      <div className="mono body-sm muted" style={{ fontSize: 10, marginTop: 2 }}>
                        {ev.visibility}
                      </div>
                    </div>
                    <div className="mono body-sm muted" style={{ textAlign: "right" }}>
                      <div>{new Date(ev.date).toLocaleDateString("es-MX", { weekday: "short", day: "numeric", month: "short" })}</div>
                      <div>${(ev.minimumDonation / 100).toFixed(0)} MXN</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {events.length === 0 && venueId && !loadingPending && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div className="body-sm muted">No hay eventos creados</div>
              <button
                className="btn ghost"
                type="button"
                onClick={() => setShowCreateEvent((v) => !v)}
                style={{ fontSize: 11 }}
              >
                {showCreateEvent ? "Cancelar" : "+ Nuevo evento"}
              </button>
            </div>

            {showCreateEvent && (
              <form onSubmit={createEvent} style={{ border: "2px solid var(--accent)", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                <div className="kicker" style={{ color: "var(--accent)" }}>Nuevo evento</div>
                <div className="field">
                  <label>Nombre</label>
                  <input className="input" type="text" value={newEventName} onChange={(e) => setNewEventName(e.target.value)} required />
                </div>
                <div className="field">
                  <label>Fecha y hora</label>
                  <input className="input" type="datetime-local" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} required />
                </div>
                <div className="field">
                  <label>Donativo mínimo (MXN)</label>
                  <input className="input" type="number" min="0" step="0.01" placeholder="150.00" value={newEventDonation} onChange={(e) => setNewEventDonation(e.target.value)} required />
                </div>
                <button className="btn ink" type="submit" disabled={creatingEvent}>
                  {creatingEvent ? "Creando…" : "Crear evento →"}
                </button>
              </form>
            )}
          </div>
        )}

        {!venueId && (
          <div className="body-sm muted" style={{ textAlign: "center", marginTop: 24 }}>
            Ingresa el ID del venue para cargar datos
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
