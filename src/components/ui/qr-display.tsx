"use client";

import * as React from "react";
import QRCode from "qrcode";
import { cn } from "@/lib/utils";

interface QRDisplayProps {
  memberId: string;
  name?: string;
  balanceTokens?: number;
  className?: string;
}

export function QRDisplay({ memberId, name, balanceTokens, className }: QRDisplayProps) {
  const [dataUrl, setDataUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    QRCode.toDataURL(memberId, {
      width: 280,
      margin: 2,
      color: { dark: "#0a0a0a", light: "#f4f1ea" },
    }).then(setDataUrl);
  }, [memberId]);

  return (
    <div className={cn("flex flex-col border-2 border-line bg-paper", className)}>
      {/* Balance header */}
      <div className="bg-ink text-paper px-4 py-4 flex flex-col gap-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-lime">
          Balance
        </span>
        <span className="font-display text-[44px] leading-none tracking-tight">
          <span className="mr-1">◆</span>
          {balanceTokens !== undefined ? balanceTokens.toLocaleString("es-MX") : "—"}
        </span>
        <span className="font-mono text-[11px] opacity-70">Tokens disponibles</span>
      </div>

      {/* QR code */}
      <div className="p-4">
        {dataUrl ? (
          <img
            src={dataUrl}
            alt={`QR de ${name ?? memberId}`}
            className="w-full aspect-square"
          />
        ) : (
          <div className="w-full aspect-square bg-paper-2 border-2 border-line animate-pulse" />
        )}
      </div>

      {/* Member name */}
      {name && (
        <div className="px-4 pb-4 border-t-2 border-line pt-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground mb-0.5">
            Miembro
          </p>
          <p className="font-sans font-bold text-sm uppercase tracking-wide">{name}</p>
          <p className="font-mono text-[10px] text-muted-foreground mt-1">
            Muestra esto en la puerta
          </p>
        </div>
      )}
    </div>
  );
}
