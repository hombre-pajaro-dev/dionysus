"use client";

import { Phone, AppBar, Strip, Avatar, useI18n, type ScreenProps } from "../primitives";

export function Sc_AdmRoles({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  const roles = [
    { who: "DANIELA REYES",   roles: ["ADMIN", "ORG.", "PUERTA"] },
    { who: "HUGO PALACIOS",   roles: ["ORG.", "PUERTA"] },
    { who: "LUIS RAMÍREZ",    roles: ["CAJERO", "POS"] },
    { who: "LIA MÉNDEZ",      roles: ["ORG."] },
    { who: "TOMÁS CASTILLO",  roles: ["MIEMBRO"] },
    { who: "ANA FERRER",      roles: ["POS"] },
  ];
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="ROL · ADMIN" />
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>QUIÉN PUEDE QUÉ</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>{t("adm_roles")}</h2>
        <div className="dl" style={{ marginBottom: 14 }}>
          <div className="row"><span className="k">Total miembros</span><span className="v">142</span></div>
          <div className="row"><span className="k">Con rol operativo</span><span className="v">11</span></div>
        </div>
        <div className="kicker muted" style={{ marginBottom: 6 }}>PERSONAS</div>
        <div className="list">
          {roles.map((r, i) => (
            <div className="item" key={i} style={{ flexDirection: "column", alignItems: "stretch", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={r.who} />
                <div style={{ fontWeight: 700, fontSize: 14, flex: 1 }}>{r.who}</div>
                <span className="mono" style={{ fontSize: 14 }}>→</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, paddingLeft: 46 }}>
                {r.roles.map((x, j) => (
                  <span key={j} className={`tag ${x === "ADMIN" ? "accent" : x === "MIEMBRO" ? "" : "solid"}`}>{x}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="rule" />
        <button className="btn">+ ASIGNAR ROL A MIEMBRO</button>
      </div>
    </Phone>
  );
}

export function Sc_AdmTransactions({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  const tx = [
    { time: "21:48", k: "TOP-UP CASH · TC", v: "+ $300",   tag: "CASH",   who: "LUIS R." },
    { time: "21:42", k: "DON. STRIPE · DR", v: "+ $450",   tag: "STRIPE", who: "—" },
    { time: "21:31", k: "POS DEBIT · HP",   v: "− ◆ 180", tag: "POS",    who: "ANA F." },
    { time: "21:24", k: "DON. OXXO · KD",   v: "+ $400",   tag: "OXXO",   who: "—" },
    { time: "21:12", k: "DON. STRIPE · TC", v: "+ $400",   tag: "STRIPE", who: "—" },
    { time: "21:02", k: "POS DEBIT · DR",   v: "− ◆ 90",  tag: "POS",    who: "ANA F." },
    { time: "20:58", k: "REVERSA · POS #21",v: "+ ◆ 180", tag: "REV",    who: "ADM" },
  ];
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="LOG" />
      <Strip ink>EVENTO ACTIVO · SAB 16 MAY · 21:00 → AHORA</Strip>
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>AUDITORÍA EN TIEMPO REAL</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>{t("adm_trans")}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 14 }}>
          <div className="bigstat" style={{ padding: 8 }}>
            <div className="v" style={{ fontSize: 18 }}>$ 9,400</div>
            <div className="l">DONATIVOS</div>
          </div>
          <div className="bigstat" style={{ padding: 8 }}>
            <div className="v" style={{ fontSize: 18 }}>◆ 1,840</div>
            <div className="l">CONSUMO</div>
          </div>
          <div className="bigstat" style={{ padding: 8, background: "var(--accent)" }}>
            <div className="v" style={{ fontSize: 18 }}>+24</div>
            <div className="l">TXN HOY</div>
          </div>
        </div>
        <div className="tabs" style={{ marginBottom: 14 }}>
          <div className="on">TODO</div>
          <div>ENTRA</div>
          <div>SALE</div>
          <div>REVERSAS</div>
        </div>
        <div className="list">
          {tx.map((row, i) => (
            <div className="item" key={i} style={{ alignItems: "flex-start" }}>
              <span className="ix" style={{ width: 40, paddingTop: 4 }}>{row.time}</span>
              <div className="main">
                <div className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{row.k}</div>
                <div className="mono" style={{ fontSize: 9, letterSpacing: "0.06em", color: "var(--muted)", marginTop: 2 }}>POR {row.who}</div>
              </div>
              <div className="right">
                <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: row.v.startsWith("+") ? "var(--ok)" : "var(--ink)" }}>{row.v}</div>
                <span className="tag" style={{ marginTop: 4 }}>{row.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}

export function Sc_AdmReferrals({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  const nodes = [
    { id: "F1", x: 180, y: 30,  lbl: "F1", w: 22, status: "ok" },
    { id: "DR", x: 80,  y: 100, lbl: "DR", w: 30, status: "ok" },
    { id: "HP", x: 180, y: 100, lbl: "HP", w: 30, status: "ok" },
    { id: "LM", x: 280, y: 100, lbl: "LM", w: 26, status: "ok" },
    { id: "TC", x: 40,  y: 200, lbl: "TC", w: 18, status: "ok" },
    { id: "AF", x: 100, y: 200, lbl: "AF", w: 18, status: "ok" },
    { id: "PC", x: 140, y: 200, lbl: "PC", w: 14, status: "pending" },
    { id: "ML", x: 180, y: 200, lbl: "ML", w: 14, status: "pending" },
    { id: "KD", x: 220, y: 200, lbl: "KD", w: 14, status: "ok" },
    { id: "RO", x: 260, y: 200, lbl: "RO", w: 14, status: "ok" },
    { id: "IC", x: 300, y: 200, lbl: "IC", w: 14, status: "out" },
  ];
  const edges: [string, string][] = [
    ["F1","DR"], ["F1","HP"], ["F1","LM"],
    ["DR","TC"], ["DR","AF"], ["DR","PC"],
    ["HP","ML"], ["HP","KD"],
    ["LM","RO"], ["LM","IC"],
  ];
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <Phone>
      <AppBar logo={logo} name={name} right="GRAFO" />
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>{t("adm_referrals_sub")}</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>{t("adm_referrals")}</h2>
        <div className="svg-frame" style={{ marginBottom: 14 }}>
          <svg viewBox="0 0 340 250" width="100%" style={{ display: "block" }}>
            {edges.map(([a, b], i) => {
              const A = byId[a]; const B = byId[b];
              return <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="var(--ink)" strokeWidth="1.5" />;
            })}
            {nodes.map(n => {
              const fill   = n.status !== "ok" ? "var(--paper)" : "var(--ink)";
              const stroke = n.status === "out" ? "var(--danger)" : "var(--ink)";
              const dash   = n.status === "pending" ? "3 3" : undefined;
              return (
                <g key={n.id}>
                  <circle cx={n.x} cy={n.y} r={n.w / 2} fill={fill} stroke={stroke} strokeWidth="2" strokeDasharray={dash} />
                  <text x={n.x} y={n.y + 3} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700"
                    fill={n.status === "ok" ? "var(--paper)" : "var(--ink)"}>{n.lbl}</text>
                </g>
              );
            })}
          </svg>
          <div className="mono" style={{ fontSize: 9, letterSpacing: "0.1em", color: "var(--muted)", padding: "6px 10px", borderTop: "1.5px solid var(--line)", display: "flex", justifyContent: "space-around" }}>
            <span><span style={{ display: "inline-block", width: 8, height: 8, background: "var(--ink)", verticalAlign: "middle", marginRight: 4 }} />ACTIVO</span>
            <span><span style={{ display: "inline-block", width: 8, height: 8, border: "1.5px dashed var(--ink)", verticalAlign: "middle", marginRight: 4 }} />PENDIENTE</span>
            <span><span style={{ display: "inline-block", width: 8, height: 8, border: "1.5px solid var(--danger)", verticalAlign: "middle", marginRight: 4 }} />BAJA</span>
          </div>
        </div>
        <div className="kicker muted" style={{ marginBottom: 6 }}>TOP REFERENTES</div>
        <div className="list">
          {[
            { who: "DANIELA REYES",   n: 14, act: 11 },
            { who: "HUGO PALACIOS",   n: 9,  act: 6 },
            { who: "LIA MÉNDEZ",      n: 7,  act: 5 },
            { who: "TOMÁS CASTILLO",  n: 2,  act: 2 },
          ].map((r, i) => (
            <div className="item" key={i}>
              <span className="ix">#{i + 1}</span>
              <Avatar name={r.who} />
              <div className="main">
                <div style={{ fontSize: 13, fontWeight: 700 }}>{r.who}</div>
                <div className="mono body-sm muted">{r.act} / {r.n} ACTIVOS</div>
              </div>
              <div className="right mono" style={{ fontSize: 18, fontWeight: 700 }}>{r.n}</div>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}
