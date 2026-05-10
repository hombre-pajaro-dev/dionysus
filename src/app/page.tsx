import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Dionysus</h1>
      <p className="text-muted-foreground mb-8">Comunidad de arte y eventos</p>
      <Link
        href="/login"
        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
      >
        Entrar a la comunidad
      </Link>
    </main>
  );
}
