import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuspendedPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-danger mb-2">
          Acceso revocado
        </p>
        <h1 className="font-display text-4xl uppercase leading-none tracking-tight mb-3">
          Tu membresía fue dada de baja
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Un organizador ha suspendido tu acceso a la comunidad. Si crees que es un error,
          comunícate directamente con el equipo.
        </p>
      </div>

      <Button variant="ghost" asChild>
        <Link href="/login">← Volver</Link>
      </Button>
    </div>
  );
}
