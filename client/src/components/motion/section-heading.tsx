import { Reveal } from "./reveal";

type SectionHeadingProps = {
  chapter: string;
  chapterTitle: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  testId?: string;
};

export function SectionHeading({
  chapter,
  chapterTitle,
  title,
  subtitle,
  align = "center",
  testId,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  return (
    <Reveal className={`${alignClass} mb-16`}>
      <p className="font-mono text-xs tracking-[0.25em] uppercase text-primary/80 mb-3">
        <span className="text-muted-foreground/60">Chapter {chapter} /</span> {chapterTitle}
      </p>
      <h2
        className="font-serif text-4xl sm:text-5xl tracking-tight leading-[1.05]"
        data-testid={testId}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-muted-foreground max-w-2xl mt-4 ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
