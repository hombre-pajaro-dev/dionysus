"use client";

import { Phone, AppBar, BottomNav, QR, Steps, Strip, Stripes, Avatar, useI18n, type ScreenProps } from "../primitives";

const HIST = [
  { d: "10/MAY 21:42", k: "DONATIVO · SAB 16 MAY", v: "+400", in: true },
  { d: "03/MAY 23:08", k: "POS · 2× CERVEZA + MEZCAL", v: "-180", in: false },
  { d: "03/MAY 21:18", k: "DONATIVO · SAB 03 MAY", v: "+400", in: true },
  { d: "26/ABR 23:55", k: "POS · MEZCAL", v: "-90", in: false },
  { d: "26/ABR 22:02", k: "TOP-UP EFECTIVO · CAJERO", v: "+200", in: true },
  { d: "26/ABR 20:54", k: "DONATIVO · SAB 26 ABR", v: "+400", in: true },
  { d: "19/ABR 23:31", k: "POS · MEZCAL + CHELA", v: "-180", in: false },
];

const EVENTS = [
  { date: "SÁB 16 MAY", time: "21:00", name: "JAM ABIERTO", host: "ANFITRIONA: LIA M.", min: 250, sug: 400, inCount: 18, donated: true },
  { date: "SÁB 23 MAY", time: "21:00", name: "NOCHE DE ESTÁNDARES", host: "TRÍO HUGO PALACIOS", min: 300, sug: 450, inCount: 7, donated: false },
  { date: "SÁB 30 MAY", time: "21:00", name: "JAM ABIERTO", host: "ANFITRIÓN: T. ALANIS", min: 250, sug: 400, inCount: 2, donated: false },
];

export function Sc_Invitation({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="INV/A8F2" />
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>{t("inv_kicker").toUpperCase()} · DANIELA R.</div>
        <h1 className="h1" style={{ marginBottom: 14 }}>{t("inv_title")}</h1>
        <p style={{ fontSize: 14, lineHeight: 1.45, marginBottom: 18 }}>{t("inv_body")}</p>

        <div className="card" style={{ marginBottom: 14 }}>
          <div className="kicker muted" style={{ marginBottom: 6 }}>QUIÉN TE INVITA</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Avatar name="Daniela Reyes" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Daniela Reyes</div>
              <div className="mono body-sm muted">Miembro desde 2024 · 14 invitaciones</div>
            </div>
          </div>
        </div>

        <div className="dl">
          <div className="row"><span className="k">Comunidad</span><span className="v">{name}</span></div>
          <div className="row"><span className="k">Venue</span><span className="v">CDMX · Roma Norte</span></div>
          <div className="row"><span className="k">Cuota</span><span className="v">Donativo / evento</span></div>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)", display: "flex", flexDirection: "column", gap: 8 }}>
        <button className="btn primary">{t("inv_cta")} →</button>
        <button className="btn ghost">{t("inv_cta_2")}</button>
      </div>
    </Phone>
  );
}

export function Sc_Manifesto({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="01/04" />
      <div className="screen-body">
        <Steps total={4} current={1} />
        <div className="kicker" style={{ marginBottom: 6 }}>{t("manifest_kicker")}</div>
        <h1 className="h1" style={{ marginBottom: 18 }}>{t("manifest_title")}</h1>
        <p style={{ marginBottom: 12 }}>{t("manifest_p1")}</p>
        <p style={{ marginBottom: 12 }}>{t("manifest_p2")}</p>
        <p style={{ marginBottom: 12 }}>{t("manifest_p3")}</p>
        <p style={{ marginBottom: 18 }}>{t("manifest_p4")}</p>
        <div className="rule dash" />
        <div className="mono body-sm muted">
          Al aceptar, queda un registro firmado con tu nombre y la fecha.<br />
          ACEPTADO_AT: <span style={{ color: "var(--ink)" }}>—</span>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)", display: "flex", flexDirection: "column", gap: 8 }}>
        <button className="btn ink">{t("manifest_accept")} ✓</button>
        <button className="btn ghost">{t("manifest_decline")}</button>
      </div>
    </Phone>
  );
}

export function Sc_Form({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="02/04" />
      <div className="screen-body">
        <Steps total={4} current={2} />
        <h2 className="h2" style={{ marginBottom: 14 }}>{t("form_title")}</h2>
        <div className="field">
          <label>{t("form_name")}</label>
          <div className="input" style={{ background: "var(--accent)" }}>Tomás Castillo</div>
        </div>
        <div className="field">
          <label>{t("form_city")}</label>
          <div className="input">CDMX</div>
        </div>
        <div className="field">
          <label>{t("form_phone")}</label>
          <div className="input">+52 55 4291 ████</div>
          <div className="hint">{t("form_phone_hint")}</div>
        </div>
        <div className="field">
          <label>{t("form_art")}</label>
          <div className="textarea" style={{ minHeight: 56 }}>guitarra, contrabajo, escribo de noche</div>
        </div>
        <div className="field">
          <label>{t("form_why")}</label>
          <div className="textarea" style={{ minHeight: 56, color: "var(--muted)" }}>vine a un jam con Dani el sábado pasado y…</div>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)" }}>
        <button className="btn primary">{t("form_submit")} →</button>
      </div>
    </Phone>
  );
}

export function Sc_OTP({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  const digits = ["4", "2", "9", "1", "•", "•"];
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="LOGIN" />
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>{t("otp_kicker")}</div>
        <h1 className="h1" style={{ marginBottom: 12 }}>{t("otp_title")}</h1>
        <p className="muted body-sm" style={{ marginBottom: 22 }}>{t("otp_sub")}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginBottom: 22 }}>
          {digits.map((d, i) => (
            <div key={i} style={{
              border: "2px solid var(--line)", padding: "14px 0",
              textAlign: "center", fontFamily: "var(--display)", fontSize: 22,
              background: i < 4 ? "var(--accent)" : "var(--paper)",
            }}>{d}</div>
          ))}
        </div>
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="kicker muted" style={{ marginBottom: 8 }}>SE ENVIÓ A WHATSAPP</div>
          <div className="mono" style={{ fontSize: 15, fontWeight: 600 }}>+52 55 ████ 4291</div>
        </div>
        <div className="mono body-sm muted" style={{ textAlign: "center" }}>
          {t("otp_resend")} · <span style={{ textDecoration: "underline", color: "var(--ink)" }}>{t("otp_change")}</span>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)" }}>
        <button className="btn ink">{t("confirm")} →</button>
      </div>
    </Phone>
  );
}

export function Sc_Pending({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="EN COLA" />
      <div className="screen-body" style={{ display: "flex", flexDirection: "column" }}>
        <div className="kicker" style={{ marginBottom: 6 }}>{t("pending_kicker")}</div>
        <h1 className="h1" style={{ marginBottom: 14 }}>{t("pending_title")}</h1>
        <div className="card ink" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ width: 10, height: 10, background: "var(--accent)", display: "inline-block" }} />
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>EN REVISIÓN</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.5, margin: 0 }}>{t("pending_body")}</p>
        </div>
        <div className="dl">
          <div className="row"><span className="k">Solicitante</span><span className="v">Tomás Castillo</span></div>
          <div className="row"><span className="k">Recibida</span><span className="v">21:34 · Hoy</span></div>
          <div className="row"><span className="k">Cola</span><span className="v">#3 de 7</span></div>
          <div className="row"><span className="k">Referente</span><span className="v">Daniela Reyes</span></div>
        </div>
        <div className="rule" />
        <div className="mono body-sm muted">
          Te avisaremos por WhatsApp.<br />Mientras tanto, puedes cerrar la app.
        </div>
      </div>
    </Phone>
  );
}

export function Sc_Welcome({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="04/04" />
      <div className="screen-body">
        <Steps total={4} current={4} />
        <div className="kicker" style={{ marginBottom: 6 }}>BIENVENIDA</div>
        <h1 className="h1" style={{ marginBottom: 14 }}>{t("welcome_title")}</h1>
        <p style={{ marginBottom: 18 }}>{t("welcome_body")}</p>
        <div className="card accent" style={{ marginBottom: 14 }}>
          <div className="kicker" style={{ marginBottom: 8 }}>MEMBER_ID</div>
          <div className="mono" style={{ fontSize: 16, fontWeight: 700 }}>NIDO-2026-0418</div>
          <div className="rule dash" style={{ margin: "10px 0", borderColor: "var(--accent-ink)" }} />
          <div className="kicker">DESDE</div>
          <div className="mono" style={{ fontSize: 14 }}>10 / MAY / 2026</div>
        </div>
        <div className="dl">
          <div className="row"><span className="k">Estado</span><span className="v"><span className="tag ok">ACTIVO</span></span></div>
          <div className="row"><span className="k">Próximo evento</span><span className="v">SAB 16 / MAY</span></div>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)", display: "flex", flexDirection: "column", gap: 8 }}>
        <button className="btn primary">{t("welcome_cta")} ◆ →</button>
        <button className="btn ghost">Ver el manifiesto otra vez</button>
      </div>
    </Phone>
  );
}

export function Sc_QR({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="MI PASE" />
      <div className="screen-body" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <div className="balance-block" style={{ marginLeft: -16, marginRight: -16, marginTop: -16, marginBottom: 16, borderBottom: "2px solid var(--line)" }}>
          <span className="lbl">{t("qr_balance_label").toUpperCase()}</span>
          <span className="amt"><span style={{ fontFamily: "var(--display)" }}>◆</span> 420</span>
          <span className="sub">{t("qr_balance_sub")} · ≈ $420 MXN</span>
        </div>
        <QR seed="tomas-castillo-NIDO-2026-0418" />
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textAlign: "center", marginTop: 10, color: "var(--muted)" }}>
          ID: NIDO-2026-0418 · ROTA C/24H
        </div>
        <div style={{ textAlign: "center", fontWeight: 700, fontSize: 16, marginTop: 8 }}>Tomás Castillo</div>
        <div className="mono body-sm muted" style={{ textAlign: "center", marginBottom: 14 }}>
          {t("qr_show").toUpperCase()}
        </div>
      </div>
      <BottomNav active="qr" />
    </Phone>
  );
}

export function Sc_Wallet({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="WALLET" />
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>LLEVA TU PASE A MANO</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>Agrega a tu Wallet</h2>
        <p className="body-sm muted" style={{ marginBottom: 18 }}>
          Tu balance se actualiza en automático cada vez que donas o consumes.
        </p>
        <div className="wallet-card apple" style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 18 }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em" }}>{name} · COMUNIDAD</span>
            <span style={{ fontFamily: "var(--display)", fontSize: 14 }}>{logo}</span>
          </div>
          <div className="mono" style={{ fontSize: 10, opacity: 0.6, letterSpacing: "0.1em" }}>BALANCE</div>
          <div style={{ fontFamily: "var(--display)", fontSize: 28, marginTop: 2 }}>◆ 420</div>
          <div className="mono" style={{ fontSize: 10, marginTop: 10, opacity: 0.7 }}>TOMÁS CASTILLO · 0418</div>
        </div>
        <button className="btn ink" style={{ marginBottom: 18 }}> Apple Wallet</button>
        <div className="wallet-card google" style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 18 }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em" }}>{name} · COMUNIDAD</span>
            <span style={{ fontFamily: "var(--display)", fontSize: 14 }}>{logo}</span>
          </div>
          <div className="mono" style={{ fontSize: 10, opacity: 0.6, letterSpacing: "0.1em" }}>BALANCE</div>
          <div style={{ fontFamily: "var(--display)", fontSize: 28, marginTop: 2 }}>◆ 420</div>
          <div className="mono" style={{ fontSize: 10, marginTop: 10, opacity: 0.7 }}>TOMÁS CASTILLO · 0418</div>
        </div>
        <button className="btn">G Pay · Google Wallet</button>
      </div>
      <BottomNav active="qr" />
    </Phone>
  );
}

export function Sc_History({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="HIST." />
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>{t("hist_kicker")}</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>{t("hist_title")}</h2>
        <div className="tabs" style={{ marginBottom: 14 }}>
          <div className="on">{t("hist_filter_all")}</div>
          <div>{t("hist_filter_in")}</div>
          <div>{t("hist_filter_out")}</div>
        </div>
        <div className="bigstat" style={{ marginBottom: -2 }}>
          <div className="l">BALANCE ACTUAL</div>
          <div className="v">◆ 420</div>
        </div>
        <div className="bigstat" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div><div className="l">TOTAL DONADO</div><div className="v" style={{ fontSize: 22 }}>$3,200</div></div>
          <div><div className="l">DESDE</div><div className="v" style={{ fontSize: 22 }}>ABR ·26</div></div>
        </div>
        <div className="list" style={{ marginTop: 14 }}>
          {HIST.map((h, i) => (
            <div className="item" key={i}>
              <span className="ix" style={{ width: 84 }}>{h.d}</span>
              <div className="main"><div style={{ fontSize: 12, fontWeight: 600 }}>{h.k}</div></div>
              <div className="right mono" style={{ fontWeight: 700, color: h.in ? "var(--ok)" : "var(--ink)" }}>◆{h.v}</div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="more" />
    </Phone>
  );
}

export function Sc_Events({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right={t("events_title").toUpperCase()} />
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>{t("events_kicker")}</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>{t("events_upcoming")}</h2>
        {EVENTS.map((e, i) => (
          <div className="card" key={i} style={{ marginBottom: -2, padding: 0 }}>
            <div style={{ display: "flex" }}>
              <div style={{
                width: 88, padding: 12,
                background: i === 0 ? "var(--accent)" : "var(--paper)",
                borderRight: "2px solid var(--line)",
                display: "flex", flexDirection: "column", justifyContent: "space-between",
              }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", fontWeight: 700 }}>
                  {e.date.split(" ")[0]}<br />{e.date.split(" ")[1]} {e.date.split(" ")[2]}
                </div>
                <div className="mono" style={{ fontSize: 10, color: i === 0 ? "var(--accent-ink)" : "var(--muted)" }}>{e.time}</div>
              </div>
              <div style={{ flex: 1, padding: 12 }}>
                <div className="h3" style={{ marginBottom: 4 }}>{e.name}</div>
                <div className="mono body-sm muted" style={{ marginBottom: 8, letterSpacing: "0.04em" }}>{e.host}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                  <span className="tag mono">MÍN ${e.min}</span>
                  {e.donated
                    ? <span className="tag accent">✓ DONADO</span>
                    : <span className="tag">{e.inCount} {t("event_members_in")}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="rule" />
        <div className="kicker muted" style={{ marginBottom: 8 }}>{t("events_past")}</div>
        <div className="list">
          <div className="item">
            <span className="ix">03/MAY</span>
            <div className="main">
              <div style={{ fontSize: 12, fontWeight: 600 }}>JAM ABIERTO</div>
              <div className="mono body-sm muted">DONASTE ◆400 · ASISTIÓ</div>
            </div>
            <span className="tag ok">✓</span>
          </div>
          <div className="item">
            <span className="ix">26/ABR</span>
            <div className="main">
              <div style={{ fontSize: 12, fontWeight: 600 }}>NOCHE DE BLUES</div>
              <div className="mono body-sm muted">DONASTE ◆400 · ASISTIÓ</div>
            </div>
            <span className="tag ok">✓</span>
          </div>
        </div>
      </div>
      <BottomNav active="events" />
    </Phone>
  );
}

export function Sc_EventDetail({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="EVENTO" />
      <div className="screen-body tight">
        <div style={{ background: "var(--ink)", color: "var(--paper)", padding: 18 }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)", marginBottom: 10 }}>SAB · 23 MAY · 21:00</div>
          <h1 className="h1" style={{ marginBottom: 8 }}>NOCHE DE<br />ESTÁNDARES</h1>
          <div className="mono body-sm" style={{ opacity: 0.7 }}>TRÍO HUGO PALACIOS</div>
        </div>
        <div style={{ padding: 16 }}>
          <p style={{ marginBottom: 14 }}>
            Noche de jazz acústico. Hugo trae set fijo de 9 a 10:30 y abrimos jam a las 11. Cupo natural ~40 personas. Si tocas, trae tu instrumento.
          </p>
          <div className="dl" style={{ marginBottom: 14 }}>
            <div className="row"><span className="k">{t("event_min")}</span><span className="v">◆ 300</span></div>
            <div className="row"><span className="k">{t("event_sug")}</span><span className="v">◆ 450</span></div>
            <div className="row"><span className="k">Cupo</span><span className="v">40</span></div>
            <div className="row"><span className="k">Confirmados</span><span className="v">7 · MIEMBROS</span></div>
          </div>
          <div className="kicker muted" style={{ marginBottom: 8 }}>VAN A IR</div>
          <div style={{ display: "flex", marginBottom: 14 }}>
            {["DR", "TC", "HP", "LM", "AF", "+3"].map((s, i) => (
              <div key={i} className="avatar" style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 10 - i }}>{s}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)" }}>
        <button className="btn primary">{t("event_donate")} ◆300+</button>
      </div>
    </Phone>
  );
}

export function Sc_PayMethod({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="DONATIVO" />
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>SAB 23 MAY · NOCHE DE ESTÁNDARES</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>{t("pay_title")}</h2>
        <div className="field">
          <label>{t("pay_amount")}</label>
          <div style={{ border: "2px solid var(--line)", padding: 14, display: "flex", alignItems: "baseline", justifyContent: "space-between", background: "var(--accent)" }}>
            <span style={{ fontFamily: "var(--display)", fontSize: 30 }}>$ 400</span>
            <span className="mono body-sm">= ◆ 400</span>
          </div>
          <div className="hint">{t("pay_amount_hint")}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, marginBottom: 18 }}>
          {[300, 400, 500, 700].map(v => (
            <div key={v} className="tag mono" style={{ justifyContent: "center", padding: "8px", fontSize: 12, background: v === 400 ? "var(--ink)" : "var(--paper)", color: v === 400 ? "var(--paper)" : "var(--ink)" }}>${v}</div>
          ))}
        </div>
        <div className="kicker" style={{ marginBottom: 8 }}>{t("pay_method")}</div>
        <div className="card" style={{ marginBottom: -2, display: "flex", alignItems: "center", gap: 12, padding: 14, background: "var(--ink)", color: "var(--paper)" }}>
          <div style={{ width: 24, height: 24, border: "2px solid var(--accent)", background: "var(--accent)" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{t("pay_card")}</div>
            <div className="mono body-sm" style={{ opacity: 0.7 }}>VISA ···· 4291 · CONFIRMACIÓN INMEDIATA</div>
          </div>
        </div>
        <div className="card" style={{ display: "flex", alignItems: "center", gap: 12, padding: 14 }}>
          <div style={{ width: 24, height: 24, border: "2px solid var(--line)" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{t("pay_oxxo")}</div>
            <div className="mono body-sm muted">EN EFECTIVO · CONFIRMA EN ~30 MIN</div>
          </div>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)" }}>
        <button className="btn primary">{t("pay_pay")} 400 →</button>
      </div>
    </Phone>
  );
}

export function Sc_PayOXXO({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="OXXO" />
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>SAB 23 MAY · $ 400</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>{t("pay_oxxo_title")}</h2>
        <div className="card ink" style={{ marginBottom: 14 }}>
          <div className="kicker" style={{ color: "var(--accent)", marginBottom: 6 }}>{t("pay_oxxo_ref")}</div>
          <div className="mono" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.05em" }}>9 3402 8841 6072 4</div>
          <div className="rule" style={{ borderColor: "rgba(244,241,234,0.3)", margin: "10px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
            <span className="mono" style={{ opacity: 0.7 }}>MONTO</span>
            <span className="mono" style={{ fontWeight: 700 }}>$ 400.00 MXN</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
            <span className="mono" style={{ opacity: 0.7 }}>{t("pay_oxxo_expires")}</span>
            <span className="mono" style={{ fontWeight: 700, color: "var(--accent)" }}>47:58:12</span>
          </div>
        </div>
        <Stripes style={{ height: 60, marginBottom: 14 }}>CÓDIGO DE BARRAS</Stripes>
        <div className="dl">
          <div className="row"><span className="k">PASO 1</span><span className="v">VE A CUALQUIER OXXO</span></div>
          <div className="row"><span className="k">PASO 2</span><span className="v">DI "PAGO DE SERVICIO"</span></div>
          <div className="row"><span className="k">PASO 3</span><span className="v">MUESTRA LA REFERENCIA</span></div>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)" }}>
        <button className="btn">{t("pay_oxxo_share")} ↗</button>
      </div>
    </Phone>
  );
}

export function Sc_PayDone({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="✓ OK" />
      <div className="screen-body" style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ width: 80, height: 80, border: "3px solid var(--ink)", background: "var(--accent)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--display)", fontSize: 44 }}>✓</div>
          <h1 className="h1" style={{ textAlign: "center", marginBottom: 8 }}>{t("pay_done_title")}</h1>
          <p style={{ textAlign: "center", marginBottom: 22 }}>{t("pay_done_body", { n: 400 })}</p>
          <div className="dl">
            <div className="row"><span className="k">Acreditado</span><span className="v">◆ 400</span></div>
            <div className="row"><span className="k">Balance nuevo</span><span className="v" style={{ color: "var(--ok)" }}>◆ 820</span></div>
            <div className="row"><span className="k">Acceso</span><span className="v">SAB 23 MAY ✓</span></div>
            <div className="row"><span className="k">Referencia</span><span className="v mono" style={{ fontSize: 11 }}>TXN_9F284C</span></div>
          </div>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)", display: "flex", flexDirection: "column", gap: 8 }}>
        <button className="btn primary">{t("pay_done_cta")} ◆ →</button>
        <button className="btn ghost">{t("done")}</button>
      </div>
    </Phone>
  );
}

export function Sc_TopUp({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="TOP-UP" />
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>SUMA SALDO</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>Agrega tokens</h2>
        <p className="body-sm muted" style={{ marginBottom: 14 }}>
          Sin amarrarlo a un evento. Útil si vas a consumir en la barra y no quieres quedarte corto.
        </p>
        <div className="balance-block" style={{ marginBottom: 14 }}>
          <span className="lbl">BALANCE ACTUAL</span>
          <span className="amt">◆ 420</span>
        </div>
        <div className="field">
          <label>¿Cuánto sumas?</label>
          <div className="input" style={{ background: "var(--accent)", fontSize: 22, fontFamily: "var(--display)" }}>$ 200</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, marginBottom: 18 }}>
          {[100, 200, 300, 500].map(v => (
            <div key={v} className="tag mono" style={{ justifyContent: "center", padding: "8px", fontSize: 12, background: v === 200 ? "var(--ink)" : "var(--paper)", color: v === 200 ? "var(--paper)" : "var(--ink)" }}>${v}</div>
          ))}
        </div>
        <div className="dl">
          <div className="row"><span className="k">Sumas</span><span className="v">◆ 200</span></div>
          <div className="row"><span className="k">Total después</span><span className="v">◆ 620</span></div>
          <div className="row"><span className="k">Cargo</span><span className="v">$ 200 · VISA 4291</span></div>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)" }}>
        <button className="btn primary">CONFIRMAR · $ 200</button>
      </div>
    </Phone>
  );
}
