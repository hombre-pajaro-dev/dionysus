import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PendingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground mb-2">
          Solicitud en cola
        </p>
        <h1 className="font-display text-4xl uppercase leading-none tracking-tight mb-3">
          Estamos revisando
        </h1>
        <p className="text-sm leading-relaxed">
          Tu solicitud está siendo revisada por un organizador. Te avisaremos por WhatsApp
          en cuanto haya respuesta.
        </p>
      </div>

      <div className="border-2 border-line p-4 flex flex-col gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          Qué sigue
        </p>
        <p className="text-sm">
          No hay nada más que hacer por ahora. El proceso tarda típicamente menos de 24 horas.
        </p>
      </div>

      <Button variant="ghost" asChild>
        <Link href="/login">← Cerrar sesión</Link>
      </Button>
    </div>
  );
}
