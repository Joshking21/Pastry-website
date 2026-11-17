import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

export type ThemeId = "caramel" | "cocoa" | "strawberry" | "pistachio";

export interface ThemeOption {
  id: ThemeId;
  name: string;
  blurb: string;
  /** bg, heading/caramel, accent swatches for the picker */
  swatch: [string, string, string];
  /** browser UI colour (mobile address bar) */
  metaColor: string;
}

export const THEMES: ThemeOption[] = [
  { id: "caramel", name: "Classic Caramel", blurb: "Warm butter & golden crust", swatch: ["#FAF6F0", "#965C25", "#A8324A"], metaColor: "#FAF6F0" },
  { id: "cocoa", name: "Cocoa Night", blurb: "Dark chocolate after hours", swatch: ["#1C1310", "#E8A867", "#F2789A"], metaColor: "#1C1310" },
  { id: "strawberry", name: "Strawberry Cream", blurb: "Pink icing & sprinkles", swatch: ["#FFF5F6", "#A93A62", "#D11E58"], metaColor: "#FFF5F6" },
  { id: "pistachio", name: "Pistachio", blurb: "Fresh green & terracotta", swatch: ["#F5F8EE", "#557428", "#C04E28"], metaColor: "#F5F8EE" },
];

const STORAGE_KEY = "ifeyinwa_theme";

interface ThemeContextType {
  theme: ThemeId;
  /** Switch theme; pass the click point to get a circular reveal from there. */
  setTheme: (id: ThemeId, origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function readStoredTheme(): ThemeId {
  try {
    const t = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (t && THEMES.some((x) => x.id === t)) return t;
  } catch {
    // storage blocked: fall back to default
  }
  return "caramel";
}

function applyTheme(id: ThemeId) {
  const root = document.documentElement;
  if (id === "caramel") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", id);
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  const opt = THEMES.find((t) => t.id === id);
  if (meta && opt) meta.content = opt.metaColor;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeId>(readStoredTheme);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const setTheme = useCallback(
    (id: ThemeId, origin?: { x: number; y: number }) => {
      if (id === theme) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      };

      const commit = () => {
        flushSync(() => setThemeState(id));
        applyTheme(id);
      };

      if (doc.startViewTransition && !reduce) {
        const x = origin?.x ?? window.innerWidth / 2;
        const y = origin?.y ?? 0;
        const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        const vt = doc.startViewTransition(commit);
        vt.ready
          .then(() => {
            document.documentElement.animate(
              { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
              { duration: 700, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" }
            );
          })
          .catch(() => {});
        return;
      }

      // Fallback: cross-fade colours
      const root = document.documentElement;
      root.classList.add("theme-fading");
      commit();
      window.setTimeout(() => root.classList.remove("theme-fading"), 550);
    },
    [theme]
  );

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};

/** Current theme colours, read live from CSS variables (used for confetti). */
export function themeColors(): string[] {
  const s = getComputedStyle(document.documentElement);
  return ["--color-accent", "--color-caramel", "--color-heading", "--color-surface"]
    .map((v) => s.getPropertyValue(v).trim())
    .filter(Boolean);
}
