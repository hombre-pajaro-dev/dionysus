"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Step = "phone" | "otp";

function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return phone;
  return `+${digits.slice(0, 2)} ${digits.slice(2, 4)} ████ ${digits.slice(-4)}`;
}

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = React.useState<Step>("phone");
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [cooldown, setCooldown] = React.useState(0);

  // Countdown timer for resend
  React.useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setStep("otp");
      setCooldown(60);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }

      if (data.status === "PENDING") router.push("/pending");
      else if (data.status === "SUSPENDED") router.push("/suspended");
      else router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  if (step === "otp") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground mb-2">
            WhatsApp
          </p>
          <h1 className="font-display text-4xl uppercase leading-none tracking-tight mb-3">
            Te llegó un código
          </h1>
          <p className="text-sm text-muted-foreground">
            Enviamos un código de 6 dígitos a{" "}
            <span className="font-mono text-ink">{maskPhone(phone)}</span>
          </p>
        </div>

        <form onSubmit={verifyOtp} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="code">Código</Label>
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              autoFocus
              required
            />
          </div>

          {error && (
            <p className="font-mono text-[11px] text-danger border-2 border-danger px-3 py-2">
              {error}
            </p>
          )}

          <Button type="submit" variant="ink" disabled={loading || code.length < 6}>
            {loading ? "Verificando…" : "Entrar →"}
          </Button>
        </form>

        <div className="flex flex-col gap-2 border-t-2 border-line pt-4">
          <button
            type="button"
            onClick={requestOtp}
            disabled={cooldown > 0}
            className="font-mono text-[10px] uppercase tracking-[0.08em] text-left disabled:opacity-40"
          >
            {cooldown > 0 ? `Reenviar (00:${String(cooldown).padStart(2, "0")})` : "Reenviar código"}
          </button>
          <button
            type="button"
            onClick={() => { setStep("phone"); setCode(""); setError(""); }}
            className="font-mono text-[10px] uppercase tracking-[0.08em] text-left text-muted-foreground"
          >
            Cambiar número
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground mb-2">
          Acceso
        </p>
        <h1 className="font-display text-4xl uppercase leading-none tracking-tight mb-3">
          Entrar a la comunidad
        </h1>
        <p className="text-sm text-muted-foreground">
          Ingresa tu número de WhatsApp. Te enviaremos un código de acceso.
        </p>
      </div>

      <form onSubmit={requestOtp} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">WhatsApp</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+52 55 0000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoFocus
            required
          />
          <p className="font-mono text-[10px] tracking-[0.05em] text-muted-foreground">
            Para enviarte tu código de acceso por WhatsApp.
          </p>
        </div>

        {error && (
          <p className="font-mono text-[11px] text-danger border-2 border-danger px-3 py-2">
            {error}
          </p>
        )}

        <Button type="submit" variant="primary" disabled={loading || !phone}>
          {loading ? "Enviando…" : "Enviar código →"}
        </Button>
      </form>
    </div>
  );
}
