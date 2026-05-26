"use client";

import { createContext, useContext, useMemo, type ReactNode, type CSSProperties } from "react";
import { getT, type Lang, type StringKey } from "@/lib/i18n/comunidad";

// ─── i18n ────────────────────────────────────────────────────────────────────

type I18nCtx = { lang: Lang; t: ReturnType<typeof getT> };
const I18nContext = createContext<I18nCtx>({ lang: "es", t: getT("es") });

export function I18nProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = useMemo(() => getT(lang), [lang]);
  return <I18nContext.Provider value={{ lang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() { return useContext(I18nContext); }

export function T({ k, vars }: { k: StringKey; vars?: Record<string, string | number> }) {
  const { t } = useI18n();
  return <>{t(k, vars)}</>;
}

// ─── Screen props ─────────────────────────────────────────────────────────────

export interface ScreenProps {
  logo?: string;
  name?: string;
}

// ─── Phone shell ──────────────────────────────────────────────────────────────

export function Phone({
  children,
  time = "21:34",
  carrier = "TELCEL",
  battery = "82%",
}: {
  children: ReactNode;
  time?: string;
  carrier?: string;
  battery?: string;
}) {
  return (
    <div className="phone">
      <div className="statusbar">
        <span>{time}</span>
        <span className="ind">
          <span>{carrier}</span>
          <span className="dot" />
          <span>{battery}</span>
        </span>
      </div>
      <div className="screen">{children}</div>
      <div className="home" />
    </div>
  );
}

// ─── AppBar ───────────────────────────────────────────────────────────────────

export function AppBar({ logo = "N", name = "EL NIDO", right }: { logo?: string; name?: string; right?: string }) {
  return (
    <div className="appbar">
      <div className="brand">
        <span className="logo">{logo}</span>
        <span>{name}</span>
      </div>
      {right ? <div className="meta">{right}</div> : null}
    </div>
  );
}

// ─── BottomNav ────────────────────────────────────────────────────────────────

export function BottomNav({ active = "qr" }: { active?: "events" | "qr" | "home" | "more" }) {
  const { t } = useI18n();
  const items: { id: string; gl: string; lbl: string }[] = [
    { id: "events", gl: "▢", lbl: t("nav_events") },
    { id: "qr",    gl: "◆", lbl: t("nav_qr") },
    { id: "home",  gl: "✦", lbl: t("nav_home") },
    { id: "more",  gl: "≡", lbl: t("nav_more") },
  ];
  return (
    <div className="bottomnav">
      {items.map((item) => (
        <div key={item.id} className={active === item.id ? "on" : ""}>
          <span className="gl">{item.gl}</span>
          <span>{item.lbl}</span>
        </div>
      ))}
    </div>
  );
}

// ─── QR ──────────────────────────────────────────────────────────────────────

export function QR({ seed = "default-seed", invert = false }: { seed?: string; invert?: boolean }) {
  const cells = useMemo(() => {
    const N = 25;
    const grid: number[][] = Array.from({ length: N }, () => Array(N).fill(0));
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const rand = () => {
      h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
      return ((h >>> 0) % 1000) / 1000;
    };
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        grid[y][x] = rand() > 0.5 ? 1 : 0;
      }
    }
    const drawFinder = (sx: number, sy: number) => {
      for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
          const onBorder = x === 0 || x === 6 || y === 0 || y === 6;
          const inner = x >= 2 && x <= 4 && y >= 2 && y <= 4;
          grid[sy + y][sx + x] = onBorder || inner ? 1 : 0;
        }
      }
    };
    drawFinder(0, 0);
    drawFinder(N - 7, 0);
    drawFinder(0, N - 7);
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const sx = N - 6, sy = N - 6;
        const onBorder = x === 0 || x === 4 || y === 0 || y === 4;
        const center = x === 2 && y === 2;
        grid[sy + y][sx + x] = onBorder || center ? 1 : 0;
      }
    }
    return grid;
  }, [seed]);

  return (
    <div className="qr" style={invert ? { background: "var(--ink)" } : undefined}>
      {cells.flatMap((row, y) =>
        row.map((c, x) =>
          c ? (
            <i
              key={`${x}-${y}`}
              style={{
                gridColumn: x + 1,
                gridRow: y + 1,
                background: invert ? "var(--paper)" : "var(--ink)",
              }}
            />
          ) : null,
        ),
      )}
    </div>
  );
}

// ─── TokenAmt ─────────────────────────────────────────────────────────────────

export function TokenAmt({ n, big = false, sign = "" }: { n: number | string; big?: boolean; sign?: string }) {
  const v = typeof n === "number" ? n.toLocaleString("es-MX") : n;
  return (
    <span
      style={{
        fontFamily: "var(--display)",
        fontSize: big ? 44 : "inherit",
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontFamily: "var(--display)", marginRight: 4 }}>◆</span>
      {sign}
      {v}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

export function Avatar({ name = "??", size = "" }: { name?: string; size?: "" | "lg" }) {
  const ini = name
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return <div className={`avatar ${size}`}>{ini}</div>;
}

// ─── Steps ────────────────────────────────────────────────────────────────────

export function Steps({ total, current }: { total: number; current: number }) {
  return (
    <div className="steps">
      {Array.from({ length: total }).map((_, i) => (
        <i key={i} className={i < current ? "on" : ""} />
      ))}
    </div>
  );
}

// ─── Strip ────────────────────────────────────────────────────────────────────

export function Strip({ children, ink = false }: { children: ReactNode; ink?: boolean }) {
  return <div className={`strip${ink ? " ink" : ""}`}>{children}</div>;
}

// ─── Stripes ──────────────────────────────────────────────────────────────────

export function Stripes({ children, style }: { children?: ReactNode; style?: CSSProperties }) {
  return (
    <div className="stripes" style={style}>
      {children}
    </div>
  );
}
