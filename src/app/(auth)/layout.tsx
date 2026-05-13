export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <div className="border-b-2 border-line px-5 py-4 flex items-center gap-3">
        <div className="w-6 h-6 bg-ink text-paper flex items-center justify-center font-display text-xs">
          N
        </div>
        <span className="font-display text-sm uppercase tracking-wide">El Nido</span>
      </div>
      <div className="flex-1 flex flex-col max-w-sm w-full mx-auto px-5 py-8">
        {children}
      </div>
    </div>
  );
}
