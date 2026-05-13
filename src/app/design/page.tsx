import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { QRDisplay } from "@/components/ui/qr-display";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4 pb-2 border-b-2 border-line">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DesignPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* Header */}
      <div className="border-b-2 border-line px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-ink text-paper flex items-center justify-center font-display text-xs">N</div>
          <span className="font-display text-sm uppercase tracking-wide">El Nido</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Design System</span>
      </div>

      <div className="max-w-sm mx-auto px-6 py-8">

        {/* Typography */}
        <Section title="Typography">
          <p className="font-display text-4xl uppercase leading-none tracking-tight mb-3">Display / Archivo Black</p>
          <p className="font-sans font-bold text-base uppercase tracking-wide mb-2">Sans Bold / Space Grotesk</p>
          <p className="font-sans text-sm mb-3">Sans regular — cuerpo de texto y UI general</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">MONO KICKER / JETBRAINS MONO · MEMBER_ID: abc123</p>
        </Section>

        {/* Colours */}
        <Section title="Colours">
          <div className="grid grid-cols-4 gap-0 border-2 border-line">
            {[
              { bg: "bg-paper",   label: "paper" },
              { bg: "bg-[var(--paper-2)]", label: "paper-2" },
              { bg: "bg-ink",     label: "ink" },
              { bg: "bg-lime",    label: "accent" },
              { bg: "bg-ok",      label: "ok" },
              { bg: "bg-danger",  label: "danger" },
              { bg: "bg-muted",   label: "muted" },
              { bg: "bg-[var(--muted-col)]", label: "muted-col" },
            ].map((c) => (
              <div key={c.label} className={`${c.bg} border-r border-b border-line aspect-square flex items-end p-1`}>
                <span className="font-mono text-[8px] uppercase leading-none mix-blend-difference text-paper">{c.label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Button">
          <div className="flex flex-col gap-2">
            <Button variant="default">Default →</Button>
            <Button variant="primary">Primary · Accent ◆</Button>
            <Button variant="ink">Ink · Filled</Button>
            <Button variant="ghost">Ghost / Transparent</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ink" size="sm">Small</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </Section>

        {/* Input + Label */}
        <Section title="Input + Label">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Tomás Castillo" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">WhatsApp</Label>
              <Input id="phone" type="tel" placeholder="+52 55 0000 0000" />
              <p className="font-mono text-[10px] tracking-[0.05em] text-muted-foreground">
                Para enviarte tu código de acceso.
              </p>
            </div>
          </div>
        </Section>

        {/* Card */}
        <Section title="Card">
          <div className="flex flex-col gap-0">
            <Card>
              <CardHeader>
                <CardTitle>Default card</CardTitle>
              </CardHeader>
              <CardContent>Papel cálido, borde 2px tinta.</CardContent>
            </Card>
            <Card variant="ink">
              <CardHeader>
                <CardTitle>Ink card</CardTitle>
              </CardHeader>
              <CardContent>Fondo oscuro, texto papel.</CardContent>
            </Card>
            <Card variant="accent">
              <CardHeader>
                <CardTitle>Accent card</CardTitle>
              </CardHeader>
              <CardContent>Lima — para confirmaciones y estados OK.</CardContent>
            </Card>
          </div>
        </Section>

        {/* Badge */}
        <Section title="Badge">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="solid">Solid</Badge>
            <Badge variant="accent">◆ Accent</Badge>
            <Badge variant="ok">✓ Activo</Badge>
            <Badge variant="danger">Sin acceso</Badge>
          </div>
        </Section>

        {/* Avatar */}
        <Section title="Avatar">
          <div className="flex items-end gap-4">
            <Avatar name="Tomás Castillo" size="sm" />
            <Avatar name="Daniela Reyes" size="md" />
            <Avatar name="Ana Gutiérrez López" size="lg" />
          </div>
        </Section>

        {/* Separator */}
        <Section title="Separator">
          <div className="flex flex-col gap-4">
            <Separator />
            <Separator dashed />
          </div>
        </Section>

        {/* QR Display */}
        <Section title="QR Display">
          <QRDisplay
            memberId="tomas-castillo-9421"
            name="Tomás Castillo"
            balanceTokens={320}
          />
        </Section>

      </div>
    </main>
  );
}
