import { identity } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative py-8 px-6">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--gradient-from) / 0.3), hsl(var(--gradient-via) / 0.3), hsl(var(--gradient-to) / 0.3), transparent)",
        }}
      />
      <div
        className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4"
        data-testid="text-footer"
      >
        <p className="font-serif italic text-base gradient-text" data-testid="text-footer-name">
          {identity.name}
        </p>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground" data-testid="text-footer-role">
          {identity.title}
        </p>
      </div>
    </footer>
  );
}
