"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function QrPage() {
  const router = useRouter();
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const [pngRes, svgRes] = await Promise.all([
        fetch("/api/qr"),
        fetch("/api/qr/svg"),
      ]);

      if (pngRes.status === 401 || svgRes.status === 401) {
        router.push("/login");
        return;
      }
      if (!pngRes.ok || !svgRes.ok) {
        setError("No se pudo cargar tu QR");
        return;
      }

      const pngData = await pngRes.json();
      const svgText = await svgRes.text();

      setUserId(pngData.userId);
      setSvgContent(svgText);
    }

    load();
  }, [router]);

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
        <span className="meta">MI QR</span>
      </div>

      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="kicker">Acceso</div>
        <h1 className="h1" style={{ marginBottom: 0 }}>Tu código<br />de miembro</h1>
        <p className="body-sm muted">
          Presenta este código en la entrada. El equipo lo escaneará para validar tu membresía.
        </p>

        {/* QR Display */}
        <div
          style={{
            border: "2px solid var(--line)",
            background: "#fff",
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            aspectRatio: "1/1",
          }}
        >
          {error ? (
            <span className="mono body-sm" style={{ color: "var(--danger)" }}>{error}</span>
          ) : svgContent ? (
            <div
              style={{ width: "100%", height: "100%" }}
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          ) : (
            <span className="mono body-sm muted">Cargando…</span>
          )}
        </div>

        {/* User ID chip */}
        {userId && (
          <div
            className="mono body-sm"
            style={{
              padding: "8px 12px",
              border: "2px solid var(--line)",
              letterSpacing: "0.05em",
              wordBreak: "break-all",
            }}
          >
            {userId}
          </div>
        )}

        <div className="strip" style={{ marginTop: "auto" }}>
          MEMBRESÍA ACTIVA · DIONYSUS
        </div>
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
