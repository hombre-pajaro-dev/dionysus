import { getServerSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const member = await getServerSession();
  if (!member) redirect("/login");

  return (
    <main className="min-h-screen bg-paper flex items-center justify-center p-8">
      <div className="text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          Bienvenido
        </p>
        <h1 className="font-display text-4xl uppercase tracking-tight">{member.name}</h1>
        <p className="font-mono text-xs text-muted-foreground mt-2">Dashboard — próximamente</p>
      </div>
    </main>
  );
}
