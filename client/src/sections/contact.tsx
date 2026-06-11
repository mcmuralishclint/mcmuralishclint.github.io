import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Linkedin, Download, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/motion/section-heading";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal, EASE } from "@/components/motion/reveal";
import { identity } from "@/data/site";

const PROMPTS = [
  "Looking for a CTO?",
  "Building a platform?",
  "Exploring AI transformation?",
  "Scaling an engineering org?",
];

function useTypedPrompts(prompts: string[], enabled: boolean) {
  const [text, setText] = useState(enabled ? "" : prompts[0]);
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const current = prompts[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((p) => (p + 1) % prompts.length);
    } else {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 28 : 55
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, prompts, enabled]);

  return text;
}

const sessionLines = [
  { key: "whoami", cmd: "whoami", out: identity.title },
  { key: "status", cmd: "status --availability", out: "open to new missions // remote & relocation" },
  { key: "uptime", cmd: "uptime", out: "10+ years in production. zero catastrophic outages." },
];

export function ContactSection() {
  const reduced = useReducedMotion();
  const typed = useTypedPrompts(PROMPTS, !reduced);

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--gradient-to) / 0.04), transparent 50%, hsl(var(--gradient-from) / 0.05))",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <SectionHeading
          chapter="06"
          chapterTitle="Let's Build Together"
          title="Start a Conversation"
          testId="text-section-contact"
        />

        <Reveal>
          <div className="rounded-xl border border-border bg-card/90 backdrop-blur-sm shadow-2xl overflow-hidden glow">
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-background/40">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]/80" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]/80" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]/80" />
              <span className="font-mono text-xs text-muted-foreground ml-3">
                muralish@command-deck — zsh
              </span>
            </div>

            {/* Terminal body */}
            <div className="px-5 sm:px-7 py-6 font-mono text-sm space-y-4">
              {sessionLines.map((line, i) => (
                <motion.div
                  key={line.key}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 0.2 + i * 0.25, duration: 0.4, ease: EASE }}
                >
                  <p className="text-muted-foreground">
                    <span className="text-primary">$</span> {line.cmd}
                  </p>
                  <p className="text-foreground/85 pl-4">{line.out}</p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="pt-2"
              >
                <p className="text-lg sm:text-xl text-foreground" data-testid="text-typing">
                  <span className="text-primary">&gt;</span> {typed}
                  <span className="terminal-caret ml-1" aria-hidden />
                </p>
                <p className="text-muted-foreground mt-3">
                  <span className="text-primary">&gt;</span> Let's talk.
                </p>
              </motion.div>

              {/* Channels */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 1.3, duration: 0.5, ease: EASE }}
                className="flex flex-wrap gap-3 pt-4 border-t border-border/60"
              >
                <Magnetic strength={0.25}>
                  <Button asChild data-testid="link-email">
                    <a href={`mailto:${identity.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </a>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Button variant="outline" asChild data-testid="link-linkedin">
                    <a href={identity.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Button variant="outline" asChild data-testid="link-github">
                    <a href={identity.github} target="_blank" rel="noopener noreferrer">
                      <SiGithub className="w-4 h-4 mr-2" aria-hidden="true" />
                      GitHub
                    </a>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Button variant="outline" asChild data-testid="link-resume-download">
                    <a href={identity.resumePdf} download="Muralish_Clinton_Resume.pdf">
                      <Download className="w-4 h-4 mr-2" />
                      Resume
                    </a>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Button variant="ghost" asChild data-testid="link-resume-view">
                    <a href={identity.resumePdf} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Resume
                    </a>
                  </Button>
                </Magnetic>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
