import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft, Shield } from "lucide-react";
import { Link } from "wouter";

const PASS = "authentiz";
const SESSION_KEY = "mc_playbook_auth";

export default function MC() {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
    else setTimeout(() => inputRef.current?.focus(), 400);
  }, []);

  function submit() {
    if (input.toLowerCase() === PASS) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setError(false);
      setAuthed(true);
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 600);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  if (authed) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col">
        {/* Minimal top bar */}
        <div className="flex items-center gap-3 px-4 py-2 border-b border-border/60 bg-card/80 backdrop-blur-sm z-10 flex-shrink-0">
          <Link href="/">
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm">
              <ArrowLeft size={14} />
              <span className="font-medium">MC</span>
            </button>
          </Link>
          <div className="h-4 w-px bg-border" />
          <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">Engineering Playbook</span>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield size={11} />
            <span>Authentz</span>
          </div>
        </div>
        {/* Full-height iframe */}
        <iframe
          src="/engineering-playbook.html"
          title="Engineering Playbook"
          className="flex-1 w-full border-none"
          allow="clipboard-write"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background mesh */}
      <div className="mesh-gradient absolute inset-0 opacity-40 pointer-events-none" />

      {/* Back link */}
      <Link href="/">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
        >
          <ArrowLeft size={15} />
          Back
        </motion.button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        {/* Card */}
        <div className="glass-card rounded-2xl p-8 border border-border/60 shadow-xl">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
            className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6"
          >
            <Lock size={22} className="text-primary" />
          </motion.div>

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="font-serif text-2xl font-bold gradient-text mb-2">
              Engineering Playbook
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This workspace is private. Enter the access code to continue.
            </p>
          </div>

          {/* Input */}
          <motion.div
            animate={shake ? { x: [-6, 6, -5, 5, -3, 3, 0] } : {}}
            transition={{ duration: 0.45 }}
            className="mb-4"
          >
            <div className={`relative rounded-xl border transition-colors ${
              error
                ? "border-destructive/60 bg-destructive/5"
                : "border-border focus-within:border-primary/60 bg-card"
            }`}>
              <input
                ref={inputRef}
                type={show ? "text" : "password"}
                value={input}
                onChange={e => { setInput(e.target.value); setError(false); }}
                onKeyDown={e => e.key === "Enter" && submit()}
                placeholder="Access code"
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent px-4 py-3 pr-10 text-sm font-mono tracking-widest text-foreground placeholder:text-muted-foreground/50 placeholder:font-sans placeholder:tracking-normal outline-none rounded-xl"
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-destructive mt-2 ml-1"
                >
                  Incorrect access code. Try again.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Submit */}
          <button
            onClick={submit}
            disabled={!input}
            className="w-full py-3 rounded-xl text-sm font-semibold text-primary-foreground transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, hsl(245 58% 52%), hsl(200 80% 50%), hsl(173 60% 40%))",
            }}
          >
            Unlock Playbook
          </button>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground/60 mt-5">
            Authentz · Head of Engineering · Private
          </p>
        </div>
      </motion.div>
    </div>
  );
}
