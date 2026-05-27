"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type UserProfile = {
  id: string;
  phone: string;
  name: string;
  city: string | null;
  artPractice: string | null;
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [artPractice, setArtPractice] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/profile").then(async (res) => {
      if (res.status === 401) { router.push("/login"); return; }
      const data = await res.json();
      setProfile(data);
      setName(data.name ?? "");
      setCity(data.city ?? "");
      setArtPractice(data.artPractice ?? "");
    });
  }, [router]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, city: city || undefined, artPractice: artPractice || undefined }),
      });
      if (!res.ok) { setError("Error al guardar"); return; }
      setProfile(await res.json());
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
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
        <span className="meta">PERFIL</span>
      </div>

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="kicker">Mi cuenta</div>
        <h1 className="h1" style={{ marginBottom: 0 }}>
          {profile?.name ?? "…"}
        </h1>
        {profile && (
          <div className="mono body-sm muted">{profile.phone}</div>
        )}

        <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="field">
            <label>Nombre</label>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Ciudad</label>
            <input
              className="input"
              type="text"
              placeholder="ej: CDMX"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Arte que practicas</label>
            <input
              className="input"
              type="text"
              placeholder="ej: músico, DJ, ceramista…"
              value={artPractice}
              onChange={(e) => setArtPractice(e.target.value)}
            />
            <span className="hint">Opcional — aparecerá en tu perfil dentro de la comunidad</span>
          </div>

          {error && (
            <div className="mono body-sm" style={{ color: "var(--danger)" }}>{error}</div>
          )}
          {saved && (
            <div className="mono body-sm" style={{ color: "var(--ok)" }}>Guardado ✓</div>
          )}

          <button className="btn ink" type="submit" disabled={saving}>
            {saving ? "Guardando…" : "Guardar cambios →"}
          </button>
        </form>

        <button type="button" className="btn ghost" onClick={logout} style={{ marginTop: 8 }}>
          Cerrar sesión
        </button>
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
