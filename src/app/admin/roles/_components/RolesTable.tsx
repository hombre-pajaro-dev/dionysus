"use client";

import { useState } from "react";
import { RoleType } from "@prisma/client";

type Venue = { id: string; name: string };
type UserRole = { id: string; role: string; venueId: string | null; venue: Venue | null };
type User = { id: string; name: string; phone: string; roles: UserRole[] };

const ROLE_LABELS: Record<string, string> = {
  ADMIN: "ADMIN",
  ORGANIZER: "ORG.",
  DOOR_OPERATOR: "PUERTA",
  TOKEN_CASHIER: "CAJERO",
};

const ROLE_COLORS: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-800 border-red-200",
  ORGANIZER: "bg-blue-100 text-blue-800 border-blue-200",
  DOOR_OPERATOR: "bg-green-100 text-green-800 border-green-200",
  TOKEN_CASHIER: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

export function RolesTable({ users: initial, venues }: { users: User[]; venues: Venue[] }) {
  const [users, setUsers] = useState<User[]>(initial);
  const [assigning, setAssigning] = useState<string | null>(null); // userId being assigned
  const [form, setForm] = useState<{ role: RoleType; venueId: string }>({ role: RoleType.ORGANIZER, venueId: venues[0]?.id ?? "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAssign(userId: string) {
    setBusy(true);
    setError(null);
    try {
      const venueId: string | null = form.role === RoleType.ADMIN ? null : form.venueId || null;
      const res = await fetch("/api/admin/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: form.role, venueId }),
      });
      if (!res.ok) throw new Error(await res.text());
      const newRole: UserRole = await res.json();
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? { ...u, roles: [...u.roles, { ...newRole, venue: venues.find((v) => v.id === newRole.venueId) ?? null }] }
            : u
        )
      );
      setAssigning(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  async function handleRevoke(userId: string, roleId: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/roles/${roleId}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, roles: u.roles.filter((r) => r.id !== roleId) } : u
        )
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  const needsVenue = (form.role as string) !== RoleType.ADMIN;

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </div>
      )}

      <div className="text-xs text-muted-foreground">
        Los cambios de rol toman efecto en el próximo inicio de sesión del usuario.
      </div>

      <div className="divide-y divide-border rounded-lg border">
        {users.map((user) => (
          <div key={user.id} className="p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.phone}</p>
              </div>
              <button
                onClick={() => setAssigning(assigning === user.id ? null : user.id)}
                className="text-xs border border-border rounded px-2 py-1 hover:bg-secondary transition-colors shrink-0"
              >
                + Asignar rol
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {user.roles.length === 0 && (
                <span className="text-xs text-muted-foreground">Sin roles operativos</span>
              )}
              {user.roles.map((r) => (
                <span
                  key={r.id}
                  className={`inline-flex items-center gap-1 text-xs font-mono font-medium border rounded px-1.5 py-0.5 ${ROLE_COLORS[r.role] ?? "bg-secondary"}`}
                >
                  {ROLE_LABELS[r.role] ?? r.role}
                  {r.venue && <span className="opacity-60">· {r.venue.name}</span>}
                  <button
                    onClick={() => handleRevoke(user.id, r.id)}
                    disabled={busy}
                    className="ml-0.5 hover:opacity-70 disabled:opacity-40"
                    aria-label="Revocar rol"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {assigning === user.id && (
              <div className="flex flex-wrap gap-2 items-end pt-1">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Rol</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as RoleType }))}
                    className="border border-border rounded px-2 py-1 text-sm bg-background"
                  >
                    {Object.values(RoleType).map((r) => (
                      <option key={r} value={r}>
                        {ROLE_LABELS[r] ?? r}
                      </option>
                    ))}
                  </select>
                </div>

                {needsVenue && (
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground">Venue</label>
                    <select
                      value={form.venueId}
                      onChange={(e) => setForm((f) => ({ ...f, venueId: e.target.value }))}
                      className="border border-border rounded px-2 py-1 text-sm bg-background"
                    >
                      {venues.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={() => handleAssign(user.id)}
                  disabled={busy}
                  className="bg-primary text-primary-foreground rounded px-3 py-1 text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {busy ? "…" : "Asignar"}
                </button>
                <button
                  onClick={() => setAssigning(null)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
