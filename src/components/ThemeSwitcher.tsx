import React, { useEffect, useRef, useState } from "react";
import { Palette, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { THEMES, useTheme } from "@/context/ThemeContext";

interface Props {
  /** Show the "THEME" text label next to the icon (desktop top bar) */
  showLabel?: boolean;
}

export const ThemeSwitcher: React.FC<Props> = ({ showLabel = false }) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Change colour theme"
        className="group relative p-2 min-h-[44px] min-w-[44px] text-heading hover:text-accent transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <motion.span
          animate={open ? { rotate: 180, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="relative inline-flex"
        >
          <Palette className="w-5 h-5" />
          <span className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-accent ring-2 ring-bg" />
        </motion.span>
        {showLabel && <span className="hidden lg:inline font-heading text-sm tracking-wider">THEME</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Colour themes"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="absolute right-0 top-full mt-2 z-50 w-64 origin-top-right rounded-2xl border border-border bg-bg p-2 shadow-2xl"
          >
            <p className="px-3 pt-2 pb-1.5 font-heading text-xs tracking-[0.18em] text-caramel">PICK A FLAVOUR</p>
            {THEMES.map((t, i) => {
              const active = t.id === theme;
              return (
                <motion.button
                  key={t.id}
                  role="menuitemradio"
                  aria-checked={active}
                  type="button"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  onClick={(e) => {
                    setTheme(t.id, { x: e.clientX, y: e.clientY });
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 min-h-[44px] text-left transition-colors cursor-pointer ${
                    active ? "bg-surface" : "hover:bg-surface/70"
                  }`}
                >
                  <span className="relative flex shrink-0">
                    {t.swatch.map((c, j) => (
                      <span
                        key={j}
                        className="size-5 rounded-full border-2 border-bg shadow-sm"
                        style={{ background: c, marginLeft: j ? -7 : 0 }}
                      />
                    ))}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-heading leading-tight">{t.name}</span>
                    <span className="block text-[11px] text-muted leading-tight mt-0.5">{t.blurb}</span>
                  </span>
                  {active && <Check className="w-4 h-4 text-accent shrink-0" />}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
