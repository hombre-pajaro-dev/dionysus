"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Event = {
  id: string;
  name: string;
  date: string;
  durationMinutes: number;
  minimumDonation: number;
  description: string | null;
  venue?: { name: string; slug: string };
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
        <Link href="/login" className="meta" style={{ textDecoration: "none" }}>
          ENTRAR →
        </Link>
      </div>

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="kicker">Descubre</div>
        <h1 className="h1" style={{ marginBottom: 0 }}>
          Eventos<br />próximos
        </h1>
        <p className="body-sm muted">
          Arte, música y comunidad. Sin contraseñas — solo tu número de WhatsApp.
        </p>

        {loading && (
          <div className="mono body-sm muted" style={{ marginTop: 24, textAlign: "center" }}>
            Cargando…
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="body-sm muted" style={{ marginTop: 24, textAlign: "center" }}>
            No hay eventos públicos disponibles por ahora.
          </div>
        )}

        {!loading && events.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {events.map((ev, i) => {
              const d = new Date(ev.date);
              const day = d.toLocaleDateString("es-MX", { weekday: "short", day: "numeric", month: "short" });
              const time = d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });

              return (
                <Link
                  key={ev.id}
                  href={`/events/${ev.id}`}
                  style={{ textDecoration: "none", marginBottom: i < events.length - 1 ? -2 : 0 }}
                >
                  <div
                    className="card"
                    style={{
                      border: "2px solid var(--line)",
                      padding: 0,
                      overflow: "hidden",
                      transition: "background 0.1s",
                    }}
                  >
                    {/* Date strip */}
                    <div className="strip" style={{ borderBottom: "2px solid var(--line)" }}>
                      {day} · {time} · {ev.durationMinutes} MIN
                      {ev.venue && ` · ${ev.venue.name.toUpperCase()}`}
                    </div>

                    <div style={{ padding: "14px 16px" }}>
                      <div
                        style={{
                          fontFamily: "var(--display)",
                          fontSize: 20,
                          fontWeight: 900,
                          letterSpacing: "-0.01em",
                          marginBottom: ev.description ? 8 : 12,
                        }}
                      >
                        {ev.name}
                      </div>

                      {ev.description && (
                        <p
                          className="body-sm muted"
                          style={{
                            marginBottom: 12,
                            lineHeight: 1.5,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {ev.description}
                        </p>
                      )}

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div className="mono body-sm">
                          DONATIVO SUGERIDO · ${(ev.minimumDonation / 100).toFixed(0)} MXN
                        </div>
                        <div className="mono body-sm" style={{ color: "var(--accent)" }}>→</div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA */}
      <div
        style={{
          padding: 16,
          borderTop: "2px solid var(--line)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <Link href="/login">
          <button className="btn ink" type="button" style={{ width: "100%" }}>
            Unirme a la comunidad →
          </button>
        </Link>
        <div className="mono body-sm muted" style={{ textAlign: "center" }}>
          POWERED BY DIONYSUS
        </div>
      </div>
    </div>
  );
}
