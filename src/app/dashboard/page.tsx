"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type BalanceData = {
  balanceCents: number;
  membership: { id: string; status: string; venueId: string };
};

type Event = {
  id: string;
  name: string;
  date: string;
  minimumDonation: number;
  venue?: { name: string; slug: string };
};

export default function DashboardPage() {
  const router = useRouter();
  const [balance, setBalance] = useState<BalanceData | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [balRes, evRes] = await Promise.all([
        fetch("/api/balance"),
        fetch("/api/events"),
      ]);

      if (balRes.status === 401) {
        router.push("/login");
        return;
      }

      if (balRes.ok) setBalance(await balRes.json());
      if (evRes.ok) setEvents(await evRes.json());
      setLoading(false);
    }
    load();
  }, [router]);

  const balanceMXN = balance ? (balance.balanceCents / 100).toFixed(2) : "0.00";

  if (loading) {
    return (
      <div className="design-root ds-dark" style={{ minHeight: "100dvh", background: "var(--paper)", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="mono body-sm muted">Cargando…</span>
      </div>
    );
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
        <Link href="/qr" className="meta" style={{ textDecoration: "none" }}>QR ↗</Link>
      </div>

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Balance card */}
        <div className="card ink" style={{ padding: 20 }}>
          <div className="kicker" style={{ color: "var(--paper)", opacity: 0.6 }}>Balance</div>
          <div
            style={{
              fontFamily: "var(--display)",
              fontSize: 48,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginTop: 4,
            }}
          >
            ${balanceMXN}
          </div>
          <div className="mono body-sm" style={{ marginTop: 8, opacity: 0.6 }}>MXN · Tokens disponibles</div>
          {balance?.membership.status === "PENDING" && (
            <div className="mono body-sm" style={{ marginTop: 8, color: "var(--accent)" }}>
              MEMBRESÍA PENDIENTE DE APROBACIÓN
            </div>
          )}
        </div>

        {/* Quick links */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <Link href="/qr" style={{ textDecoration: "none" }}>
            <div className="card" style={{ padding: 16, border: "2px solid var(--line)" }}>
              <div className="kicker" style={{ marginBottom: 4 }}>Acceso</div>
              <div className="body-sm">Mi QR →</div>
            </div>
          </Link>
          <Link href="/events" style={{ textDecoration: "none" }}>
            <div className="card" style={{ padding: 16, border: "2px solid var(--line)" }}>
              <div className="kicker" style={{ marginBottom: 4 }}>Próximos</div>
              <div className="body-sm">Eventos →</div>
            </div>
          </Link>
        </div>

        {/* Upcoming events */}
        {events.length > 0 && (
          <div>
            <div className="kicker" style={{ marginBottom: 10 }}>Eventos próximos</div>
            <div style={{ display: "flex", flexDirection: "column", gap: -2 }}>
              {events.slice(0, 5).map((ev) => (
                <Link key={ev.id} href={`/events/${ev.id}`} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ padding: "12px 16px", border: "2px solid var(--line)", marginBottom: -2 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div className="body-sm" style={{ fontWeight: 600 }}>{ev.name}</div>
                        {ev.venue && (
                          <div className="mono body-sm muted" style={{ fontSize: 10, marginTop: 2 }}>
                            {ev.venue.name}
                          </div>
                        )}
                      </div>
                      <div className="mono body-sm muted" style={{ textAlign: "right", flexShrink: 0 }}>
                        <div>{new Date(ev.date).toLocaleDateString("es-MX", { weekday: "short", day: "numeric", month: "short" })}</div>
                        <div style={{ marginTop: 2 }}>${(ev.minimumDonation / 100).toFixed(0)} MXN</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {events.length === 0 && !loading && (
          <div className="body-sm muted" style={{ textAlign: "center", marginTop: 24 }}>
            No hay eventos próximos publicados
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <nav
        style={{
          borderTop: "2px solid var(--line)",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.06em",
        }}
      >
        {[
          { href: "/dashboard", label: "INICIO" },
          { href: "/qr", label: "MI QR" },
          { href: "/profile", label: "PERFIL" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              padding: "14px 0",
              textAlign: "center",
              textDecoration: "none",
              color: "var(--ink)",
              borderRight: "2px solid var(--line)",
            }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
