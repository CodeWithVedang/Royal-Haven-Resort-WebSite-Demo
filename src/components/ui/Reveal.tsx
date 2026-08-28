"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  /** `img` uses the clip-path wipe instead of the fade-up. */
  variant?: "default" | "img";
  delay?: number;
  className?: string;
  /** Set when the revealed element is also an in-page anchor target. */
  id?: string;
  as?: "div" | "li" | "figure" | "section" | "article" | "span";
};

/**
 * Single IntersectionObserver per element, unobserved after it fires — the
 * animation itself lives in globals.css so it can be switched off wholesale
 * under prefers-reduced-motion.
 */
export function Reveal({
  children,
  variant = "default",
  delay = 0,
  className,
  id,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      // No observer support: reveal on the next tick so nothing stays hidden.
      const timer = globalThis.setTimeout(() => setVisible(true), 0);
      return () => globalThis.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // The allowed tags share no single ref type, so widen the element once here
  // rather than casting the ref at every call site.
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      id={id}
      data-visible={visible}
      className={cn(variant === "img" ? "reveal-img" : "reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
