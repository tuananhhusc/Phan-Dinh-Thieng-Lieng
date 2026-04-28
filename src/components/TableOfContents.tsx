"use client";

import { useEffect, useState, useCallback } from "react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const top = visible.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          );
          setActiveId(top.target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => headings.forEach((h) => observer.unobserve(h));
  }, [items]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveId(id);
        setIsOpen(false);
      }
    },
    []
  );

  const activeIdx = items.findIndex((i) => i.id === activeId);
  const progress = items.length > 0 ? ((activeIdx + 1) / items.length) * 100 : 0;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 lg:hidden flex items-center justify-center h-12 w-12 rounded-full bg-jesuit text-gold shadow-xl border border-gold/20 transition-transform active:scale-95"
        aria-label="Mục lục"
        id="toc-toggle"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile drawer */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-40 bg-parchment rounded-t-2xl shadow-2xl border-t border-border transform transition-transform duration-300 ease-out lg:hidden ${isOpen ? "translate-y-0" : "translate-y-full"}`}
        style={{ maxHeight: "70vh" }}
        aria-label="Mục lục"
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-xs font-bold text-burgundy uppercase tracking-widest" style={{ fontFamily: "var(--font-heading)" }}>
            Mục Lục
          </h3>
          <span className="text-[11px] text-ink-subtle">{Math.round(progress)}%</span>
        </div>
        <div className="overflow-y-auto p-2" style={{ maxHeight: "calc(70vh - 56px)" }}>
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`toc-link ${item.level === 3 ? "toc-link-sub" : ""} ${activeId === item.id ? "active" : ""}`}
            >
              {item.text}
            </a>
          ))}
        </div>
      </nav>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block sticky top-[82px] h-[calc(100vh-98px)] w-[var(--sidebar-w)] flex-shrink-0" aria-label="Mục lục">
        <div className="h-full flex flex-col overflow-hidden pl-2">
          {/* Header */}
          <div className="px-2 py-3 mb-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 w-[3px] rounded-full bg-gold" />
              <h3 className="text-[11px] font-bold text-burgundy uppercase tracking-widest" style={{ fontFamily: "var(--font-heading)" }}>
                Mục Lục
              </h3>
            </div>
            {/* Progress */}
            <div className="h-[3px] bg-border-subtle rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%`, background: "linear-gradient(to right, #7C1D28, #C9A844)" }}
              />
            </div>
          </div>

          {/* Links */}
          <div className="toc-sidebar flex-1 overflow-y-auto py-1">
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`toc-link ${item.level === 3 ? "toc-link-sub" : ""} ${activeId === item.id ? "active" : ""}`}
              >
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
