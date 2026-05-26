"use client";

import { useState, useCallback } from "react";
import { I18nProvider, type ScreenProps } from "@/components/design/primitives";
import type { Lang } from "@/lib/i18n/comunidad";
import {
  Sc_Invitation, Sc_Manifesto, Sc_Form, Sc_OTP, Sc_Pending, Sc_Welcome,
  Sc_QR, Sc_Wallet, Sc_History, Sc_Events, Sc_EventDetail,
  Sc_PayMethod, Sc_PayOXXO, Sc_PayDone, Sc_TopUp,
} from "@/components/design/screens/member";
import {
  Sc_DoorScan, Sc_DoorValid, Sc_DoorInvalid, Sc_DoorApproveInline,
  Sc_CashSearch, Sc_CashAdd, Sc_POSScan, Sc_POSConfirm,
} from "@/components/design/screens/operator";
import {
  Sc_OrgInbox, Sc_OrgApprovalDetail, Sc_OrgEvents, Sc_OrgCreateEvent, Sc_OrgEventMetrics,
} from "@/components/design/screens/organizer";
import {
  Sc_AdmRoles, Sc_AdmTransactions, Sc_AdmReferrals,
} from "@/components/design/screens/admin";

const ACCENT_PRESETS = ["#d4ff3a", "#ff5a3a", "#3aff9b", "#3a9eff", "#ff3a8c", "#ffffff"];

type Tweak = { accent: string; logo: string; name: string; lang: Lang; dark: boolean };

function Artboard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="design-artboard">
      <div className="design-artboard-label">{label}</div>
      {children}
    </div>
  );
}

function Section({ title, subtitle, children }: {
  title: string; subtitle: string; children: React.ReactNode;
}) {
  return (
    <div className="design-section">
      <div className="design-section-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="design-artboard-row">{children}</div>
    </div>
  );
}

export default function DesignPage() {
  const [tweak, setTweak] = useState<Tweak>({
    accent: "#d4ff3a",
    logo: "N",
    name: "EL NIDO",
    lang: "es",
    dark: false,
  });

  const update = useCallback(<K extends keyof Tweak>(key: K, val: Tweak[K]) => {
    setTweak(prev => ({ ...prev, [key]: val }));
  }, []);

  const props: ScreenProps = { logo: tweak.logo, name: tweak.name };

  return (
    <I18nProvider lang={tweak.lang}>
      <div
        className={`design-root${tweak.dark ? " ds-dark" : ""}`}
        style={{ "--accent": tweak.accent } as React.CSSProperties}
      >
        <div className="design-controls">
          <span style={{ fontFamily: "var(--ds-display)", fontSize: 13 }}>DIONYSUS DESIGN GALLERY</span>
          <span className="sep">|</span>

          <label>
            NOMBRE&nbsp;
            <input
              type="text"
              value={tweak.name}
              onChange={e => update("name", e.target.value.toUpperCase())}
            />
          </label>

          <label>
            LOGO&nbsp;
            <input
              type="text"
              value={tweak.logo}
              onChange={e => update("logo", e.target.value.slice(0, 2).toUpperCase())}
              style={{ width: 40 }}
            />
          </label>

          <span className="sep">|</span>

          <span>ACENTO</span>
          <div style={{ display: "flex", gap: 4 }}>
            {ACCENT_PRESETS.map(c => (
              <button
                key={c}
                className="accent-swatch"
                style={{ background: c, outline: c === tweak.accent ? "2px solid var(--paper)" : "none" }}
                onClick={() => update("accent", c)}
                title={c}
              />
            ))}
          </div>

          <span className="sep">|</span>

          <label>
            LANG&nbsp;
            <select value={tweak.lang} onChange={e => update("lang", e.target.value as Lang)}>
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
          </label>

          <label style={{ cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={tweak.dark}
              onChange={e => update("dark", e.target.checked)}
              style={{ marginRight: 4 }}
            />
            OSCURO
          </label>
        </div>

        <div className="design-canvas">
          <Section title="01 - Onboarding" subtitle="Te invitan, lees, te registras, te identificas">
            <Artboard label="A - Invitacion"><Sc_Invitation {...props} /></Artboard>
            <Artboard label="B - Manifiesto"><Sc_Manifesto {...props} /></Artboard>
            <Artboard label="C - Solicitud"><Sc_Form {...props} /></Artboard>
            <Artboard label="D - WhatsApp OTP"><Sc_OTP {...props} /></Artboard>
            <Artboard label="E - En cola"><Sc_Pending {...props} /></Artboard>
            <Artboard label="F - Bienvenida"><Sc_Welcome {...props} /></Artboard>
          </Section>

          <Section title="02 - Tu pase digital" subtitle="QR personal, Wallet y movimientos">
            <Artboard label="A - Mi QR"><Sc_QR {...props} /></Artboard>
            <Artboard label="B - Apple / Google Wallet"><Sc_Wallet {...props} /></Artboard>
            <Artboard label="C - Historial"><Sc_History {...props} /></Artboard>
            <Artboard label="D - Top-up"><Sc_TopUp {...props} /></Artboard>
          </Section>

          <Section title="03 - Eventos y donativos" subtitle="Reservas tu lugar donando">
            <Artboard label="A - Proximos eventos"><Sc_Events {...props} /></Artboard>
            <Artboard label="B - Detalle de evento"><Sc_EventDetail {...props} /></Artboard>
            <Artboard label="C - Metodo de pago"><Sc_PayMethod {...props} /></Artboard>
            <Artboard label="D - Ficha OXXO"><Sc_PayOXXO {...props} /></Artboard>
            <Artboard label="E - Donativo OK"><Sc_PayDone {...props} /></Artboard>
          </Section>

          <Section title="04 - Operador de puerta" subtitle="Escaneo de QR y aprobaciones en sitio">
            <Artboard label="A - Escanear"><Sc_DoorScan {...props} /></Artboard>
            <Artboard label="B - Acceso OK"><Sc_DoorValid {...props} /></Artboard>
            <Artboard label="C - Sin acceso"><Sc_DoorInvalid {...props} /></Artboard>
            <Artboard label="D - Aprobar en puerta"><Sc_DoorApproveInline {...props} /></Artboard>
          </Section>

          <Section title="05 - Cajero de tokens" subtitle="Efectivo se vuelve tokens trazables">
            <Artboard label="A - Buscar miembro"><Sc_CashSearch {...props} /></Artboard>
            <Artboard label="B - Agregar tokens"><Sc_CashAdd {...props} /></Artboard>
          </Section>

          <Section title="06 - POS - Cobro con tokens" subtitle="POS externo: busca miembro y cobra">
            <Artboard label="A - Cuenta + escanear"><Sc_POSScan {...props} /></Artboard>
            <Artboard label="B - Confirmar debito"><Sc_POSConfirm {...props} /></Artboard>
          </Section>

          <Section title="07 - Organizador" subtitle="Aprobar membresias y gestionar eventos">
            <Artboard label="A - Bandeja"><Sc_OrgInbox {...props} /></Artboard>
            <Artboard label="B - Solicitud"><Sc_OrgApprovalDetail {...props} /></Artboard>
            <Artboard label="C - Mis eventos"><Sc_OrgEvents {...props} /></Artboard>
            <Artboard label="D - Crear evento"><Sc_OrgCreateEvent {...props} /></Artboard>
            <Artboard label="E - Metricas"><Sc_OrgEventMetrics {...props} /></Artboard>
          </Section>

          <Section title="08 - Administracion" subtitle="Roles, auditoria y crecimiento de la comunidad">
            <Artboard label="A - Roles"><Sc_AdmRoles {...props} /></Artboard>
            <Artboard label="B - Transacciones"><Sc_AdmTransactions {...props} /></Artboard>
            <Artboard label="C - Grafo de referrals"><Sc_AdmReferrals {...props} /></Artboard>
          </Section>
        </div>
      </div>
    </I18nProvider>
  );
}
