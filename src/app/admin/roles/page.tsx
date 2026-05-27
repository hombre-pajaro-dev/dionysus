import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getAllUsersWithRoles, isAdmin } from "@/modules/roles";
import { db } from "@/lib/db";
import { RolesTable } from "./_components/RolesTable";

export const metadata = { title: "Roles — Dionysus" };

export default async function RolesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  // ORGANIZER can reach /admin/* but only ADMIN manages roles
  if (!(await isAdmin(session.userId))) redirect("/403");

  const [users, venues] = await Promise.all([
    getAllUsersWithRoles(),
    db.venue.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);

  const withRoles = users.map((u) => ({
    ...u,
    roles: u.roles.map((r) => ({
      ...r,
      venue: r.venue ?? null,
    })),
  }));

  const totalWithOperativeRoles = users.filter((u) => u.roles.length > 0).length;

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-1">
          Quién puede qué
        </p>
        <h1 className="text-2xl font-black tracking-tight">Roles</h1>
      </div>

      <div className="flex gap-6 text-sm">
        <div>
          <span className="text-muted-foreground">Total miembros</span>{" "}
          <span className="font-semibold">{users.length}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Con rol operativo</span>{" "}
          <span className="font-semibold">{totalWithOperativeRoles}</span>
        </div>
      </div>

      <RolesTable users={withRoles} venues={venues} />
    </main>
  );
}
