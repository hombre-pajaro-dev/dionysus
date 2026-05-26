"use client";

import { Phone, AppBar, Strip, Avatar, useI18n, type ScreenProps } from "../primitives";

export function Sc_DoorScan({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="ROL · PUERTA" />
      <Strip ink>EVENTO ACTIVO · SAB 16 MAY · JAM ABIERTO · 21:00</Strip>
      <div className="screen-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div className="kicker">{t("door_kicker")}</div>
        <h2 className="h2">{t("door_title")}</h2>
        <div className="scanner">
          <div className="reticle"><i /><i /></div>
          <div className="scan-line" />
          <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center" }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--accent)" }}>
              {t("door_scan").toUpperCase()}
            </span>
          </div>
        </div>
        <div className="dl">
          <div className="row"><span className="k">Hoy</span><span className="v">42 / 80 ESCANEADOS</span></div>
          <div className="row"><span className="k">Donativos OK</span><span className="v">40</span></div>
          <div className="row"><span className="k">Resueltos en puerta</span><span className="v">2</span></div>
        </div>
        <button className="btn">BUSCAR POR NOMBRE / WHATSAPP</button>
      </div>
    </Phone>
  );
}

export function Sc_DoorValid({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="ROL · PUERTA" />
      <div className="screen-body" style={{ background: "var(--accent)", padding: 0 }}>
        <div style={{ padding: 16 }}>
          <div className="kicker">RESULTADO</div>
          <h1 className="h1" style={{ fontSize: 44, marginTop: 6, marginBottom: 6 }}>{t("door_valid")}</h1>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.1em" }}>VERIFICADO EN 0.4s</div>
        </div>
        <div style={{ background: "var(--paper)", padding: 16, borderTop: "2px solid var(--line)" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
            <Avatar name="Tomás Castillo" size="lg" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 17 }}>Tomás Castillo</div>
              <div className="mono body-sm muted">NIDO-2026-0418</div>
              <div style={{ marginTop: 4 }}><span className="tag ok">ACTIVO · 3RA VISITA</span></div>
            </div>
          </div>
          <div className="dl">
            <div className="row"><span className="k">{t("door_event_label")}</span><span className="v">SAB 16 MAY · JAM</span></div>
            <div className="row"><span className="k">Donativo</span><span className="v">◆ 400 · {t("st_paid").toUpperCase()}</span></div>
            <div className="row"><span className="k">Balance</span><span className="v">◆ 820</span></div>
            <div className="row"><span className="k">Referente</span><span className="v">Daniela Reyes</span></div>
          </div>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)", display: "flex", gap: 8 }}>
        <button className="btn" style={{ flex: 1 }}>SIGUIENTE</button>
        <button className="btn ink" style={{ flex: 1 }}>DEJAR PASAR ✓</button>
      </div>
    </Phone>
  );
}

export function Sc_DoorInvalid({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="ROL · PUERTA" />
      <div className="screen-body" style={{ background: "var(--ink)", color: "var(--paper)", padding: 0 }}>
        <div style={{ padding: 16 }}>
          <div className="kicker" style={{ color: "var(--danger)" }}>RESULTADO</div>
          <h1 className="h1" style={{ fontSize: 44, marginTop: 6, marginBottom: 6, color: "var(--danger)" }}>{t("door_invalid")}</h1>
          <div className="mono" style={{ fontSize: 12, letterSpacing: "0.06em", color: "var(--paper)" }}>{t("door_invalid_reason").toUpperCase()}</div>
        </div>
        <div style={{ background: "var(--paper)", color: "var(--ink)", padding: 16, borderTop: "2px solid var(--line)" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
            <Avatar name="Sofía Mendoza" size="lg" />
            <div>
              <div style={{ fontWeight: 700, fontSize: 17 }}>Sofía Mendoza</div>
              <div className="mono body-sm muted">NIDO-2026-0307</div>
              <div style={{ marginTop: 4 }}><span className="tag">ACTIVA · 1RA VEZ AQUÍ</span></div>
            </div>
          </div>
          <div className="dl">
            <div className="row"><span className="k">Evento</span><span className="v">SAB 16 MAY · JAM</span></div>
            <div className="row"><span className="k">Donativo</span><span className="v" style={{ color: "var(--danger)" }}>{t("st_owes").toUpperCase()}</span></div>
            <div className="row"><span className="k">Mínimo</span><span className="v">◆ 250</span></div>
            <div className="row"><span className="k">Balance</span><span className="v">◆ 90</span></div>
          </div>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)", display: "flex", flexDirection: "column", gap: 8 }}>
        <button className="btn primary">{t("door_invalid_action").toUpperCase()} →</button>
        <button className="btn ghost">CERRAR</button>
      </div>
    </Phone>
  );
}

export function Sc_DoorApproveInline({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="ROL · PUERTA" />
      <Strip>SOLICITUD EN COLA · LLEGÓ AL VENUE</Strip>
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>APROBACIÓN EN PUERTA</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>Llegó sin estar aprobado</h2>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
          <Avatar name="Mariana López" size="lg" />
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Mariana López</div>
            <div className="mono body-sm muted">+52 55 4017 ████</div>
            <div style={{ marginTop: 4 }}><span className="tag">PENDIENTE · #4 EN COLA</span></div>
          </div>
        </div>
        <div className="dl" style={{ marginBottom: 14 }}>
          <div className="row"><span className="k">Referente</span><span className="v">Hugo Palacios</span></div>
          <div className="row"><span className="k">Ciudad</span><span className="v">CDMX</span></div>
          <div className="row"><span className="k">Arte</span><span className="v">CHELO / PIANO</span></div>
          <div className="row"><span className="k">Manifiesto</span><span className="v">✓ ACEPTADO 18:02</span></div>
        </div>
        <div className="card" style={{ marginBottom: 14, background: "var(--paper-2)" }}>
          <div className="kicker muted" style={{ marginBottom: 6 }}>POR QUÉ ENTRA</div>
          <p className="body-sm" style={{ margin: 0 }}>"Hugo me invitó, vine la semana pasada con él. Quiero seguir viniendo."</p>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)", display: "flex", flexDirection: "column", gap: 8 }}>
        <button className="btn primary">{t("approve").toUpperCase()} Y COBRAR ◆250 →</button>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" style={{ flex: 1 }}>SOLO APROBAR</button>
          <button className="btn danger" style={{ flex: 1 }}>{t("reject").toUpperCase()}</button>
        </div>
      </div>
    </Phone>
  );
}

export function Sc_CashSearch({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  const list = [
    { n: "Tomás Castillo", p: "+52 55 4291 ████", b: 420 },
    { n: "Tomasa Salinas", p: "+52 55 8104 ████", b: 0 },
    { n: "Tomi García",    p: "+52 33 9912 ████", b: 1200 },
  ];
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="ROL · CAJERO" />
      <Strip ink>EVENTO ACTIVO · SAB 16 MAY · JAM ABIERTO</Strip>
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>{t("cash_kicker")}</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>{t("cash_title")}</h2>
        <div className="field" style={{ marginBottom: 14 }}>
          <div className="input" style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--accent)" }}>
            <span className="mono" style={{ fontSize: 13, fontWeight: 700 }}>⌕</span>
            <span>tom</span>
          </div>
          <div className="hint">{t("cash_search_ph")}</div>
        </div>
        <div className="kicker muted" style={{ marginBottom: 6 }}>3 RESULTADOS</div>
        <div className="list">
          {list.map((m, i) => (
            <div className="item" key={i}>
              <Avatar name={m.n} />
              <div className="main">
                <div style={{ fontSize: 14, fontWeight: 600 }}>{m.n}</div>
                <div className="mono body-sm muted">{m.p}</div>
              </div>
              <div className="right">
                <div className="mono" style={{ fontSize: 13, fontWeight: 700 }}>◆ {m.b}</div>
                <div className="mono" style={{ fontSize: 9, letterSpacing: "0.1em", color: "var(--muted)" }}>BALANCE</div>
              </div>
            </div>
          ))}
        </div>
        <div className="rule" />
        <button className="btn">+ {t("cash_register_new").toUpperCase()}</button>
      </div>
    </Phone>
  );
}

export function Sc_CashAdd({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="ROL · CAJERO" />
      <Strip>TOMÁS CASTILLO · NIDO-2026-0418 · BALANCE ◆ 420</Strip>
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>EFECTIVO RECIBIDO</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>{t("cash_add_title")}</h2>
        <div className="field">
          <label>{t("cash_amount")}</label>
          <div className="input" style={{ background: "var(--accent)", fontSize: 26, fontFamily: "var(--display)" }}>$ 300.00</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, marginBottom: 14 }}>
          {[100, 200, 300, 500, 1000, "OTRO"].map(v => (
            <div key={v} className="tag mono" style={{ justifyContent: "center", padding: "10px", fontSize: 13, background: v === 300 ? "var(--ink)" : "var(--paper)", color: v === 300 ? "var(--paper)" : "var(--ink)" }}>
              {typeof v === "number" ? `$${v}` : v}
            </div>
          ))}
        </div>
        <div className="dl">
          <div className="row"><span className="k">{t("cash_tokens")}</span><span className="v">◆ 300</span></div>
          <div className="row"><span className="k">Balance después</span><span className="v" style={{ color: "var(--ok)" }}>◆ 720</span></div>
          <div className="row"><span className="k">Cajero</span><span className="v">LUIS R. · 21:48</span></div>
          <div className="row"><span className="k">REF</span><span className="v mono" style={{ fontSize: 10 }}>CASH_8A41</span></div>
        </div>
        <div className="rule" />
        <div className="mono body-sm muted">Va a quedar registrado. El miembro recibe push y WhatsApp con el cargo.</div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)" }}>
        <button className="btn primary">{t("cash_confirm")} 300 ◆</button>
      </div>
    </Phone>
  );
}

export function Sc_POSScan({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="ROL · POS" />
      <Strip ink>POS · LA BARRA · TURNO 21:00 – 02:00</Strip>
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>{t("pos_kicker")}</div>
        <h2 className="h2" style={{ marginBottom: 12 }}>Cuenta · #28</h2>
        <div className="card" style={{ marginBottom: 14, padding: 0 }}>
          {[
            { q: "2", n: "CERVEZA ARTESANAL", p: 90 },
            { q: "1", n: "MEZCAL ESPADÍN", p: 120 },
            { q: "1", n: "AGUA MINERAL", p: 35 },
          ].map((it, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 12px", borderBottom: "1px solid var(--line)", fontFamily: "var(--mono)", fontSize: 13 }}>
              <span><span style={{ width: 18, display: "inline-block" }}>{it.q}×</span> {it.n}</span>
              <span>${(it.p * Number(it.q)).toFixed(0)}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px", fontFamily: "var(--display)", fontSize: 22 }}>
            <span>TOTAL</span><span>$ 335</span>
          </div>
        </div>
        <div className="dl">
          <div className="row"><span className="k">Equivalente</span><span className="v">◆ 335 TOKENS</span></div>
        </div>
        <div className="rule" />
        <p className="body-sm muted">Escanea el QR del miembro para cobrar.</p>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)", display: "flex", gap: 8 }}>
        <button className="btn" style={{ flex: 1 }}>EFECTIVO</button>
        <button className="btn primary" style={{ flex: 2 }}>{t("pos_pay").toUpperCase()} ◆335 ⌕</button>
      </div>
    </Phone>
  );
}

export function Sc_POSConfirm({ logo, name }: ScreenProps) {
  const { t } = useI18n();
  return (
    <Phone>
      <AppBar logo={logo} name={name} right="ROL · POS" />
      <div className="screen-body">
        <div className="kicker" style={{ marginBottom: 6 }}>QR LEÍDO · CONFIRMAR DÉBITO</div>
        <h2 className="h2" style={{ marginBottom: 14 }}>Cobrar a este miembro</h2>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
          <Avatar name="Tomás Castillo" size="lg" />
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Tomás Castillo</div>
            <div className="mono body-sm muted">NIDO-2026-0418</div>
            <div style={{ marginTop: 4 }}><span className="tag ok">BALANCE OK</span></div>
          </div>
        </div>
        <div className="card ink" style={{ marginBottom: 14 }}>
          <div className="kicker" style={{ color: "var(--accent)", marginBottom: 4 }}>SE VA A DESCONTAR</div>
          <div style={{ fontFamily: "var(--display)", fontSize: 40, lineHeight: 1 }}>◆ 335</div>
          <div className="rule" style={{ borderColor: "rgba(244,241,234,0.3)", margin: "10px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 12 }}>
            <span style={{ opacity: 0.7 }}>BALANCE ACTUAL</span><span>◆ 820</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 12 }}>
            <span style={{ opacity: 0.7 }}>DESPUÉS</span><span style={{ color: "var(--accent)" }}>◆ 485</span>
          </div>
        </div>
        <div className="dl">
          <div className="row"><span className="k">Cuenta</span><span className="v">#28 · 4 ÍTEMS</span></div>
          <div className="row"><span className="k">Operador</span><span className="v">LUIS R.</span></div>
          <div className="row"><span className="k">TXN ID</span><span className="v mono" style={{ fontSize: 10 }}>POS_2026_05_16_0028</span></div>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "2px solid var(--line)", display: "flex", gap: 8 }}>
        <button className="btn" style={{ flex: 1 }}>{t("cancel").toUpperCase()}</button>
        <button className="btn primary" style={{ flex: 2 }}>{t("pos_confirm").toUpperCase()} ✓</button>
      </div>
    </Phone>
  );
}
