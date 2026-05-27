export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-6">
      <p className="text-6xl font-black tracking-tighter">403</p>
      <p className="text-muted-foreground text-center">
        No tienes permiso para acceder a esta página.
      </p>
      <a href="/dashboard" className="text-sm underline underline-offset-4">
        Ir al inicio
      </a>
    </main>
  );
}
