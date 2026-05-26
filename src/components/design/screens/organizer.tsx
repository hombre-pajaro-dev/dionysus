"use client";

import { Phone, AppBar, Strip, Avatar, useI18n, type ScreenProps } from "../primitives";

export function Sc_OrgInbox({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  const queue = [
    { n: "Mariana López",    who: "HUGO PALACIOS", time: "21:58 · HOY",       urgent: true },
    { n: "Pablo Cienfuegos", who: "DANIELA REYES", time: "18:12 · HOY",       urgent: false },
    { n: "Renata Olvera",    who: "TOMÁS C.",      time: "AYER · 23:41",      urgent: false },
    { n: "Iván Cabrera",     who: "LIA M.",         time: "AYER · 22:08",      urgent: false },
    { n: "Fer Treviño",      who: "ANA F.",         time: "07/MAY · 20:55",    urgent: false },
    { n: "Karla Domínguez",  who: "HUGO P.",        time: "06/MAY · 22:18",    urgent: false },
    { n: "Bruno Aldama",     who: "DANIELA R.",     time: "05/MAY · 19:33",    urgent: false },
  ];
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="ROL · ORG." />
      <Strip>1 EN PUERTA · 6 EN COLA DESDE LA SEMANA PASADA</Strip>
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>{t("org_inbox_sub")}</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>{t("org_inbox")}</h2>
        <div className="tabs" style={{ marginBottom: 14 }}>
          <div className="on">EN COLA · 7</div>
          <div>APROBADOS</div>
          <div>RECHAZADOS</div>
        </div>
        <div className="list">
          {queue.map((q, i) => (
            <div className="item" key={i} style={{ alignItems: "stretch" }}>
              <Avatar name={q.n} />
              <div className="main">
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{q.n}</span>
                  {q.urgent ? <span className="tag accent">EN PUERTA</span> : null}
                </div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.06em", color: "var(--muted)", marginTop: 2 }}>
                  INV. POR {q.who} · {q.time}
                </div>
              </div>
              <div className="right mono" style={{ fontSize: 16 }}>→</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bottomnav">
        <div className="on"><span className="gl">⌂</span><span>INBOX</span></div>
        <div><span className="gl">▢</span><span>EVENTOS</span></div>
        <div><span className="gl">≡</span><span>MIEMBROS</span></div>
        <div><span className="gl">✦</span><span>MI PASE</span></div>
      </div>
    </Phone>
  );
}

export function Sc_OrgApprovalDetail({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="SOLICITUD" />
      <Strip>EN PUERTA · ESPERA UNA RESPUESTA TUYA</Strip>
      <div className="screen-body">
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
          <Avatar name="Mariana López" size="lg" />
          <div>
            <div style={{ fontWeight: 700, fontSize: 17 }}>Mariana López</div>
            <div className="mono body-sm muted">+52 55 4017 ████ · CDMX</div>
            <div style={{ marginTop: 4 }}><span className="tag">PENDIENTE</span></div>
          </div>
        </div>
        <div className="dl" style={{ marginBottom: 14 }}>
          <div className="row"><span className="k">Invitó</span><span className="v">HUGO PALACIOS</span></div>
          <div className="row"><span className="k">Manifiesto</span><span className="v">✓ 18:02</span></div>
          <div className="row"><span className="k">Recibida</span><span className="v">21:58 · HOY</span></div>
        </div>
        <div className="card" style={{ marginBottom: -2 }}>
          <div className="kicker muted" style={{ marginBottom: 6 }}>QUÉ HACE</div>
          <p className="body-sm" style={{ margin: 0 }}>Chelo y piano. Toco con Hugo desde el conservatorio. También doy clases.</p>
        </div>
        <div className="card" style={{ marginBottom: -2 }}>
          <div className="kicker muted" style={{ marginBottom: 6 }}>CÓMO SE ENTERÓ</div>
          <p className="body-sm" style={{ margin: 0 }}>Hugo me trajo al jam del 03 de mayo.</p>
        </div>
        <div className="card" style={{ marginBottom: 14 }}>
          <div className="kicker muted" style={{ marginBottom: 6 }}>POR QUÉ</div>
          <p className="body-sm" style={{ margin: 0 }}>Quiero seguir viniendo. Me gustó el ambiente y quiero entrar al jam la próxima.</p>
        </div>
        <div className="rule dash" />
        <div className="kicker muted" style={{ marginBottom: 6 }}>NOTA INTERNA</div>
        <p className="body-sm muted">Hugo invitó a 6 personas este año. 4 activas, 1 dada de baja, 1 pendiente.</p>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)", display: "flex", flexDirection: "column", gap: 8 }}>
        <button className="btn primary">{t("org_approve_d").toUpperCase()} →</button>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" style={{ flex: 1 }}>POSPONER</button>
          <button className="btn danger" style={{ flex: 1 }}>{t("reject").toUpperCase()}</button>
        </div>
      </div>
    </Phone>
  );
}

export function Sc_OrgEvents({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  const evs = [
    { d: "SAB 16 MAY", n: "JAM ABIERTO",         conf: 18, sold: 7200, min: 250, status: "abierto" },
    { d: "SAB 23 MAY", n: "NOCHE DE ESTÁNDARES",  conf: 7,  sold: 3150, min: 300, status: "abierto" },
    { d: "SAB 30 MAY", n: "JAM ABIERTO",          conf: 2,  sold: 800,  min: 250, status: "borrador" },
  ];
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="ROL · ORG." />
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>SÁBADOS EN EL NIDO</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>{t("org_events_title")}</h2>
        <button className="btn ink" style={{ marginBottom: 14 }}>+ {t("org_new_event").toUpperCase()}</button>
        <div className="list">
          {evs.map((e, i) => (
            <div className="item" key={i} style={{ flexDirection: "column", alignItems: "stretch", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", fontWeight: 700 }}>{e.d}</span>
                {e.status === "borrador"
                  ? <span className="tag">BORRADOR</span>
                  : <span className="tag ok">PUBLICADO</span>}
              </div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{e.n}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                <div className="bigstat" style={{ padding: 8 }}>
                  <div className="v" style={{ fontSize: 18 }}>{e.conf}</div>
                  <div className="l">CONF.</div>
                </div>
                <div className="bigstat" style={{ padding: 8 }}>
                  <div className="v" style={{ fontSize: 18 }}>${e.sold.toLocaleString()}</div>
                  <div className="l">RECAUD.</div>
                </div>
                <div className="bigstat" style={{ padding: 8 }}>
                  <div className="v" style={{ fontSize: 18 }}>${e.min}</div>
                  <div className="l">MÍN.</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bottomnav">
        <div><span className="gl">⌂</span><span>INBOX</span></div>
        <div className="on"><span className="gl">▢</span><span>EVENTOS</span></div>
        <div><span className="gl">≡</span><span>MIEMBROS</span></div>
        <div><span className="gl">✦</span><span>MI PASE</span></div>
      </div>
    </Phone>
  );
}

export function Sc_OrgCreateEvent({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="NUEVO" />
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>BORRADOR · NO PUBLICADO</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>{t("org_event_form")}</h2>
        <div className="field">
          <label>{t("org_field_name")}</label>
          <div className="input" style={{ background: "var(--accent)" }}>Noche de Bossa</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>{t("org_field_date")}</label>
            <div className="input">06 / JUN / 2026</div>
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label>{t("org_field_time")}</label>
            <div className="input">21:00</div>
          </div>
        </div>
        <div className="field">
          <label>{t("org_field_min")}</label>
          <div className="input" style={{ display: "flex", justifyContent: "space-between" }}>
            <span>$ 300 MXN</span>
            <span className="muted">= ◆ 300</span>
          </div>
        </div>
        <div className="field">
          <label>{t("org_field_audience")}</label>
          <div className="tabs">
            <div className="on">SOLO MIEMBROS</div>
            <div>+1 INVITADO</div>
          </div>
        </div>
        <div className="field">
          <label>{t("org_field_desc")}</label>
          <div className="textarea" style={{ minHeight: 70 }}>
            Set de bossa con Lia M. y trío invitado. Cupo 40. Jam abierto al final.
          </div>
        </div>
        <div className="dl">
          <div className="row"><span className="k">Cupo estimado</span><span className="v">40</span></div>
          <div className="row"><span className="k">Notificación</span><span className="v">A TODOS · WHATSAPP</span></div>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)", display: "flex", gap: 8 }}>
        <button className="btn" style={{ flex: 1 }}>GUARDAR BORRADOR</button>
        <button className="btn primary" style={{ flex: 1 }}>{t("org_publish").toUpperCase()} →</button>
      </div>
    </Phone>
  );
}

export function Sc_OrgEventMetrics({ logo, name }: ScreenProps) {
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="MÉTRICAS" />
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>SAB 16 MAY · JAM ABIERTO</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>Cómo va</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 14 }}>
          <div className="bigstat"><div className="v">18</div><div className="l">CONFIRMADOS</div></div>
          <div className="bigstat" style={{ background: "var(--accent)" }}><div className="v">$ 7,200</div><div className="l">RECAUDADO</div></div>
          <div className="bigstat"><div className="v">22</div><div className="l">PROYECCIÓN</div></div>
          <div className="bigstat"><div className="v">$ 400</div><div className="l">PROM. / MIEMBRO</div></div>
        </div>
        <div className="kicker muted" style={{ marginBottom: 8 }}>DONATIVOS POR DÍA</div>
        <div className="svg-frame" style={{ padding: 10, marginBottom: 14 }}>
          <svg viewBox="0 0 240 80" width="100%" height="80">
            {[12, 18, 26, 22, 32, 44, 60, 70, 88, 110, 144, 168, 196].map((h, i) => (
              <rect key={i} x={i * 18 + 4} y={80 - h * 0.4} width={12} height={h * 0.4} fill="var(--ink)" />
            ))}
          </svg>
          <div className="mono" style={{ fontSize: 9, letterSpacing: "0.1em", color: "var(--muted)", marginTop: 6, display: "flex", justifyContent: "space-between" }}>
            <span>03 MAY</span><span>HOY</span>
          </div>
        </div>
        <div className="kicker muted" style={{ marginBottom: 8 }}>CONFIRMADOS</div>
        <div className="list">
          {["DR — Daniela Reyes · $400", "TC — Tomás Castillo · $400", "HP — Hugo Palacios · $500", "LM — Lia Méndez · $450"].map((s, i) => (
            <div className="item" key={i}>
              <Avatar name={s.split(" — ")[1].split(" ").slice(0, 2).join(" ")} />
              <div className="main mono body-sm">{s}</div>
              <span className="tag ok">PAGÓ</span>
            </div>
          ))}
        </div>
      </div>
    </Phone>
  );
}
